
import React from 'react';
import TerminalHeader from './TerminalHeader';
import BestCoinDisplay from './BestCoinDisplay';
import PortfolioTracker from './PortfolioTracker';
import CoinSuggestions from './CoinSuggestions';
import DataSourcesPanel from './DataSourcesPanel';
import TradeTactics from './TradeTactics';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto">
      <TerminalHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioTracker />
          <TradeTactics />
          <CoinSuggestions />
        </div>
        
        <div className="space-y-6">
          <BestCoinDisplay />
          <DataSourcesPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
