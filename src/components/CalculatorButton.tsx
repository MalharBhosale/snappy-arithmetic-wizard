
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'number' | 'operator' | 'function' | 'equals';

interface CalculatorButtonProps {
  onClick: () => void;
  label: string;
  variant?: ButtonVariant;
  span?: 1 | 2;
  active?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  label,
  variant = 'number',
  span = 1,
  active = false
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'number':
        return 'bg-calculator-number text-white';
      case 'operator':
        return active 
          ? 'bg-white text-calculator-operator' 
          : 'bg-calculator-operator text-white';
      case 'function':
        return 'bg-calculator-function text-black';
      case 'equals':
        return 'bg-calculator-equals text-white';
      default:
        return 'bg-calculator-number text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'h-16 rounded-full font-semibold text-2xl flex items-center justify-center transition-all',
        'hover:opacity-80 active:animate-button-press focus:outline-none',
        getVariantStyles(),
        span === 2 ? 'col-span-2 w-full' : 'aspect-square'
      )}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;
