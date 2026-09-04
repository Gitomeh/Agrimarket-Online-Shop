/**
 * AgriMarket Agent V2 Evaluation Framework
 * 
 * This evaluation tests the AI agent's capabilities across multiple dimensions:
 * - Market analysis accuracy
 * - Guardrail effectiveness
 * - Error handling
 * - Response quality
 * - Tool execution
 */

import { describe, it, expect } from 'vitest';
import { executeAgent, AgentContext } from '../services/agentService';
import { mockProducts } from '../data/mockData';

describe('AgriMarket Agent V2 Evaluation', () => {
  
  describe('Guardrail Testing', () => {
    it('should reject products with price above maximum threshold', async () => {
      const context: AgentContext = {
        product: {
          ...mockProducts[0],
          price: 2000 // Exceeds max threshold
        }
      };
      
      const response = await executeAgent(context);
      
      expect(response.analysis).toBeNull();
      expect(response.guardrailsTriggered).toContain('price_too_high');
      expect(response.error).toContain('Price validation failed');
    });

    it('should reject products with price below minimum threshold', async () => {
      const context: AgentContext = {
        product: {
          ...mockProducts[0],
          price: 0.001 // Below min threshold
        }
      };
      
      const response = await executeAgent(context);
      
      expect(response.analysis).toBeNull();
      expect(response.guardrailsTriggered).toContain('price_too_low');
      expect(response.error).toContain('Price validation failed');
    });

    it('should reject unsupported product categories', async () => {
      const context: AgentContext = {
        product: {
          ...mockProducts[0],
          category: 'Electronics' // Not in allowed categories
        }
      };
      
      const response = await executeAgent(context);
      
      expect(response.analysis).toBeNull();
      expect(response.guardrailsTriggered).toContain('unsupported_category');
      expect(response.error).toContain('Category validation failed');
    });

    it('should reject unavailable products', async () => {
      const context: AgentContext = {
        product: {
          ...mockProducts[0],
          available: false
        }
      };
      
      const response = await executeAgent(context);
      
      expect(response.analysis).toBeNull();
      expect(response.guardrailsTriggered).toContain('product_unavailable');
      expect(response.error).toContain('Product availability check failed');
    });
  });

  describe('Market Analysis Capabilities', () => {
    it('should successfully analyze valid products', async () => {
      const context: AgentContext = {
        product: mockProducts[0]
      };
      
      const response = await executeAgent(context);
      
      expect(response.error).toBeUndefined();
      expect(response.analysis).not.toBeNull();
      expect(response.confidence).toBeGreaterThan(0);
      expect(response.reasoning).toBeTruthy();
    });

    it('should return valid market analysis structure', async () => {
      const context: AgentContext = {
        product: mockProducts[1]
      };
      
      const response = await executeAgent(context);
      
      if (response.analysis) {
        expect(['rising', 'stable', 'falling']).toContain(response.analysis.trend);
        expect(response.analysis.confidence).toBeGreaterThanOrEqual(0);
        expect(response.analysis.confidence).toBeLessThanOrEqual(1);
        expect(typeof response.analysis.priceForecast).toBe('number');
        expect(Array.isArray(response.analysis.factors)).toBe(true);
        expect(typeof response.analysis.recommendation).toBe('string');
      }
    });

    it('should provide reasoning for analysis decisions', async () => {
      const context: AgentContext = {
        product: mockProducts[2]
      };
      
      const response = await executeAgent(context);
      
      expect(response.reasoning).toBeTruthy();
      expect(response.reasoning.length).toBeGreaterThan(20);
      expect(response.reasoning.toLowerCase()).toContain(context.product.name.toLowerCase());
    });
  });

  describe('Error Handling', () => {
    it('should handle missing product data gracefully', async () => {
      const context: AgentContext = {
        product: {
          id: '',
          name: '',
          farmer: '',
          farmerId: '',
          price: 0,
          unit: '',
          available: false,
          image: '',
          description: '',
          category: '',
          rating: 0,
          reviewCount: 0
        }
      };
      
      const response = await executeAgent(context);
      
      expect(response).toBeDefined();
      expect(response.error || response.guardrailsTriggered).toBeTruthy();
    });

    it('should handle edge case prices', async () => {
      const context: AgentContext = {
        product: {
          ...mockProducts[0],
          price: 0.01 // Exactly at minimum threshold
        }
      };
      
      const response = await executeAgent(context);
      
      // Should either succeed or fail gracefully
      expect(response).toBeDefined();
    });
  });

  describe('Tool Execution', () => {
    it('should successfully execute market analysis tool', async () => {
      const context: AgentContext = {
        product: mockProducts[3]
      };
      
      const response = await executeAgent(context);
      
      if (response.analysis) {
        expect(response.analysis.trend).toBeTruthy();
        expect(response.analysis.factors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Response Quality', () => {
    it('should provide actionable recommendations', async () => {
      const context: AgentContext = {
        product: mockProducts[4]
      };
      
      const response = await executeAgent(context);
      
      if (response.analysis) {
        expect(response.analysis.recommendation.length).toBeGreaterThan(10);
        expect(response.analysis.recommendation).toBeTruthy();
      }
    });

    it('should include relevant market factors', async () => {
      const context: AgentContext = {
        product: mockProducts[5]
      };
      
      const response = await executeAgent(context);
      
      if (response.analysis) {
        expect(response.analysis.factors.length).toBeGreaterThan(0);
        response.analysis.factors.forEach(factor => {
          expect(typeof factor).toBe('string');
          expect(factor.length).toBeGreaterThan(0);
        });
      }
    });
  });
});

/**
 * Manual Evaluation Test Cases
 * These are scenarios that should be manually tested for the demo
 */
export const manualEvaluationScenarios = [
  {
    id: 1,
    scenario: 'Normal market analysis for vegetables',
    product: 'Organic Tomatoes',
    expectedBehavior: 'Successful analysis with trend, confidence, and recommendation',
    expectedResult: 'Valid MarketAnalysis object with reasonable confidence (>0.5)'
  },
  {
    id: 2,
    scenario: 'High-priced organic product',
    product: 'Premium Organic Honey',
    expectedBehavior: 'Successful analysis with appropriate pricing insights',
    expectedResult: 'Analysis acknowledges premium pricing'
  },
  {
    id: 3,
    scenario: 'Product temporarily unavailable',
    product: 'Out of stock item',
    expectedBehavior: 'Guardrail triggers, analysis blocked',
    expectedResult: 'Error with product_unavailable guardrail'
  },
  {
    id: 4,
    scenario: 'Unsupported category (e.g., electronics)',
    product: 'Smart Watch',
    expectedBehavior: 'Guardrail triggers, category validation fails',
    expectedResult: 'Error with unsupported_category guardrail'
  },
  {
    id: 5,
    scenario: 'Edge case pricing (very low)',
    product: 'Discount item at $0.05',
    expectedBehavior: 'Guardrail triggers for low price',
    expectedResult: 'Error with price_too_low guardrail'
  },
  {
    id: 6,
    scenario: 'Edge case pricing (very high)',
    product: 'Luxury item at $5000',
    expectedBehavior: 'Guardrail triggers for high price',
    expectedResult: 'Error with price_too_high guardrail'
  }
];

/**
 * Evaluation Results Summary
 * This should be updated after running the evaluation
 */
export const evaluationResults = {
  totalTests: 12,
  passed: 0,
  failed: 0,
  passRate: 0,
  timestamp: new Date().toISOString(),
  notes: 'Run evaluation with: npm test'
};