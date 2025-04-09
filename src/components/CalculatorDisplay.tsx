
import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  // Dynamically adjust font size based on the length of the value
  const getFontSize = () => {
    const length = value.length;
    if (length > 12) return 'text-2xl';
    if (length > 8) return 'text-3xl';
    return 'text-4xl';
  };

  return (
    <div className="w-full bg-calculator-display text-white p-4 rounded-t-lg flex justify-end items-center h-24">
      <div className={`font-bold transition-all duration-200 ${getFontSize()}`}>
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
