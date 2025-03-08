import { 
  Portfolio, 
  CoinSuggestion, 
  BestCoin, 
  DataSource,
  TradeTactic,
  generateMockPortfolios,
  generateMockSuggestions,
  generateBestCoins,
  generateDataSources,
  generateTradeTactics
} from './mockData';

export const fetchTopPortfolios = async (count: number = 10): Promise<Portfolio[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return generateMockPortfolios(count);
};

export const fetchCoinSuggestions = async (count: number = 5): Promise<CoinSuggestion[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return generateMockSuggestions(count);
};

export const fetchBestCoins = async (count: number = 3): Promise<BestCoin[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateBestCoins(count);
};

export const fetchDataSources = async (): Promise<DataSource[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return generateDataSources();
};

export const fetchTradeTactics = async (count: number = 3): Promise<TradeTactic[]> => {
  await new Promise(resolve => setTimeout(resolve, 900));
  return generateTradeTactics(count);
};

export const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) {
    return 'just now';
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}m ago`;
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}h ago`;
  } else {
    return `${Math.floor(diff / 86400000)}d ago`;
  }
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else if (amount >= 1e3) {
    return `$${(amount / 1e3).toFixed(1)}K`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};

export const getActionColorClass = (action: 'buy' | 'sell' | 'hold'): string => {
  switch (action) {
    case 'buy':
      return 'terminal-success';
    case 'sell':
      return 'terminal-danger';
    case 'hold':
      return 'terminal-warning';
    default:
      return '';
  }
};

export const getActionIcon = (action: 'buy' | 'sell' | 'hold'): string => {
  switch (action) {
    case 'buy':
      return '↗️';
    case 'sell':
      return '↘️';
    case 'hold':
      return '↔️';
    default:
      return '';
  }
};

export const getRiskLevelDescription = (riskLevel: 'low' | 'medium' | 'high'): string => {
  switch (riskLevel) {
    case 'low':
      return 'Stable asset with lower volatility';
    case 'medium':
      return 'Moderate volatility with balanced risk/reward';
    case 'high':
      return 'High volatility with potential for large gains/losses';
    default:
      return '';
  }
};

export const getAnalysisMethodDescription = (method: string): string => {
  switch (method) {
    case 'AI Pattern Recognition':
      return 'Machine learning algorithms analyzing historical price patterns';
    case 'On-Chain Analysis':
      return 'Analysis of blockchain transactions and wallet activities';
    case 'Whale Tracking':
      return 'Monitoring large-scale transactions from major holders';
    case 'Technical Indicators':
      return 'Traditional technical analysis using market indicators';
    case 'Volume Analysis':
      return 'Study of trading volumes and liquidity patterns';
    case 'Sentiment Analysis':
      return 'Analysis of market sentiment and social media trends';
    default:
      return 'Multiple technical and fundamental indicators';
  }
};

export const getProfitColorClass = (profit: number): string => {
  if (profit >= 10) return 'text-green-500';
  if (profit >= 5) return 'text-green-400';
  if (profit >= 0) return 'text-green-300';
  if (profit >= -5) return 'text-red-300';
  if (profit >= -10) return 'text-red-400';
  return 'text-red-500';
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeUntilNextUpdate = (): string => {
  const now = new Date();
  
  let nextUpdate = new Date(now);
  if (now.getHours() < 12) {
    nextUpdate.setHours(12, 0, 0, 0);
  } else {
    nextUpdate.setHours(24, 0, 0, 0);
  }
  
  const diffMs = nextUpdate.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffHrs}h ${diffMins}m`;
};
