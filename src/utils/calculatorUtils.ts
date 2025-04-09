
export type Operation = '+' | '-' | '×' | '÷' | '';

export const evaluateExpression = (
  firstOperand: number,
  secondOperand: number,
  operation: Operation
): number => {
  switch (operation) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '×':
      return firstOperand * secondOperand;
    case '÷':
      if (secondOperand === 0) {
        throw new Error('Division by zero');
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
};

export const formatNumber = (num: number): string => {
  // Convert to string and handle potential floating point precision issues
  const numStr = num.toString();
  
  // If it's an integer, return as is
  if (Number.isInteger(num)) {
    return numStr;
  }
  
  // Limit decimal places to 8 max to avoid overflow
  const parts = numStr.split('.');
  if (parts.length === 2 && parts[1].length > 8) {
    return num.toFixed(8);
  }
  
  return numStr;
};
