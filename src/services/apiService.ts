import { UserProfile } from '@/contexts/UserProfileContext';
import { MealPlan } from '@/contexts/MealPlanContext';
import { WorkoutPlan } from '@/contexts/WorkoutPlanContext';
import { FoodAnalysis } from '@/contexts/FoodScanContext';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const chatService = {
  sendMessage: async (message: string): Promise<string> => {
    console.log('Sending chat message:', message);

    const response = await fetch(`${API_BASE_URL}/chat`, {
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

    return data;
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

    return data;
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