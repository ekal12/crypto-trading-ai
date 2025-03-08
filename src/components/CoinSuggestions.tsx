
import React, { useState, useEffect } from 'react';
import { fetchCoinSuggestions } from '../utils/dataFetcher';
import { CoinSuggestion } from '../utils/mockData';
import LoadingPlaceholder from './LoadingPlaceholder';
import { getActionColorClass, getActionIcon } from '../utils/dataFetcher';

const CoinSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await fetchCoinSuggestions(5);
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  if (loading) {
    return <LoadingPlaceholder text="Analyzing top suggestions" />;
  }

  return (
    <div className="terminal-card p-4">
      <h3 className="terminal-header text-lg mb-4">AI Coin Suggestions</h3>
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="border border-terminal-border rounded-md p-3 bg-terminal-muted/20"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className={getActionColorClass(suggestion.action)}>{getActionIcon(suggestion.action)}</span>
                <span className="font-bold">{suggestion.name}</span>
                <span className="text-sm text-muted-foreground">({suggestion.symbol})</span>
              </div>
              <div className="text-right">
                <div className="font-mono">${suggestion.price.toLocaleString()}</div>
                <div className="text-xs mt-1 font-medium px-2 py-0.5 rounded-full inline-block" 
                  style={{
                    backgroundColor: suggestion.confidence >= 90 
                      ? 'rgba(63, 185, 80, 0.2)' 
                      : suggestion.confidence >= 75 
                      ? 'rgba(210, 153, 34, 0.2)' 
                      : 'rgba(248, 81, 73, 0.2)',
                    color: suggestion.confidence >= 90 
                      ? 'rgb(63, 185, 80)' 
                      : suggestion.confidence >= 75 
                      ? 'rgb(210, 153, 34)' 
                      : 'rgb(248, 81, 73)'
                  }}
                >
                  {suggestion.confidence}% confidence
                </div>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-xs text-muted-foreground block">Portfolios</span>
                <span>{suggestion.portfoliosCount}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Risk Level</span>
                <span className={
                  suggestion.riskLevel === 'low' 
                    ? 'terminal-success' 
                    : suggestion.riskLevel === 'medium' 
                    ? 'terminal-warning' 
                    : 'terminal-danger'
                }>
                  {suggestion.riskLevel.charAt(0).toUpperCase() + suggestion.riskLevel.slice(1)}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Suggested Hold</span>
                <span>{suggestion.suggestedHoldTime ? `${suggestion.suggestedHoldTime} days` : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinSuggestions;
