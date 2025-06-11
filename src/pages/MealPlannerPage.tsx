import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import {
  UtensilsCrossed,
  Coffee,
  Sun,
  Cookie,
  Utensils,
  CalendarDays,
  Clock,
  Flame,
  ChefHat,
  Dumbbell // Added missing import
} from 'lucide-react';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { useMealPlan, Meal } from '@/contexts/MealPlanContext';
import { mealPlanService } from '@/services/apiService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const MealPlannerPage: React.FC = () => {
  const { profile } = useUserProfile();
  const { mealPlan, setMealPlan, isLoading, setIsLoading } = useMealPlan();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedMeal, setSelectedMeal] = useState<{meal: Meal; type: string;} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mealTypes = [
    { key: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'from-yellow-500 to-orange-500', time: '7:00 AM' },
    { key: 'lunch', label: 'Lunch', icon: Sun, color: 'from-orange-500 to-red-500', time: '12:30 PM' },
    { key: 'snack', label: 'Snack', icon: Cookie, color: 'from-green-500 to-teal-500', time: '3:30 PM' },
    { key: 'dinner', label: 'Dinner', icon: Utensils, color: 'from-purple-500 to-pink-500', time: '7:00 PM' }
  ];

  const validateMealPlan = (plan: any): boolean => {
    console.log('Validating meal plan:', plan);
    
    if (!plan || typeof plan !== 'object') {
      console.error('Meal plan is not an object:', plan);
      return false;
    }

    const requiredMeals = ['breakfast', 'lunch', 'snack', 'dinner'];
    const requiredProperties = ['name', 'description', 'calories', 'protein', 'carbs', 'fat', 'rationale', 'preparation_steps'];

    for (const mealType of requiredMeals) {
      if (!plan[mealType]) {
        console.error(`Missing meal type: ${mealType}`);
        return false;
      }

      const meal = plan[mealType];
      for (const prop of requiredProperties) {
        if (meal[prop] === undefined || meal[prop] === null) {
          console.error(`Missing property ${prop} in ${mealType}:`, meal);
          return false;
        }
      }

      // Validate preparation_steps is an array
      if (!Array.isArray(meal.preparation_steps)) {
        console.error(`preparation_steps is not an array for ${mealType}:`, meal.preparation_steps);
        return false;
      }
    }

    return true;
  };

  const generateMealPlan = async () => {
    if (!profile) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile first to generate a meal plan.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Generating meal plan for profile:', profile);
      const generatedPlan = await mealPlanService.generateMealPlan(profile);
      console.log('Raw API response:', generatedPlan);

      // Validate the response structure
      if (!validateMealPlan(generatedPlan)) {
        throw new Error('Invalid meal plan structure received from API');
      }

      // Create a clean copy of the meal plan
      const formattedMealPlan = {
        breakfast: {
          name: generatedPlan.breakfast.name,
          description: generatedPlan.breakfast.description,
          calories: Number(generatedPlan.breakfast.calories),
          protein: Number(generatedPlan.breakfast.protein),
          carbs: Number(generatedPlan.breakfast.carbs),
          fat: Number(generatedPlan.breakfast.fat),
          rationale: generatedPlan.breakfast.rationale,
          preparation_steps: Array.isArray(generatedPlan.breakfast.preparation_steps) 
            ? generatedPlan.breakfast.preparation_steps 
            : []
        },
        lunch: {
          name: generatedPlan.lunch.name,
          description: generatedPlan.lunch.description,
          calories: Number(generatedPlan.lunch.calories),
          protein: Number(generatedPlan.lunch.protein),
          carbs: Number(generatedPlan.lunch.carbs),
          fat: Number(generatedPlan.lunch.fat),
          rationale: generatedPlan.lunch.rationale,
          preparation_steps: Array.isArray(generatedPlan.lunch.preparation_steps) 
            ? generatedPlan.lunch.preparation_steps 
            : []
        },
        snack: {
          name: generatedPlan.snack.name,
          description: generatedPlan.snack.description,
          calories: Number(generatedPlan.snack.calories),
          protein: Number(generatedPlan.snack.protein),
          carbs: Number(generatedPlan.snack.carbs),
          fat: Number(generatedPlan.snack.fat),
          rationale: generatedPlan.snack.rationale,
          preparation_steps: Array.isArray(generatedPlan.snack.preparation_steps) 
            ? generatedPlan.snack.preparation_steps 
            : []
        },
        dinner: {
          name: generatedPlan.dinner.name,
          description: generatedPlan.dinner.description,
          calories: Number(generatedPlan.dinner.calories),
          protein: Number(generatedPlan.dinner.protein),
          carbs: Number(generatedPlan.dinner.carbs),
          fat: Number(generatedPlan.dinner.fat),
          rationale: generatedPlan.dinner.rationale,
          preparation_steps: Array.isArray(generatedPlan.dinner.preparation_steps) 
            ? generatedPlan.dinner.preparation_steps 
            : []
        }
      };

      console.log('Formatted meal plan:', formattedMealPlan);
      setMealPlan(formattedMealPlan);
      
      toast({
        title: "Meal Plan Generated!",
        description: "Your personalized meal plan is ready. Click on any meal to see details."
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      
      toast({
        title: "Generation Failed",
        description: `Failed to generate meal plan: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalCalories = () => {
    if (!mealPlan) return 0;
    try {
      return Object.values(mealPlan).reduce((total, meal) => {
        const calories = Number(meal.calories) || 0;
        return total + calories;
      }, 0);
    } catch (error) {
      console.error('Error calculating total calories:', error);
      return 0;
    }
  };

  const getTotalMacros = () => {
    if (!mealPlan) return { protein: 0, carbs: 0, fat: 0 };

    try {
      return Object.values(mealPlan).reduce(
        (totals, meal) => ({
          protein: totals.protein + (Number(meal.protein) || 0),
          carbs: totals.carbs + (Number(meal.carbs) || 0),
          fat: totals.fat + (Number(meal.fat) || 0)
        }),
        { protein: 0, carbs: 0, fat: 0 }
      );
    } catch (error) {
      console.error('Error calculating total macros:', error);
      return { protein: 0, carbs: 0, fat: 0 };
    }
  };

  const getMacroPercentage = (macro: number, total: number) => {
    try {
      const totalMacros = getTotalMacros();
      const totalWeight = totalMacros.protein + totalMacros.carbs + totalMacros.fat;
      return totalWeight > 0 ? (macro / totalWeight * 100) : 0;
    } catch (error) {
      console.error('Error calculating macro percentage:', error);
      return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" text="Generating your personalized meal plan..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Your Personal{' '}
            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              Meal Plan
            </span>
          </h1>
        </div>
        
        <Card className="bg-gradient-to-br from-red-800 to-red-900 border-red-500/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Error</CardTitle>
            <CardDescription className="text-red-200">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={generateMealPlan}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Your Personal{' '}
          <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Meal Plan
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get a customized nutrition plan designed specifically for your goals, dietary preferences, and lifestyle.
        </p>
      </div>

      {/* Generate Button */}
      {!mealPlan && (
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2">
              <ChefHat className="h-6 w-6 text-green-500" />
              <span>Ready to Create Your Meal Plan?</span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Our AI will analyze your profile and create a personalized nutrition plan that fits your goals and dietary needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={generateMealPlan}
              disabled={!profile}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <UtensilsCrossed className="h-5 w-5 mr-2" />
              Generate My Meal Plan
            </Button>
            {!profile && (
              <p className="text-red-400 text-sm mt-2">
                Complete your profile first to generate a meal plan
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Meal Plan Display */}
      {mealPlan && (
        <>
          {/* Daily Overview */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-green-500" />
                <span>Daily Nutrition Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Flame className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-400">Total Calories</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{getTotalCalories().toFixed(0)}</p>
                </div>
                
                {Object.entries(getTotalMacros()).map(([macro, value]) => (
                  <div key={macro} className="text-center">
                    <div className="text-sm text-gray-400 mb-2 capitalize">{macro}</div>
                    <p className="text-xl font-bold text-white">{value.toFixed(1)}g</p>
                    <div className="mt-2">
                      <Progress
                        value={getMacroPercentage(value, getTotalCalories())}
                        className="h-2 bg-gray-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {getMacroPercentage(value, getTotalCalories()).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mealTypes.map(({ key, label, icon: Icon, color, time }) => {
              const meal = mealPlan[key as keyof typeof mealPlan];

              if (!meal) {
                console.error(`Missing meal for ${key}:`, mealPlan);
                return null;
              }

              return (
                <Dialog key={key}>
                  <DialogTrigger asChild>
                    <Card
                      className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedMeal({ meal, type: label })}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white flex items-center space-x-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span>{label}</span>
                          </CardTitle>
                          <Badge variant="outline" className="border-gray-600 text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{meal.name || 'Unknown Meal'}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2">{meal.description || 'No description available'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-orange-500 font-bold text-lg">{meal.calories || 0}</p>
                            <p className="text-gray-500 text-xs">Calories</p>
                          </div>
                          <div className="text-center">
                            <p className="text-blue-500 font-bold text-lg">{meal.protein || 0}g</p>
                            <p className="text-gray-500 text-xs">Protein</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {meal.carbs || 0}g carbs
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {meal.fat || 0}g fat
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  {/* Meal Detail Modal */}
                  <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span>{meal.name || 'Unknown Meal'}</span>
                      </DialogTitle>
                      <DialogDescription className="text-gray-300 text-lg">
                        {meal.description || 'No description available'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Nutrition Facts */}
                      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <p className="text-orange-500 font-bold text-xl">{meal.calories || 0}</p>
                          <p className="text-gray-400 text-sm">Calories</p>
                        </div>
                        <div className="text-center">
                          <p className="text-blue-500 font-bold text-xl">{meal.protein || 0}g</p>
                          <p className="text-gray-400 text-sm">Protein</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-500 font-bold text-xl">{meal.carbs || 0}g</p>
                          <p className="text-gray-400 text-sm">Carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-500 font-bold text-xl">{meal.fat || 0}g</p>
                          <p className="text-gray-400 text-sm">Fat</p>
                        </div>
                      </div>
                      
                      {/* Rationale */}
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-green-500">Why This Meal?</h4>
                        <p className="text-gray-300 leading-relaxed">{meal.rationale || 'No rationale provided'}</p>
                      </div>
                      
                      {/* Preparation Steps */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-orange-500">Preparation Steps</h4>
                        {meal.preparation_steps && meal.preparation_steps.length > 0 ? (
                          <ol className="space-y-2">
                            {meal.preparation_steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white text-sm rounded-full flex items-center justify-center">
                                  {index + 1}
                                </span>
                                <span className="text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-gray-400">No preparation steps available</p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={generateMealPlan}
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Generate New Plan
            </Button>
            <Button
              onClick={() => navigate('/workout-planner')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Create Workout Plan
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MealPlannerPage;