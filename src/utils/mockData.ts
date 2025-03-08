// Portfolio data structure
export interface Portfolio {
  id: string;
  name: string;
  performance: number; // Percentage gain/loss
  coins: CoinHolding[];
  recentActions: TraderAction[];
}

export interface CoinHolding {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  valueUSD: number;
  percentageOfPortfolio: number;
}

export interface TraderAction {
  id: string;
  coinId: string;
  coinSymbol: string;
  coinName: string;
  action: 'buy' | 'sell' | 'hold';
  timestamp: number; // Unix timestamp
  price: number;
}

export interface CoinSuggestion {
  id: string;
  name: string;
  symbol: string;
  confidence: number; // 0-100
  price: number;
  action: 'buy' | 'sell' | 'hold';
  portfoliosCount: number; // How many portfolios are taking this action
  riskLevel: 'low' | 'medium' | 'high';
  suggestedHoldTime?: number; // In days
}

export interface BestCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  suggestedActions: {
    shortTerm: { action: string; timeframe: string; potentialProfit: number };
    mediumTerm: { action: string; timeframe: string; potentialProfit: number };
    longTerm: { action: string; timeframe: string; potentialProfit: number };
  };
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  priceChange7d: number;
  whaleAccumulation: number; // Percentage of whale portfolios holding this coin
  technicalScore: number; // Technical analysis score (0-100)
  fundamentalScore: number; // Fundamental analysis score (0-100)
  sentimentScore: number; // Market sentiment score (0-100)
  analysisMethod: string; // Method used for analysis
}

export interface TradeTactic {
  id: string;
  name: string;
  description: string;
  steps: TradingStep[];
  expectedProfitPercentage: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: string;
  confidence: number;
  lastUpdated: number;
  nextUpdate: number;
  analysisReason: string;
}

export interface TradingStep {
  order: number;
  action: 'buy' | 'sell' | 'swap';
  coinId: string;
  coinName: string;
  coinSymbol: string;
  timing: string;
  condition?: string;
  profitTarget?: number;
  stopLoss?: number;
  price?: number;
}

// Generate mock top portfolios
export const generateMockPortfolios = (count: number = 10): Portfolio[] => {
  const portfolios: Portfolio[] = [];
  
  for (let i = 0; i < count; i++) {
    const coins = generateMockCoins(Math.floor(Math.random() * 5) + 3);
    
    portfolios.push({
      id: `portfolio-${i}`,
      name: `Whale ${i + 1}`,
      performance: +(Math.random() * 40 - 5).toFixed(2),
      coins,
      recentActions: generateMockActions(coins, Math.floor(Math.random() * 3) + 1)
    });
  }
  
  // Sort by performance (best first)
  return portfolios.sort((a, b) => b.performance - a.performance);
};

// Generate mock coins
export const generateMockCoins = (count: number = 5): CoinHolding[] => {
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' }
  ];
  
  const selectedCoins: CoinHolding[] = [];
  const selectedIndices = new Set<number>();
  
  while (selectedIndices.size < count && selectedIndices.size < coins.length) {
    const randomIndex = Math.floor(Math.random() * coins.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      const coin = coins[randomIndex];
      const amount = +(Math.random() * 100).toFixed(4);
      const valueUSD = +(amount * (Math.random() * 10000 + 100)).toFixed(2);
      
      selectedCoins.push({
        ...coin,
        amount,
        valueUSD,
        percentageOfPortfolio: +(Math.random() * 100).toFixed(2)
      });
    }
  }
  
  return selectedCoins;
};

// Generate mock actions
export const generateMockActions = (coins: CoinHolding[], count: number = 3): TraderAction[] => {
  const actions: TraderAction[] = [];
  const actionTypes: ('buy' | 'sell' | 'hold')[] = ['buy', 'sell', 'hold'];
  
  for (let i = 0; i < count && i < coins.length; i++) {
    const coin = coins[i];
    const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    
    actions.push({
      id: `action-${i}`,
      coinId: coin.id,
      coinSymbol: coin.symbol,
      coinName: coin.name,
      action,
      timestamp: Date.now() - Math.floor(Math.random() * 86400000), // Random time in last 24h
      price: +(Math.random() * 10000 + 100).toFixed(2)
    });
  }
  
  return actions.sort((a, b) => b.timestamp - a.timestamp);
};

