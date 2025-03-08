
import React from 'react';

interface LoadingPlaceholderProps {
  text?: string;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({ text = 'Loading data' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      <div className="flex items-center space-x-2 text-terminal-accent animate-pulse-subtle">
        <div className="w-4 h-4 border-2 border-terminal-accent border-t-transparent rounded-full animate-spin"></div>
        <span>{text}<span className="animate-blink">_</span></span>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
