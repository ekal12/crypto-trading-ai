
import React from 'react';
import TerminalHeader from './TerminalHeader';
import PortfolioTracker from './PortfolioTracker';
import CoinSuggestions from './CoinSuggestions';
import BestCoinDisplay from './BestCoinDisplay';
import DataSourcesPanel from './DataSourcesPanel';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <TerminalHeader 
        title="AI-Powered Crypto Tracker" 
        subtitle="Track, analyze & predict best trades without API key"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BestCoinDisplay />
          <CoinSuggestions />
        </div>
        <div className="space-y-6">
          <PortfolioTracker />
          <DataSourcesPanel />
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>AI-powered analysis based on real portfolio tracking. No API keys required.</p>
        <p className="mt-1">Data refreshes automatically. Last update: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
