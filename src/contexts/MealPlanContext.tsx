import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  rationale: string;
  preparation_steps: string[];
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
}

interface MealPlanContextType {
  mealPlan: MealPlan | null;
  setMealPlan: (plan: MealPlan) => void;
  clearMealPlan: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const MealPlanProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [mealPlan, setMealPlanState] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setMealPlan = (plan: MealPlan) => {
    console.log('Setting meal plan:', plan);
    setMealPlanState(plan);
  };

  const clearMealPlan = () => {
    console.log('Clearing meal plan');
    setMealPlanState(null);
  };

  return (
    <MealPlanContext.Provider value={{
      mealPlan,
      setMealPlan,
      clearMealPlan,
      isLoading,
      setIsLoading
    }} data-id="z493uvx1t" data-path="src/contexts/MealPlanContext.tsx">
      {children}
    </MealPlanContext.Provider>);

};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};