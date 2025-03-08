
import React, { useState, useEffect } from 'react';
import { fetchTradeTactics } from '../utils/dataFetcher';
import { TradeTactic, TradingStep } from '../utils/mockData';
import LoadingPlaceholder from './LoadingPlaceholder';
import { Clock, ArrowUp, ArrowDown, ArrowRightLeft, AlertTriangle, CircleDollarSign, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate, getProfitColorClass, getTimeUntilNextUpdate } from '../utils/dataFetcher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const StepIcon = ({ action }: { action: 'buy' | 'sell' | 'swap' }) => {
  switch (action) {
    case 'buy':
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    case 'sell':
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    case 'swap':
      return <ArrowRightLeft className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const TacticStep = ({ step }: { step: TradingStep }) => {
  return (
    <div className="flex items-start p-3 rounded-md bg-terminal-muted/10 border border-terminal-border">
      <div className="w-7 h-7 rounded-full bg-terminal-muted/30 flex items-center justify-center mr-3">
        {step.order}
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <StepIcon action={step.action} />
          <span className="ml-1 font-semibold capitalize">{step.action}</span>
          <span className="ml-2">{step.coinName} ({step.coinSymbol})</span>
        </div>
        <div className="text-sm opacity-80">
          <div className="mb-1">
            <Clock className="inline-block w-3 h-3 mr-1" />
            Timing: {step.timing}
          </div>
          {step.condition && (
            <div className="mb-1">
              <AlertTriangle className="inline-block w-3 h-3 mr-1" />
              Condition: {step.condition}
            </div>
          )}
          {step.profitTarget && (
            <div className="mb-1">
              <CircleDollarSign className="inline-block w-3 h-3 mr-1" />
              Target: +{step.profitTarget}%
            </div>
          )}
          {step.stopLoss && (
            <div className="text-red-400">
              <AlertTriangle className="inline-block w-3 h-3 mr-1" />
              Stop Loss: {step.stopLoss}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TacticCard = ({ tactic }: { tactic: TradeTactic }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  return (
    <div className="terminal-card p-4 border border-terminal-border bg-terminal-muted/10 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="terminal-header text-lg">{tactic.name}</h3>
        <span className={`font-bold ${getProfitColorClass(tactic.expectedProfitPercentage)}`}>
          +{tactic.expectedProfitPercentage}%
        </span>
      </div>
      
      <p className="text-sm opacity-80 mb-3">{tactic.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <div className="text-xs px-2 py-1 rounded-md bg-terminal-muted/20 border border-terminal-border">
          <Clock className="inline-block w-3 h-3 mr-1" />
          {tactic.timeframe}
        </div>
        <div className="text-xs px-2 py-1 rounded-md bg-terminal-muted/20 border border-terminal-border">
          <span className={tactic.riskLevel === 'low' ? 'text-green-400' : tactic.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'}>
            Risk: {tactic.riskLevel.toUpperCase()}
          </span>
        </div>
        <div className="text-xs px-2 py-1 rounded-md bg-terminal-muted/20 border border-terminal-border">
          Confidence: {tactic.confidence}%
        </div>
      </div>
      
      <div className="text-xs flex justify-between mb-4">
        <div>
          <Timer className="inline-block w-3 h-3 mr-1" />
          Last updated: {formatDate(tactic.lastUpdated)}
        </div>
        <div>
          <Clock className="inline-block w-3 h-3 mr-1" />
          Next update in: {getTimeUntilNextUpdate()}
        </div>
      </div>
      
      <button 
        onClick={toggleExpand}
        className="w-full flex items-center justify-center py-1 text-xs border-t border-terminal-border mt-2"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-1" /> Hide Steps
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-1" /> Show {tactic.steps.length} Steps
          </>
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {tactic.steps.map((step) => (
            <TacticStep key={`${tactic.id}-step-${step.order}`} step={step} />
          ))}
          
          <button
            onClick={() => setShowAnalysis(true)}
            className="w-full text-center text-xs py-2 mt-2 border border-dashed border-terminal-border rounded-md hover:bg-terminal-muted/10"
          >
            View Detailed Analysis
          </button>
        </div>
      )}
      
      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tactic.name} - Analysis</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Analysis Basis:</h4>
                <p className="text-sm">{tactic.analysisReason}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Metrics:</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <span className="font-medium">Expected Profit:</span> {tactic.expectedProfitPercentage}%
                  </li>
                  <li>
                    <span className="font-medium">Confidence:</span> {tactic.confidence}%
                  </li>
                  <li>
                    <span className="font-medium">Risk Level:</span> {tactic.riskLevel}
                  </li>
                  <li>
                    <span className="font-medium">Timeframe:</span> {tactic.timeframe}
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Steps Breakdown:</h4>
                <div className="space-y-3">
                  {tactic.steps.map((step) => (
                    <div key={`analysis-${tactic.id}-step-${step.order}`} className="text-sm">
                      <div className="font-medium">Step {step.order}: {step.action.toUpperCase()} {step.coinSymbol}</div>
                      <div>Timing: {step.timing}</div>
                      {step.condition && <div>Condition: {step.condition}</div>}
                      {step.profitTarget && <div>Profit Target: +{step.profitTarget}%</div>}
                      {step.stopLoss && <div>Stop Loss: {step.stopLoss}%</div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs opacity-70 mt-6">
                Last updated: {new Date(tactic.lastUpdated).toLocaleString()}<br />
                Next update: {new Date(tactic.nextUpdate).toLocaleString()}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const TradeTactics: React.FC = () => {
  const [tradeTactics, setTradeTactics] = useState<TradeTactic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTradeTactics = async () => {
      try {
        const data = await fetchTradeTactics(3);
        setTradeTactics(data);
      } catch (error) {
        console.error('Error fetching trade tactics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTradeTactics();
  }, []);

  if (loading) {
    return <LoadingPlaceholder text="Calculating optimal trade tactics" />;
  }

  if (!tradeTactics.length) {
    return (
      <div className="terminal-card p-4">
        <h3 className="terminal-header text-lg mb-4">Trade Tactics</h3>
        <div className="text-muted-foreground">No tactics available</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="terminal-header text-lg">Trading Tactics</h3>
        <div className="text-xs opacity-70">
          <Clock className="inline w-3 h-3 mr-1" />
          Updates every 12 hours
        </div>
      </div>
      <div className="space-y-4">
        {tradeTactics.map((tactic) => (
          <TacticCard key={tactic.id} tactic={tactic} />
        ))}
      </div>
    </div>
  );
};

export default TradeTactics;
