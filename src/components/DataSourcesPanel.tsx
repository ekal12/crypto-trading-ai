
import React, { useState, useEffect } from 'react';
import { fetchDataSources } from '../utils/dataFetcher';
import { DataSource } from '../utils/mockData';
import { formatTime } from '../utils/dataFetcher';

const DataSourcesPanel: React.FC = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const loadDataSources = async () => {
      try {
        const data = await fetchDataSources();
        setDataSources(data);
      } catch (error) {
        console.error('Error fetching data sources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDataSources();
  }, []);

  return (
    <div className="terminal-card p-3">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-sm font-semibold flex items-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${loading ? 'bg-terminal-warning animate-pulse' : 'bg-terminal-success'}`}></span>
          Data Sources: {dataSources.length} connected
        </h3>
        <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {dataSources.map((source) => (
            <div 
              key={source.id}
              className="flex justify-between items-center p-2 rounded bg-terminal-muted/20"
            >
              <div className="flex items-center">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${source.status === 'online' ? 'bg-terminal-success' : 'bg-terminal-danger'}`}></span>
                <span title={source.url}>{source.name}</span>
              </div>
              <span className="text-muted-foreground">{formatTime(source.lastUpdated)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataSourcesPanel;
