import { MarketAnalysis, Product } from '../types';

/**
 * AgriMarket AI Agent Service
 * 
 * This agent provides intelligent market analysis and purchasing recommendations
 * for agricultural products using LLM-powered reasoning.
 */

export interface AgentContext {
  product: Product;
  userQuery?: string;
  conversationHistory?: AgentMessage[];
}

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AgentResponse {
  analysis: MarketAnalysis | null;
  reasoning: string;
  confidence: number;
  guardrailsTriggered?: string[];
  error?: string;
}

export interface AgentTool {
  name: string;
  description: string;
  execute: (context: AgentContext) => Promise<any>;
}

/**
 * Agent Tools - specific capabilities the agent can use
 */
const agentTools: AgentTool[] = [
  {
    name: 'market_analysis',
    description: 'Analyze market trends and price forecasts for agricultural products',
    execute: async (context: AgentContext) => {
      const { analyzeMarketTrends } = await import('./aiService');
      return await analyzeMarketTrends(context.product.name, context.product.price);
    }
  },
  {
    name: 'seasonal_analysis',
    description: 'Provide seasonal availability and pricing patterns',
    execute: async (_context: AgentContext) => {
      // Mock seasonal analysis - in production this would use historical data
      const seasons = ['spring', 'summer', 'fall', 'winter'];
      const currentSeason = seasons[Math.floor((new Date().getMonth() + 3) % 12 / 3)];
      
      const seasonalData = {
        currentSeason,
        isPeakSeason: ['summer', 'fall'].includes(currentSeason),
        expectedPriceChange: currentSeason === 'winter' ? 0.15 : -0.05,
        recommendation: currentSeason === 'winter' 
          ? 'Prices typically higher in winter due to reduced supply'
          : 'Good availability expected for current season'
      };
      
      return seasonalData;
    }
  }
];

/**
 * Agent Guardrails - safety and behavior boundaries
 */
const agentGuardrails = {
  maxPriceThreshold: 50000, // Reject analysis for unrealistically high prices (KES)
  minPriceThreshold: 10, // Reject analysis for unrealistically low prices (KES)
  allowedCategories: ['Vegetables', 'Fruits', 'Cereals', 'Livestock', 'Cash Crops', 'Dairy', 'Pantry', 'All'],
  maxAnalysisAttempts: 3,
  confidenceThreshold: 0.3 // Reject low-confidence predictions
};

/**
 * Main Agent Orchestrator
 * 
 * This function coordinates the agent's reasoning process:
 * 1. Validate input against guardrails
 * 2. Select appropriate tools
 * 3. Execute analysis with LLM reasoning
 * 4. Validate output
 * 5. Return structured response
 */
export async function executeAgent(context: AgentContext): Promise<AgentResponse> {
  const guardrailsTriggered: string[] = [];
  
  // Guardrail 1: Price validation
  if (context.product.price > agentGuardrails.maxPriceThreshold) {
    guardrailsTriggered.push('price_too_high');
    return {
      analysis: null,
      reasoning: 'Price exceeds maximum threshold for analysis',
      confidence: 0,
      guardrailsTriggered,
      error: 'Price validation failed'
    };
  }
  
  if (context.product.price < agentGuardrails.minPriceThreshold) {
    guardrailsTriggered.push('price_too_low');
    return {
      analysis: null,
      reasoning: 'Price below minimum threshold for analysis',
      confidence: 0,
      guardrailsTriggered,
      error: 'Price validation failed'
    };
  }
  
  // Guardrail 2: Category validation
  if (!agentGuardrails.allowedCategories.includes(context.product.category)) {
    guardrailsTriggered.push('unsupported_category');
    return {
      analysis: null,
      reasoning: `Category '${context.product.category}' is not supported for analysis. Supported categories: ${agentGuardrails.allowedCategories.join(', ')}`,
      confidence: 0,
      guardrailsTriggered,
      error: 'Category validation failed'
    };
  }
  
  // Guardrail 3: Product availability
  if (!context.product.available) {
    guardrailsTriggered.push('product_unavailable');
    return {
      analysis: null,
      reasoning: 'Product is currently unavailable and cannot be analyzed',
      confidence: 0,
      guardrailsTriggered,
      error: 'Product availability check failed'
    };
  }
  
  try {
    // Tool Selection: Use market analysis tool
    const marketTool = agentTools.find(t => t.name === 'market_analysis');
    if (!marketTool) {
      throw new Error('Market analysis tool not found');
    }
    
    // Execute analysis
    const analysis = await marketTool.execute(context);
    
    // Validate analysis confidence
    if (analysis.confidence < agentGuardrails.confidenceThreshold) {
      guardrailsTriggered.push('low_confidence');
      return {
        analysis: null,
        reasoning: `Analysis confidence (${analysis.confidence}) below threshold`,
        confidence: analysis.confidence,
        guardrailsTriggered,
        error: 'Low confidence result'
      };
    }
    
    // Generate reasoning explanation
    const reasoning = generateAgentReasoning(analysis, context);
    
    return {
      analysis,
      reasoning,
      confidence: analysis.confidence,
      guardrailsTriggered: guardrailsTriggered.length > 0 ? guardrailsTriggered : undefined
    };
    
  } catch (error) {
    return {
      analysis: null,
      reasoning: 'Analysis failed due to technical error',
      confidence: 0,
      guardrailsTriggered,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate human-readable reasoning from analysis results
 */
function generateAgentReasoning(analysis: MarketAnalysis, context: AgentContext): string {
  const trendDescriptions = {
    rising: 'Prices are trending upward based on current market conditions',
    stable: 'Market conditions appear stable with minimal price fluctuation expected',
    falling: 'Prices are showing a downward trend based on supply and demand factors'
  };
  
  let reasoning = `Based on analysis of ${context.product.name} at $${context.product.price}: `;
  reasoning += trendDescriptions[analysis.trend];
  reasoning += `. Key factors include: ${analysis.factors.join(', ')}. `;
  reasoning += `The agent recommends: ${analysis.recommendation}`;
  
  return reasoning;
}

/**
 * Get available tools for the agent
 */
export function getAvailableTools(): AgentTool[] {
  return agentTools;
}

/**
 * Get agent guardrails configuration
 */
export function getAgentGuardrails() {
  return { ...agentGuardrails };
}