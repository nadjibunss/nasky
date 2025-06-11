import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
}

export interface WorkoutSection {
  motto: string;
  exercises: Exercise[];
  duration: string;
  video_url?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  warm_up: WorkoutSection;
  main_routine: WorkoutSection;
  cool_down: WorkoutSection;
}

export interface WorkoutPlan {
  workout_plan: WorkoutDay[];
}

interface WorkoutPlanContextType {
  workoutPlan: WorkoutPlan | null;
  setWorkoutPlan: (plan: WorkoutPlan) => void;
  clearWorkoutPlan: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WorkoutPlanContext = createContext<WorkoutPlanContextType | undefined>(undefined);

export const WorkoutPlanProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [workoutPlan, setWorkoutPlanState] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setWorkoutPlan = (plan: WorkoutPlan) => {
    console.log('Setting workout plan:', plan);
    setWorkoutPlanState(plan);
  };

  const clearWorkoutPlan = () => {
    console.log('Clearing workout plan');
    setWorkoutPlanState(null);
  };

  return (
    <WorkoutPlanContext.Provider value={{
      workoutPlan,
      setWorkoutPlan,
      clearWorkoutPlan,
      isLoading,
      setIsLoading
    }} data-id="c19ytim73" data-path="src/contexts/WorkoutPlanContext.tsx">
      {children}
    </WorkoutPlanContext.Provider>);

};

export const useWorkoutPlan = () => {
  const context = useContext(WorkoutPlanContext);
  if (context === undefined) {
    throw new Error('useWorkoutPlan must be used within a WorkoutPlanProvider');
  }
  return context;
};