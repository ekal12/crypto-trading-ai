
import { 
  Portfolio, 
  CoinSuggestion, 
  BestCoin, 
  DataSource,
  generateMockPortfolios,
  generateMockSuggestions,
  generateBestCoins,
  generateDataSources
} from './mockData';

// In a real application, this would fetch data from the web or an API
// For this demo, we're using mock data
export const fetchTopPortfolios = async (count: number = 10): Promise<Portfolio[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return generateMockPortfolios(count);
};

export const fetchCoinSuggestions = async (count: number = 5): Promise<CoinSuggestion[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  return generateMockSuggestions(count);
};

export const fetchBestCoins = async (count: number = 3): Promise<BestCoin[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateBestCoins(count);
};

export const fetchDataSources = async (): Promise<DataSource[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return generateDataSources();
};

// Format a timestamp to a readable format
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

// Format currency to readable format
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

// Get color class based on action
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

// Get icon based on action
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

// Get risk level description
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

// Get analysis method description
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
