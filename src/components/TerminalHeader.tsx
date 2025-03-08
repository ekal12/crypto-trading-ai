
import React from 'react';

interface TerminalHeaderProps {
  title: string;
  subtitle?: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-terminal-accent">
        {title} <span className="animate-blink">_</span>
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default TerminalHeader;