// Generate coin suggestions
export const generateMockSuggestions = (count: number = 5): CoinSuggestion[] => {
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' }
  ];
  
  const suggestions: CoinSuggestion[] = [];
  const actionTypes: ('buy' | 'sell' | 'hold')[] = ['buy', 'sell', 'hold'];
  const riskLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  
  const selectedIndices = new Set<number>();
  
  while (selectedIndices.size < count && selectedIndices.size < coins.length) {
    const randomIndex = Math.floor(Math.random() * coins.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      const coin = coins[randomIndex];
      const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      
      suggestions.push({
        ...coin,
        confidence: +(Math.random() * 40 + 60).toFixed(1), // 60-100%
        price: +(Math.random() * 10000 + 100).toFixed(2),
        action,
        portfoliosCount: Math.floor(Math.random() * 60) + 40, // 40-100 portfolios
        riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
        suggestedHoldTime: action === 'buy' ? Math.floor(Math.random() * 30) + 1 : undefined, // 1-30 days
      });
    }
  }
  
  return suggestions.sort((a, b) => b.confidence - a.confidence);
};

// Generate multiple best coins with improved accuracy
export const generateBestCoins = (count: number = 3): BestCoin[] => {
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' }
  ];
  
  const bestCoins: BestCoin[] = [];
  const selectedIndices = new Set<number>();
  
  while (selectedIndices.size < count && selectedIndices.size < coins.length) {
    const randomIndex = Math.floor(Math.random() * coins.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      const coin = coins[randomIndex];
      
      const technicalScore = +(Math.random() * 20 + 75).toFixed(1); // 75-95
      const fundamentalScore = +(Math.random() * 20 + 70).toFixed(1); // 70-90
      const sentimentScore = +(Math.random() * 30 + 65).toFixed(1); // 65-95
      
      const baseConfidence = +(Math.random() * 10 + 85).toFixed(1); // 85-95 base
      const whaleAccumulation = +(Math.random() * 40 + 50).toFixed(1); // 50-90%
      
      const weightedConfidence = +(
        (baseConfidence * 0.4) + 
        (technicalScore * 0.2) + 
        (fundamentalScore * 0.2) + 
        (sentimentScore * 0.1) + 
        (whaleAccumulation * 0.1)
      ).toFixed(1);
      
      const priceChange24h = +(Math.random() * 16 - 8).toFixed(2); // -8% to +8%
      const priceChange7d = +(Math.random() * 30 - 10).toFixed(2); // -10% to +20%
      
      const price = +(Math.random() * 10000 + 1000).toFixed(2);
      const marketCap = +(Math.random() * 500 + 100).toFixed(1) * 1e9; // 100B to 600B
      const volume24h = +(Math.random() * 50 + 10).toFixed(1) * 1e9; // 10B to 60B
      
      const volatilityFactor = Math.abs(priceChange24h) + Math.abs(priceChange7d) / 3;
      let riskLevel: 'low' | 'medium' | 'high';
      
      if (marketCap > 300e9 && volatilityFactor < 10) {
        riskLevel = 'low';
      } else if (marketCap > 100e9 || volatilityFactor < 15) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'high';
      }
      
      const shortTermAction = priceChange24h > 2 && technicalScore > 80 ? 'Buy' : 
                             priceChange24h < -5 ? 'Sell' : 'Hold';
                             
      const mediumTermAction = priceChange7d > 5 && fundamentalScore > 75 ? 'Buy' : 
                              priceChange7d < -8 ? 'Sell' : 'Hold';
                              
      const longTermAction = (fundamentalScore > 80 && sentimentScore > 75) ? 'Buy' : 
                            (fundamentalScore < 60) ? 'Sell' : 'Hold';
      
      const analysisMethod = [
        'AI Pattern Recognition',
        'On-Chain Analysis',
        'Whale Tracking',
        'Technical Indicators',
        'Volume Analysis',
        'Sentiment Analysis'
      ][Math.floor(Math.random() * 6)];
      
      bestCoins.push({
        ...coin,
        price,
        suggestedActions: {
          shortTerm: { 
            action: shortTermAction, 
            timeframe: `${Math.floor(Math.random() * 7) + 1} days`,
            potentialProfit: +(Math.random() * 10 + 5).toFixed(2)
          },
          mediumTerm: { 
            action: mediumTermAction,
            timeframe: `${Math.floor(Math.random() * 10) + 7} days`,
            potentialProfit: +(Math.random() * 20 + 10).toFixed(2)
          },
          longTerm: { 
            action: longTermAction,
            timeframe: `${Math.floor(Math.random() * 20) + 14} days`,
            potentialProfit: +(Math.random() * 30 + 20).toFixed(2)
          }
        },
        riskLevel,
        confidence: weightedConfidence,
        marketCap,
        volume24h,
        priceChange24h,
        priceChange7d,
        whaleAccumulation,
        technicalScore,
        fundamentalScore,
        sentimentScore,
        analysisMethod
      });
    }
  }
  
  return bestCoins.sort((a, b) => b.confidence - a.confidence);
};

