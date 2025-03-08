
import React, { useState, useEffect } from 'react';
import { fetchBestCoins } from '../utils/dataFetcher';
import { BestCoin } from '../utils/mockData';
import LoadingPlaceholder from './LoadingPlaceholder';

const BestCoinCard: React.FC<{ bestCoin: BestCoin, index: number }> = ({ bestCoin, index }) => {
  return (
    <div className="terminal-card p-4 border border-terminal-border bg-terminal-muted/10 rounded-md">
      <h3 className="terminal-header text-lg mb-3">
        🏆 Best of Best Coin #{index + 1}
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-terminal-accent/20 text-terminal-accent text-xl font-bold">
            {bestCoin.symbol.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-xl">{bestCoin.name}</h4>
            <div className="text-muted-foreground">{bestCoin.symbol} • ${bestCoin.price.toLocaleString()}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold terminal-success">
            {bestCoin.confidence}% Confidence
          </div>
          <div className="text-sm mt-1">
            Risk: <span className={bestCoin.riskLevel === 'low' ? 'terminal-success' : bestCoin.riskLevel === 'medium' ? 'terminal-warning' : 'terminal-danger'}>
              {bestCoin.riskLevel.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-terminal-muted/20 p-3 rounded-md border border-terminal-border">
          <h5 className="text-xs text-muted-foreground mb-1">Short Term</h5>
          <div className="text-sm">
            <div className={`font-bold ${
              bestCoin.suggestedActions.shortTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.shortTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              {bestCoin.suggestedActions.shortTerm.action}
            </div>
            <div>in {bestCoin.suggestedActions.shortTerm.timeframe}</div>
            <div className={`mt-1 ${
              bestCoin.suggestedActions.shortTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.shortTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              +{bestCoin.suggestedActions.shortTerm.potentialProfit}%
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-muted/20 p-3 rounded-md border border-terminal-border">
          <h5 className="text-xs text-muted-foreground mb-1">Medium Term</h5>
          <div className="text-sm">
            <div className={`font-bold ${
              bestCoin.suggestedActions.mediumTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.mediumTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              {bestCoin.suggestedActions.mediumTerm.action}
            </div>
            <div>in {bestCoin.suggestedActions.mediumTerm.timeframe}</div>
            <div className={`mt-1 ${
              bestCoin.suggestedActions.mediumTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.mediumTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              +{bestCoin.suggestedActions.mediumTerm.potentialProfit}%
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-muted/20 p-3 rounded-md border border-terminal-border">
          <h5 className="text-xs text-muted-foreground mb-1">Long Term</h5>
          <div className="text-sm">
            <div className={`font-bold ${
              bestCoin.suggestedActions.longTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.longTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              {bestCoin.suggestedActions.longTerm.action}
            </div>
            <div>in {bestCoin.suggestedActions.longTerm.timeframe}</div>
            <div className={`mt-1 ${
              bestCoin.suggestedActions.longTerm.action === 'Buy' 
                ? 'terminal-success' 
                : bestCoin.suggestedActions.longTerm.action === 'Sell' 
                  ? 'terminal-danger' 
                  : 'terminal-warning'
            }`}>
              +{bestCoin.suggestedActions.longTerm.potentialProfit}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BestCoinDisplay: React.FC = () => {
  const [bestCoins, setBestCoins] = useState<BestCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBestCoins = async () => {
      try {
        const data = await fetchBestCoins(3);
        setBestCoins(data);
      } catch (error) {
        console.error('Error fetching best coins:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBestCoins();
  }, []);

  if (loading) {
    return <LoadingPlaceholder text="Calculating best coins" />;
  }

  if (!bestCoins.length) {
    return (
      <div className="terminal-card p-4">
        <h3 className="terminal-header text-lg mb-4">Best of Best Coins</h3>
        <div className="text-muted-foreground">No data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bestCoins.map((coin, index) => (
        <BestCoinCard key={coin.id} bestCoin={coin} index={index} />
      ))}
    </div>
  );
};

export default BestCoinDisplay;
