// components/LoadingCardGrid.tsx
import React from 'react';
import LoadingCard from './LoadingCard';

interface LoadingCardGridProps {
  count: number;
}

const LoadingCardGrid: React.FC<LoadingCardGridProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
};

export default LoadingCardGrid;