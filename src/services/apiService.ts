import { UserProfile } from '@/contexts/UserProfileContext';
import { MealPlan } from '@/contexts/MealPlanContext';
import { WorkoutPlan } from '@/contexts/WorkoutPlanContext';
import { FoodAnalysis } from '@/contexts/FoodScanContext';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const chatService = {
  sendMessage: async (message: string): Promise<string> => {
    console.log('Sending chat message:', message);

    const response = await fetch(`${API_BASE_URL}/coach`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Chat response received:', data);

    return data.response;
  }
};

export const mealPlanService = {
  generateMealPlan: async (profile: UserProfile): Promise<MealPlan> => {
    console.log('Generating meal plan for profile:', profile);

    const response = await fetch(`${API_BASE_URL}/meal-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    if (!response.ok) {
      throw new Error(`Meal planner API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Meal plan response received:', data);

    try {
      let mealPlanData: MealPlan | null = null;
      
      // Check if the response has a success property (new format)
      if (data && typeof data === 'object' && data.hasOwnProperty('success')) {
        console.log('Processing meal plan in new format (with success property)');
        if (!data.success) {
          throw new Error(data.error || 'Failed to generate meal plan');
        }
        
        // Ensure meal_plan has the expected structure
        if (data.meal_plan && typeof data.meal_plan === 'object') {
          const mp = data.meal_plan;
          if (mp.breakfast && mp.lunch && mp.snack && mp.dinner) {
            mealPlanData = {
              breakfast: mp.breakfast,
              lunch: mp.lunch,
              snack: mp.snack,
              dinner: mp.dinner
            };
          }
        }
      } 
      // If the response is the old format (direct meal plan object without nesting)
      else if (data && typeof data === 'object') {
        console.log('Processing meal plan in old format (direct object)');
        if (data.breakfast && data.lunch && data.snack && data.dinner) {
          mealPlanData = {
            breakfast: data.breakfast,
            lunch: data.lunch,
            snack: data.snack,
            dinner: data.dinner
          };
        }
      }
      
      if (mealPlanData) {
        console.log('Valid meal plan data structure found:', mealPlanData);
        return mealPlanData;
      }
      
      console.error('Invalid meal plan data structure:', data);
      throw new Error('Invalid meal plan data structure received');
    } catch (error) {
      console.error('Error processing meal plan data:', error, data);
      throw error;
    }
  }
};

export const workoutPlanService = {
  generateWorkoutPlan: async (profile: UserProfile): Promise<WorkoutPlan> => {
    console.log('Generating workout plan for profile:', profile);

    const response = await fetch(`${API_BASE_URL}/workout-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    if (!response.ok) {
      throw new Error(`Workout planner API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Workout plan response received:', data);

    try {
      let workoutPlanData: WorkoutPlan | null = null;
      
      // Check if the response has a success property
      if (data && typeof data === 'object' && data.hasOwnProperty('success')) {
        console.log('Processing workout plan in new format (with success property)');
        if (!data.success) {
          throw new Error(data.error || 'Failed to generate workout plan');
        }
        
        // Check if workout_plan exists and is an array
        if (data.workout_plan && Array.isArray(data.workout_plan) && data.workout_plan.length > 0) {
          // Validate each day in the workout plan has the required structure
          const isValid = data.workout_plan.every(day => 
            day && day.day && day.focus && 
            day.warm_up && day.main_routine && day.cool_down
          );
          
          if (isValid) {
            workoutPlanData = {
              workout_plan: [...data.workout_plan]
            };
          }
        }
      }
      // If the response is already in the expected format without success property
      else if (data && typeof data === 'object') {
        console.log('Processing workout plan in old format (direct object)');
        if (data.workout_plan && Array.isArray(data.workout_plan) && data.workout_plan.length > 0) {
          // Validate each day in the workout plan has the required structure
          const isValid = data.workout_plan.every(day => 
            day && day.day && day.focus && 
            day.warm_up && day.main_routine && day.cool_down
          );
          
          if (isValid) {
            workoutPlanData = {
              workout_plan: [...data.workout_plan]
            };
          }
        }
      }
      
      if (workoutPlanData) {
        console.log('Valid workout plan data structure found:', workoutPlanData);
        return workoutPlanData;
      }
      
      console.error('Invalid workout plan data structure:', data);
      throw new Error('Invalid workout plan data structure received');
    } catch (error) {
      console.error('Error processing workout plan data:', error, data);
      throw error;
    }
  }
};

export const foodScanService = {
  scanFood: async (imageFile: File): Promise<FoodAnalysis> => {
    console.log('Scanning food image:', imageFile.name);

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/food-scanner`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Food scanner API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Food scan response received:', data);

    return data.analysis;
  }
};