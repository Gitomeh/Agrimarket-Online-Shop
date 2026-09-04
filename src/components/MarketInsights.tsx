import { useState } from 'react';
import { Product, MarketAnalysis } from '../types';
import { executeAgent, AgentResponse } from '../services/agentService';
import { TrendingUp, AlertCircle, RefreshCw, Sparkles, Shield } from 'lucide-react';
import { validateMarketAnalysis } from '../services/aiService';

interface MarketInsightsProps {
  product: Product;
}

export function MarketInsights({ product }: MarketInsightsProps) {
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAgentResponse(null);

    try {
      const response = await executeAgent({ product });
      
      // Validate the analysis structure
      if (response.analysis && !validateMarketAnalysis(response.analysis)) {
        throw new Error('Invalid analysis structure returned');
      }
      
      setAgentResponse(response);
    } catch (err) {
      setAgentResponse({
        analysis: null,
        reasoning: 'Agent execution failed',
        confidence: 0,
        error: err instanceof Error ? err.message : 'Failed to execute agent'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendColor = (trend: MarketAnalysis['trend']) => {
    switch (trend) {
      case 'rising': return 'text-green-600 bg-green-50';
      case 'stable': return 'text-blue-600 bg-blue-50';
      case 'falling': return 'text-amber-600 bg-amber-50';
    }
  };

  const getTrendIcon = (trend: MarketAnalysis['trend']) => {
    return <TrendingUp className={`w-5 h-5 ${trend === 'falling' ? 'rotate-180' : ''}`} />;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-lg text-gray-900">AI Market Insights</h3>
      </div>

      {!agentResponse && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Get AI-powered market analysis for {product.name} to make informed purchasing decisions.
          </p>
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex items-center gap-2 mx-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Market</span>
              </>
            )}
          </button>
        </div>
      )}

      {agentResponse && agentResponse.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Analysis Failed</p>
              <p className="text-sm text-red-700 mt-1">{agentResponse.error}</p>
              {agentResponse.guardrailsTriggered && agentResponse.guardrailsTriggered.length > 0 && (
                <div className="mt-2 bg-red-100 rounded p-2">
                  <p className="text-xs font-medium text-red-800">Guardrails triggered: {agentResponse.guardrailsTriggered.join(', ')}</p>
                </div>
              )}
              <button
                onClick={handleAnalyze}
                className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {agentResponse && agentResponse.analysis && (
        <div className="space-y-4">
          <div className={`flex items-center gap-3 p-3 rounded-lg ${getTrendColor(agentResponse.analysis.trend)}`}>
            {getTrendIcon(agentResponse.analysis.trend)}
            <div>
              <p className="font-medium capitalize">{agentResponse.analysis.trend} Trend</p>
              <p className="text-sm opacity-75">Confidence: {(agentResponse.analysis.confidence * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium mb-2">Price Forecast</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">KSh {agentResponse.analysis.priceForecast.toLocaleString()}</span>
              <span className="text-gray-600">/ {product.unit}</span>
              <span className="text-sm text-gray-500">
                ({agentResponse.analysis.priceForecast > product.price ? '+' : ''}{((agentResponse.analysis.priceForecast - product.price) / product.price * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium mb-2">Key Factors</h4>
            <ul className="space-y-1">
              {agentResponse.analysis.factors.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-1">Agent Reasoning</h4>
            <p className="text-sm text-blue-800">{agentResponse.reasoning}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-1">Recommendation</h4>
            <p className="text-sm text-green-800">{agentResponse.analysis.recommendation}</p>
          </div>

          {agentResponse.guardrailsTriggered && agentResponse.guardrailsTriggered.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <h4 className="font-medium text-amber-900">Safety Checks</h4>
              </div>
              <p className="text-sm text-amber-800">Guardrails active: {agentResponse.guardrailsTriggered.join(', ')}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Analysis</span>
          </button>
        </div>
      )}
    </div>
  );
}
