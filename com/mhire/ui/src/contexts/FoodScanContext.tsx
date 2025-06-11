import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FoodNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodAnalysis {
  food_items: string[];
  nutrition: FoodNutrition;
  health_benefits: string[];
  concerns: string[];
}

export interface FoodScanResult {
  image: string;
  analysis: FoodAnalysis;
}

interface FoodScanContextType {
  scanResult: FoodScanResult | null;
  setScanResult: (result: FoodScanResult) => void;
  clearScanResult: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const FoodScanContext = createContext<FoodScanContextType | undefined>(undefined);

export const FoodScanProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [scanResult, setScanResultState] = useState<FoodScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setScanResult = (result: FoodScanResult) => {
    console.log('Setting food scan result:', result);
    setScanResultState(result);
  };

  const clearScanResult = () => {
    console.log('Clearing food scan result');
    setScanResultState(null);
  };

  return (
    <FoodScanContext.Provider value={{
      scanResult,
      setScanResult,
      clearScanResult,
      isLoading,
      setIsLoading
    }} data-id="lxw6ujhbs" data-path="src/contexts/FoodScanContext.tsx">
      {children}
    </FoodScanContext.Provider>);

};

export const useFoodScan = () => {
  const context = useContext(FoodScanContext);
  if (context === undefined) {
    throw new Error('useFoodScan must be used within a FoodScanProvider');
  }
  return context;
};