// Generate trade tactics
export const generateTradeTactics = (count: number = 3): TradeTactic[] => {
  const now = Date.now();
  const tactics: TradeTactic[] = [];
  
  // Sample tactics
  const tacticTemplates = [
    {
      name: 'ETH-BTC Swing Trade',
      description: 'Capitalize on the volatility between Ethereum and Bitcoin',
      steps: [
        {
          order: 1,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'ethereum',
          coinName: 'Ethereum',
          coinSymbol: 'ETH',
          timing: '48 hours',
          condition: 'When ETH drops below 5% daily change',
          profitTarget: 8,
          stopLoss: -3
        },
        {
          order: 2,
          action: 'sell' as 'sell', // Type assertion to match expected type
          coinId: 'ethereum',
          coinName: 'Ethereum',
          coinSymbol: 'ETH',
          timing: '2-3 days after purchase',
          condition: 'When ETH reaches 8% profit or more',
        },
        {
          order: 3,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'bitcoin',
          coinName: 'Bitcoin',
          coinSymbol: 'BTC',
          timing: 'Immediately after ETH sale',
          condition: 'Only if BTC is ranging (±2% weekly)',
          profitTarget: 5,
          stopLoss: -2
        }
      ],
      expectedProfitPercentage: 14.5,
      riskLevel: 'medium' as 'medium', // Type assertion to match expected type
      timeframe: '1 week',
      confidence: 87,
      analysisReason: 'Historical data shows 78% success rate for this pattern over the last 3 months. ETH and BTC volatility metrics indicate favorable conditions for this strategy.'
    },
    {
      name: 'SOL Quick Flip',
      description: 'Quick profit from Solana price movements',
      steps: [
        {
          order: 1,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'solana',
          coinName: 'Solana',
          coinSymbol: 'SOL',
          timing: '24 hours',
          condition: 'When SOL is in oversold territory (RSI < 30)',
          profitTarget: 12,
          stopLoss: -5
        },
        {
          order: 2,
          action: 'sell' as 'sell', // Type assertion to match expected type
          coinId: 'solana',
          coinName: 'Solana',
          coinSymbol: 'SOL',
          timing: '1-2 days after purchase',
          condition: 'When SOL reaches 10% profit or more',
        }
      ],
      expectedProfitPercentage: 12.3,
      riskLevel: 'high' as 'high', // Type assertion to match expected type
      timeframe: '48 hours',
      confidence: 76,
      analysisReason: 'SOL has demonstrated rapid rebounds after dips below 30 RSI. Current market sentiment and technical indicators suggest a high probability of a quick bounce.'
    },
    {
      name: 'BTC-AVAX Rotation',
      description: 'Rotate capital between Bitcoin and Avalanche',
      steps: [
        {
          order: 1,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'bitcoin',
          coinName: 'Bitcoin',
          coinSymbol: 'BTC',
          timing: '72 hours',
          condition: 'After a 5% or more dip',
          profitTarget: 7,
          stopLoss: -3
        },
        {
          order: 2,
          action: 'sell' as 'sell', // Type assertion to match expected type
          coinId: 'bitcoin',
          coinName: 'Bitcoin',
          coinSymbol: 'BTC',
          timing: '3-5 days after purchase',
          condition: 'When BTC reaches 6-7% profit',
        },
        {
          order: 3,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'avalanche',
          coinName: 'Avalanche',
          coinSymbol: 'AVAX',
          timing: 'Within 24 hours of BTC sale',
          condition: 'Only if AVAX has underperformed BTC in the past week',
          profitTarget: 15,
          stopLoss: -6
        }
      ],
      expectedProfitPercentage: 18.2,
      riskLevel: 'medium' as 'medium', // Type assertion to match expected type
      timeframe: '10 days',
      confidence: 82,
      analysisReason: 'Statistical analysis shows BTC often leads market movements with AVAX following with amplified returns. This strategy has yielded an average of 16.8% profit in similar market conditions.'
    },
    {
      name: 'LINK-DOT Arbitrage',
      description: 'Exploit correlation divergence between Chainlink and Polkadot',
      steps: [
        {
          order: 1,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'chainlink',
          coinName: 'Chainlink',
          coinSymbol: 'LINK',
          timing: '48 hours',
          condition: 'When LINK/DOT ratio drops below 30-day average',
          profitTarget: 10,
          stopLoss: -4
        },
        {
          order: 2,
          action: 'sell' as 'sell', // Type assertion to match expected type
          coinId: 'chainlink',
          coinName: 'Chainlink',
          coinSymbol: 'LINK',
          timing: '3-4 days after purchase',
          condition: 'When LINK rises against DOT by 8% or more',
        }
      ],
      expectedProfitPercentage: 10.5,
      riskLevel: 'low' as 'low', // Type assertion to match expected type
      timeframe: '5 days',
      confidence: 90,
      analysisReason: 'LINK and DOT have a 0.86 correlation coefficient but occasionally diverge. This strategy capitalizes on the historical tendency for their prices to reconverge.'
    },
    {
      name: 'ADA Accumulation',
      description: 'Strategic accumulation of Cardano during price weakness',
      steps: [
        {
          order: 1,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'cardano',
          coinName: 'Cardano',
          coinSymbol: 'ADA',
          timing: '72 hours',
          condition: 'After 3 consecutive red days',
          profitTarget: 15,
          stopLoss: -7
        },
        {
          order: 2,
          action: 'buy' as 'buy', // Type assertion to match expected type
          coinId: 'cardano',
          coinName: 'Cardano',
          coinSymbol: 'ADA',
          timing: '48 hours after first purchase',
          condition: 'If price drops another 5% or more',
        },
        {
          order: 3,
          action: 'sell' as 'sell', // Type assertion to match expected type
          coinId: 'cardano',
          coinName: 'Cardano',
          coinSymbol: 'ADA',
          timing: '7-10 days after last purchase',
          condition: 'When ADA rises 12% or more from average entry',
        }
      ],
      expectedProfitPercentage: 16.8,
      riskLevel: 'medium' as 'medium', // Type assertion to match expected type
      timeframe: '2 weeks',
      confidence: 84,
      analysisReason: 'ADA has shown patterns of sharp rebounds after consecutive down days. Current sentiment metrics and on-chain activity suggest accumulation by large holders.'
    }
  ];

  // Randomly select and customize tactics
  for (let i = 0; i < count; i++) {
    const template = tacticTemplates[Math.floor(Math.random() * tacticTemplates.length)];
    
    // Create next update time (either at 00:00 or 12:00)
    const currentHour = new Date(now).getHours();
    let nextUpdate = new Date(now);
    if (currentHour < 12) {
      nextUpdate.setHours(12, 0, 0, 0);
    } else {
      nextUpdate.setHours(24, 0, 0, 0);
    }
    
    // Add some randomness to the expected profit
    const profitVariation = (Math.random() * 4) - 2; // -2% to +2%
    
    tactics.push({
      id: `tactic-${i + 1}`,
      name: template.name,
      description: template.description,
      steps: template.steps,
      expectedProfitPercentage: +(template.expectedProfitPercentage + profitVariation).toFixed(1),
      riskLevel: template.riskLevel,
      timeframe: template.timeframe,
      confidence: Math.min(100, Math.max(60, template.confidence + Math.floor(Math.random() * 10) - 5)),
      lastUpdated: now - Math.floor(Math.random() * 12 * 60 * 60 * 1000), // 0-12 hours ago
      nextUpdate: nextUpdate.getTime(),
      analysisReason: template.analysisReason
    });
  }
  
  return tactics.sort((a, b) => b.expectedProfitPercentage - a.expectedProfitPercentage);
};

