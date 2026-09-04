import { MarketAnalysis } from '../types';

// AI-powered market analysis service using OpenAI API
export async function analyzeMarketTrends(productName: string, currentPrice: number): Promise<MarketAnalysis> {
  // Access environment variable
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  // Fallback to mock if no API key is provided
  if (!apiKey) {
    console.warn('OpenAI API key not found, using mock analysis');
    return getMockAnalysis(productName, currentPrice);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an agricultural market analyst AI. Analyze market trends for agricultural products and provide structured JSON responses.
            
            Always respond with valid JSON in this exact format:
            {
              "trend": "rising" | "stable" | "falling",
              "confidence": number between 0 and 1,
              "priceForecast": number,
              "factors": ["factor1", "factor2", "factor3"],
              "recommendation": "brief recommendation text"
            }
            
            Be realistic and base your analysis on typical agricultural market patterns.`
          },
          {
            role: 'user',
            content: `Analyze the market trends for ${productName} currently priced at KSh ${currentPrice}. Provide market trend analysis, price forecast, key factors affecting the market, and a buying recommendation.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const analysis = JSON.parse(content);
    
    // Validate the response structure
    if (!validateMarketAnalysis(analysis)) {
      throw new Error('Invalid AI response format');
    }

    return analysis;
  } catch (error) {
    console.error('AI analysis failed, falling back to mock:', error);
    return getMockAnalysis(productName, currentPrice);
  }
}

// Mock analysis as fallback
function getMockAnalysis(productName: string, currentPrice: number): MarketAnalysis {
  const priceThreshold = productName.toLowerCase().includes('organic') ? 5.0 : 3.0;
  const trend = currentPrice > priceThreshold ? 'stable' : 'rising';
  const confidence = 0.75 + Math.random() * 0.2;
  const priceForecast = currentPrice * (1 + (Math.random() - 0.5) * 0.1);

  const factors = [
    'Seasonal demand patterns',
    'Local supply conditions',
    'Weather impact on harvest',
    'Transportation costs',
    'Market competition'
  ].slice(0, Math.floor(Math.random() * 3) + 2);

  const recommendations = {
    rising: 'Good time to buy - prices expected to increase soon',
    stable: 'Market conditions stable - fair pricing',
    falling: 'Consider waiting for better prices'
  };

  return {
    trend,
    confidence: Math.round(confidence * 100) / 100,
    priceForecast: Math.round(priceForecast * 100) / 100,
    factors,
    recommendation: recommendations[trend]
  };
}

// Validate AI response structure
export function validateMarketAnalysis(data: unknown): data is MarketAnalysis {
  if (typeof data !== 'object' || data === null) return false;

  const analysis = data as Partial<MarketAnalysis>;

  return (
    typeof analysis.trend === 'string' &&
    ['rising', 'stable', 'falling'].includes(analysis.trend) &&
    typeof analysis.confidence === 'number' &&
    analysis.confidence >= 0 &&
    analysis.confidence <= 1 &&
    typeof analysis.priceForecast === 'number' &&
    Array.isArray(analysis.factors) &&
    analysis.factors.every(f => typeof f === 'string') &&
    typeof analysis.recommendation === 'string'
  );
}
