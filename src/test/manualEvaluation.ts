/**
 * Manual Agent Evaluation Script
 * 
 * This script performs manual evaluation of the AgriMarket AI agent
 * and generates a report with pass/fail results.
 */

import { executeAgent, AgentContext } from '../services/agentService';
import { mockProducts } from '../data/mockData';

interface EvaluationTestCase {
  id: number;
  name: string;
  scenario: string;
  setup: () => AgentContext;
  expectedBehavior: string;
  evaluate: (response: any) => { passed: boolean; notes: string };
}

const evaluationTestCases: EvaluationTestCase[] = [
  {
    id: 1,
    name: 'Normal Market Analysis',
    scenario: 'Standard vegetable product analysis',
    setup: () => ({ product: mockProducts[0] }),
    expectedBehavior: 'Agent should return valid market analysis with confidence > 0.5',
    evaluate: (response) => {
      const passed = response.analysis !== null && 
                     response.confidence > 0.5 &&
                     response.error === undefined;
      return {
        passed,
        notes: passed ? 'Analysis successful with good confidence' : `Failed: ${response.error || 'Low confidence'}`
      };
    }
  },
  {
    id: 2,
    name: 'Price Guardrail - High',
    scenario: 'Product with price above maximum threshold',
    setup: () => ({ 
      product: { ...mockProducts[0], price: 2000 }
    }),
    expectedBehavior: 'Agent should reject due to price guardrail',
    evaluate: (response) => {
      const passed = response.analysis === null && 
                     response.guardrailsTriggered?.includes('price_too_high');
      return {
        passed,
        notes: passed ? 'Guardrail correctly triggered' : `Guardrail failed: ${response.error}`
      };
    }
  },
  {
    id: 3,
    name: 'Price Guardrail - Low',
    scenario: 'Product with price below minimum threshold',
    setup: () => ({ 
      product: { ...mockProducts[0], price: 0.001 }
    }),
    expectedBehavior: 'Agent should reject due to price guardrail',
    evaluate: (response) => {
      const passed = response.analysis === null && 
                     response.guardrailsTriggered?.includes('price_too_low');
      return {
        passed,
        notes: passed ? 'Guardrail correctly triggered' : `Guardrail failed: ${response.error}`
      };
    }
  },
  {
    id: 4,
    name: 'Category Guardrail',
    scenario: 'Product with unsupported category',
    setup: () => ({ 
      product: { ...mockProducts[0], category: 'Electronics' }
    }),
    expectedBehavior: 'Agent should reject due to category guardrail',
    evaluate: (response) => {
      const passed = response.analysis === null && 
                     response.guardrailsTriggered?.includes('unsupported_category');
      return {
        passed,
        notes: passed ? 'Guardrail correctly triggered' : `Guardrail failed: ${response.error}`
      };
    }
  },
  {
    id: 5,
    name: 'Availability Guardrail',
    scenario: 'Product that is unavailable',
    setup: () => ({ 
      product: { ...mockProducts[0], available: false }
    }),
    expectedBehavior: 'Agent should reject due to availability guardrail',
    evaluate: (response) => {
      const passed = response.analysis === null && 
                     response.guardrailsTriggered?.includes('product_unavailable');
      return {
        passed,
        notes: passed ? 'Guardrail correctly triggered' : `Guardrail failed: ${response.error}`
      };
    }
  },
  {
    id: 6,
    name: 'Response Structure Validation',
    scenario: 'Verify analysis has proper structure',
    setup: () => ({ product: mockProducts[1] }),
    expectedBehavior: 'Analysis should contain all required fields',
    evaluate: (response) => {
      if (!response.analysis) {
        return { passed: false, notes: 'No analysis returned' };
      }
      const hasRequiredFields = 
        typeof response.analysis.trend === 'string' &&
        typeof response.analysis.confidence === 'number' &&
        typeof response.analysis.priceForecast === 'number' &&
        Array.isArray(response.analysis.factors) &&
        typeof response.analysis.recommendation === 'string';
      
      const validTrend = ['rising', 'stable', 'falling'].includes(response.analysis.trend);
      const validConfidence = response.analysis.confidence >= 0 && response.analysis.confidence <= 1;
      
      return {
        passed: hasRequiredFields && validTrend && validConfidence,
        notes: hasRequiredFields && validTrend && validConfidence 
          ? 'All fields present and valid' 
          : 'Missing or invalid fields'
      };
    }
  },
  {
    id: 7,
    name: 'Reasoning Quality',
    scenario: 'Verify agent provides meaningful reasoning',
    setup: () => ({ product: mockProducts[2] }),
    expectedBehavior: 'Agent should provide detailed reasoning',
    evaluate: (response) => {
      const passed = response.reasoning && 
                     response.reasoning.length > 50 &&
                     response.reasoning.toLowerCase().includes(mockProducts[2].name.toLowerCase());
      return {
        passed,
        notes: passed ? 'Reasoning is detailed and context-aware' : 'Reasoning too short or missing context'
      };
    }
  },
  {
    id: 8,
    name: 'Recommendation Quality',
    scenario: 'Verify recommendations are actionable',
    setup: () => ({ product: mockProducts[3] }),
    expectedBehavior: 'Recommendation should be practical and clear',
    evaluate: (response) => {
      if (!response.analysis) {
        return { passed: false, notes: 'No analysis returned' };
      }
      const passed = response.analysis.recommendation.length > 10 &&
                     response.analysis.recommendation.split(' ').length >= 3;
      return {
        passed,
        notes: passed ? 'Recommendation is actionable' : 'Recommendation too brief'
      };
    }
  }
];

export async function runManualEvaluation(): Promise<{
  results: Array<{
    testCase: EvaluationTestCase;
    result: { passed: boolean; notes: string };
  }>;
  summary: {
    total: number;
    passed: number;
    failed: number;
    passRate: number;
  };
}> {
  console.log('🔍 Starting AgriMarket Agent V2 Evaluation...\n');
  
  const results = [];
  
  for (const testCase of evaluationTestCases) {
    console.log(`Test ${testCase.id}: ${testCase.name}`);
    console.log(`Scenario: ${testCase.scenario}`);
    console.log(`Expected: ${testCase.expectedBehavior}`);
    
    try {
      const context = testCase.setup();
      const response = await executeAgent(context);
      const evaluation = testCase.evaluate(response);
      
      console.log(`Result: ${evaluation.passed ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`Notes: ${evaluation.notes}\n`);
      
      results.push({
        testCase,
        result: evaluation
      });
    } catch (error) {
      console.log(`Result: ❌ FAIL`);
      console.log(`Notes: Error during execution: ${error}\n`);
      
      results.push({
        testCase,
        result: {
          passed: false,
          notes: `Execution error: ${error instanceof Error ? error.message : String(error)}`
        }
      });
    }
  }
  
  const passed = results.filter(r => r.result.passed).length;
  const failed = results.length - passed;
  const passRate = (passed / results.length) * 100;
  
  const summary = {
    total: results.length,
    passed,
    failed,
    passRate: Math.round(passRate * 10) / 10
  };
  
  console.log('\n📊 Evaluation Summary:');
  console.log(`Total Tests: ${summary.total}`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Pass Rate: ${summary.passRate}%\n`);
  
  return { results, summary };
}

// Run evaluation if this file is executed directly
if (typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE === 'test') {
  runManualEvaluation().then(() => {
    console.log('Evaluation complete!');
    // Note: process.exit is not available in browser environments
    // This is typically run in Node.js environment for testing
  });
}