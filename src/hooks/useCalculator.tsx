
import { useState, useEffect, useCallback } from 'react';
import { evaluateExpression, formatNumber, Operation } from '../utils/calculatorUtils';
import { toast } from '../hooks/use-toast';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [secondOperand, setSecondOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (/^[0-9]$/.test(key)) {
        inputDigit(parseInt(key, 10));
      } else if (key === '.') {
        inputDot();
      } else if (['+', '-'].includes(key)) {
        performOperation(key as Operation);
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performEquals();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        clearLastChar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, firstOperand, operation, waitingForOperand]);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setFirstOperand(null);
    setSecondOperand(null);
    setOperation('');
    setWaitingForOperand(false);
  }, []);

  const clearLastChar = useCallback(() => {
    if (display === '0' || display.length === 1 || waitingForOperand) {
      setDisplay('0');
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  }, [display, waitingForOperand]);

  const inputDigit = useCallback((digit: number) => {
    if (waitingForOperand) {
      setDisplay(digit.toString());
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit.toString() : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const performOperation = useCallback((nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      try {
        const result = evaluateExpression(firstOperand, inputValue, operation);
        setDisplay(formatNumber(result));
        setFirstOperand(result);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
        }
        clearAll();
        return;
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, firstOperand, operation, clearAll]);

  const performEquals = useCallback(() => {
    if (firstOperand === null || operation === '' || waitingForOperand) {
      return;
    }

    try {
      const inputValue = parseFloat(display);
      const result = evaluateExpression(firstOperand, inputValue, operation);
      setDisplay(formatNumber(result));
      
      // Store the calculation for potential future operations
      setFirstOperand(result);
      setSecondOperand(null);
      setOperation('');
      setWaitingForOperand(true);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
      clearAll();
    }
  }, [display, firstOperand, operation, waitingForOperand, clearAll]);

  const percentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(formatNumber(value));
    setWaitingForOperand(true);
  }, [display]);

  const changeSign = useCallback(() => {
    const value = parseFloat(display) * -1;
    setDisplay(formatNumber(value));
  }, [display]);

  return {
    display,
    inputDigit,
    inputDot,
    clearAll,
    clearLastChar,
    performOperation,
    performEquals,
    percentage,
    changeSign,
    currentOperation: operation
  };
}
