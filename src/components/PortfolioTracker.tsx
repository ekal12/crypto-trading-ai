
import React, { useState, useEffect } from 'react';
import { fetchTopPortfolios } from '../utils/dataFetcher';
import { Portfolio, TraderAction } from '../utils/mockData';
import LoadingPlaceholder from './LoadingPlaceholder';
import { formatTime, getActionColorClass } from '../utils/dataFetcher';

const PortfolioTracker: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedPortfolio, setExpandedPortfolio] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const data = await fetchTopPortfolios(10);
        setPortfolios(data);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  const togglePortfolio = (id: string) => {
    if (expandedPortfolio === id) {
      setExpandedPortfolio(null);
    } else {
      setExpandedPortfolio(id);
    }
  };

  const renderActions = (actions: TraderAction[]) => {
    return (
      <div className="mt-2 bg-terminal-muted/30 rounded p-2 text-sm">
        <h4 className="text-xs uppercase text-muted-foreground mb-2">Recent Actions</h4>
        <div className="space-y-1">
          {actions.map((action) => (
            <div key={action.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className={getActionColorClass(action.action)}>
                  {action.action === 'buy' ? '↗️' : action.action === 'sell' ? '↘️' : '↔️'}
                </span>
                <span>
                  {action.coinSymbol}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>${action.price.toLocaleString()}</span>
                <span className="text-muted-foreground text-xs">{formatTime(action.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingPlaceholder text="Tracking portfolios" />;
  }

  return (
    <div className="terminal-card p-4">
      <h3 className="terminal-header text-lg mb-4">Top Portfolios Tracker</h3>
      <div className="space-y-3">
        {portfolios.map((portfolio) => (
          <div 
            key={portfolio.id} 
            className="border border-terminal-border rounded-md p-3 bg-terminal-muted/20 hover:bg-terminal-muted/30 transition-colors cursor-pointer"
            onClick={() => togglePortfolio(portfolio.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{portfolio.name}</span>
                <span className={portfolio.performance >= 0 ? 'terminal-success' : 'terminal-danger'}>
                  {portfolio.performance >= 0 ? '+' : ''}{portfolio.performance}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {expandedPortfolio === portfolio.id ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedPortfolio === portfolio.id && (
              <>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {portfolio.coins.slice(0, 4).map((coin) => (
                    <div key={coin.id} className="flex justify-between">
                      <span>{coin.symbol}</span>
                      <span>${coin.valueUSD.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                {portfolio.recentActions.length > 0 && renderActions(portfolio.recentActions)}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTracker;