// Keep the single coin generator for backward compatibility
export const generateBestCoin = (): BestCoin => {
  return generateBestCoins(1)[0];
};

export const generateDataSources = (): DataSource[] => {
  return [
    { id: '1', name: 'CoinMarketCap', url: 'https://coinmarketcap.com', status: 'online', lastUpdated: Date.now() - 120000 },
    { id: '2', name: 'CoinGecko', url: 'https://www.coingecko.com', status: 'online', lastUpdated: Date.now() - 180000 },
    { id: '3', name: 'CryptoCompare', url: 'https://www.cryptocompare.com', status: 'online', lastUpdated: Date.now() - 360000 },
    { id: '4', name: 'TradingView', url: 'https://www.tradingview.com', status: 'online', lastUpdated: Date.now() - 240000 },
    { id: '5', name: 'CoinCodex', url: 'https://coincodex.com', status: 'online', lastUpdated: Date.now() - 480000 },
    { id: '6', name: 'Messari', url: 'https://messari.io', status: 'online', lastUpdated: Date.now() - 600000 },
    { id: '7', name: 'Glassnode', url: 'https://glassnode.com', status: 'online', lastUpdated: Date.now() - 720000 },
    { id: '8', name: 'Nomics', url: 'https://nomics.com', status: 'online', lastUpdated: Date.now() - 540000 },
    { id: '9', name: 'Santiment', url: 'https://santiment.net', status: 'online', lastUpdated: Date.now() - 420000 },
    { id: '10', name: 'CryptoQuant', url: 'https://cryptoquant.com', status: 'online', lastUpdated: Date.now() - 300000 }
  ];
};
