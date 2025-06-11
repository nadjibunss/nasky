import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4" data-id="57umocmkn" data-path="src/components/LoadingSpinner.tsx">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-orange-500`} data-id="vwadvun9w" data-path="src/components/LoadingSpinner.tsx" />
      <p className={`${textSizeClasses[size]} text-gray-400 font-medium`} data-id="zfdp3uhdk" data-path="src/components/LoadingSpinner.tsx">
        {text}
      </p>
    </div>);

};

export default LoadingSpinner;