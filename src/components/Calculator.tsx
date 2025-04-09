
import React from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import { useCalculator } from '../hooks/useCalculator';
import { Operation } from '../utils/calculatorUtils';

const Calculator: React.FC = () => {
  const {
    display,
    inputDigit,
    inputDot,
    clearAll,
    performOperation,
    performEquals,
    percentage,
    changeSign,
    currentOperation
  } = useCalculator();

  return (
    <div className="w-full max-w-xs mx-auto overflow-hidden shadow-2xl rounded-lg">
      <CalculatorDisplay value={display} />
      
      <div className="grid grid-cols-4 gap-2 p-2 bg-black">
        <CalculatorButton 
          label="AC" 
          onClick={clearAll} 
          variant="function" 
        />
        <CalculatorButton 
          label="±" 
          onClick={changeSign} 
          variant="function" 
        />
        <CalculatorButton 
          label="%" 
          onClick={percentage} 
          variant="function" 
        />
        <CalculatorButton 
          label="÷" 
          onClick={() => performOperation('÷')} 
          variant="operator"
          active={currentOperation === '÷'}
        />
        
        <CalculatorButton 
          label="7" 
          onClick={() => inputDigit(7)} 
        />
        <CalculatorButton 
          label="8" 
          onClick={() => inputDigit(8)} 
        />
        <CalculatorButton 
          label="9" 
          onClick={() => inputDigit(9)} 
        />
        <CalculatorButton 
          label="×" 
          onClick={() => performOperation('×')} 
          variant="operator"
          active={currentOperation === '×'}
        />
        
        <CalculatorButton 
          label="4" 
          onClick={() => inputDigit(4)} 
        />
        <CalculatorButton 
          label="5" 
          onClick={() => inputDigit(5)} 
        />
        <CalculatorButton 
          label="6" 
          onClick={() => inputDigit(6)} 
        />
        <CalculatorButton 
          label="-" 
          onClick={() => performOperation('-')} 
          variant="operator"
          active={currentOperation === '-'}
        />
        
        <CalculatorButton 
          label="1" 
          onClick={() => inputDigit(1)} 
        />
        <CalculatorButton 
          label="2" 
          onClick={() => inputDigit(2)} 
        />
        <CalculatorButton 
          label="3" 
          onClick={() => inputDigit(3)} 
        />
        <CalculatorButton 
          label="+" 
          onClick={() => performOperation('+')} 
          variant="operator"
          active={currentOperation === '+'}
        />
        
        <CalculatorButton 
          label="0" 
          onClick={() => inputDigit(0)} 
          span={2}
        />
        <CalculatorButton 
          label="." 
          onClick={inputDot} 
        />
        <CalculatorButton 
          label="=" 
          onClick={performEquals} 
          variant="equals"
        />
      </div>
    </div>
  );
};

export default Calculator;
