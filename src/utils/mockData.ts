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

export interface DataSource {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline';
  lastUpdated: number; // Unix timestamp
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
