
import React from 'react';
import Calculator from '../components/Calculator';
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Basic Calculator</h1>
        <p className="text-gray-300 mb-4">A simple yet powerful calculator built with React</p>
        <Separator className="bg-gray-700" />
      </div>
      
      <Calculator />
      
      <div className="mt-8 text-gray-400 text-sm text-center">
        <p>Use keyboard for input:</p>
        <p>Numbers (0-9), operators (+, -, *, /), Enter (=), Escape (AC), Backspace</p>
      </div>
    </div>
  );
};

export default Index;
