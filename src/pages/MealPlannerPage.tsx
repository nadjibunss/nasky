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
  ChefHat } from
'lucide-react';
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
  const [selectedMeal, setSelectedMeal] = useState<{meal: Meal;type: string;} | null>(null);

  const mealTypes = [
  { key: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'from-yellow-500 to-orange-500', time: '7:00 AM' },
  { key: 'lunch', label: 'Lunch', icon: Sun, color: 'from-orange-500 to-red-500', time: '12:30 PM' },
  { key: 'snack', label: 'Snack', icon: Cookie, color: 'from-green-500 to-teal-500', time: '3:30 PM' },
  { key: 'dinner', label: 'Dinner', icon: Utensils, color: 'from-purple-500 to-pink-500', time: '7:00 PM' }];


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

    try {
      console.log('Generating meal plan for profile:', profile);
      const generatedPlan = await mealPlanService.generateMealPlan(profile);
      setMealPlan(generatedPlan);

      toast({
        title: "Meal Plan Generated!",
        description: "Your personalized meal plan is ready. Click on any meal to see details."
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalCalories = () => {
    if (!mealPlan) return 0;
    return Object.values(mealPlan).reduce((total, meal) => total + meal.calories, 0);
  };

  const getTotalMacros = () => {
    if (!mealPlan) return { protein: 0, carbs: 0, fat: 0 };

    return Object.values(mealPlan).reduce(
      (totals, meal) => ({
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat
      }),
      { protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getMacroPercentage = (macro: number, total: number) => {
    const totalMacros = getTotalMacros();
    const totalWeight = totalMacros.protein + totalMacros.carbs + totalMacros.fat;
    return totalWeight > 0 ? macro / totalWeight * 100 : 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" data-id="qmj2eghq3" data-path="src/pages/MealPlannerPage.tsx">
        <LoadingSpinner size="lg" text="Generating your personalized meal plan..." data-id="bz7zp81h9" data-path="src/pages/MealPlannerPage.tsx" />
      </div>);

  }

  return (
    <div className="space-y-8" data-id="bi60jm5o2" data-path="src/pages/MealPlannerPage.tsx">
      {/* Header */}
      <div className="text-center space-y-4" data-id="i7x2a1dm4" data-path="src/pages/MealPlannerPage.tsx">
        <h1 className="text-4xl md:text-5xl font-bold text-white" data-id="a9j29ra5h" data-path="src/pages/MealPlannerPage.tsx">
          Your Personal{' '}
          <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent" data-id="gioallodu" data-path="src/pages/MealPlannerPage.tsx">
            Meal Plan
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-id="e683ohius" data-path="src/pages/MealPlannerPage.tsx">
          Get a customized nutrition plan designed specifically for your goals, dietary preferences, and lifestyle.
        </p>
      </div>

      {/* Generate Button */}
      {!mealPlan &&
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20 max-w-2xl mx-auto" data-id="sbro6zp1m" data-path="src/pages/MealPlannerPage.tsx">
          <CardHeader className="text-center" data-id="nzhmsjzvd" data-path="src/pages/MealPlannerPage.tsx">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2" data-id="9t0sg9xqb" data-path="src/pages/MealPlannerPage.tsx">
              <ChefHat className="h-6 w-6 text-green-500" data-id="fn7cr2maw" data-path="src/pages/MealPlannerPage.tsx" />
              <span data-id="yo31j6idb" data-path="src/pages/MealPlannerPage.tsx">Ready to Create Your Meal Plan?</span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg" data-id="4busiunby" data-path="src/pages/MealPlannerPage.tsx">
              Our AI will analyze your profile and create a personalized nutrition plan that fits your goals and dietary needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center" data-id="j08k21htp" data-path="src/pages/MealPlannerPage.tsx">
            <Button
            onClick={generateMealPlan}
            disabled={!profile}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            size="lg" data-id="t97sko610" data-path="src/pages/MealPlannerPage.tsx">

              <UtensilsCrossed className="h-5 w-5 mr-2" data-id="fjy7jg804" data-path="src/pages/MealPlannerPage.tsx" />
              Generate My Meal Plan
            </Button>
            {!profile &&
          <p className="text-red-400 text-sm mt-2" data-id="7muenl21d" data-path="src/pages/MealPlannerPage.tsx">
                Complete your profile first to generate a meal plan
              </p>
          }
          </CardContent>
        </Card>
      }

      {/* Meal Plan Display */}
      {mealPlan &&
      <>
          {/* Daily Overview */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-green-500/20" data-id="n0jcoyl9u" data-path="src/pages/MealPlannerPage.tsx">
            <CardHeader data-id="49c5ui84r" data-path="src/pages/MealPlannerPage.tsx">
              <CardTitle className="text-xl text-white flex items-center space-x-2" data-id="07fytssne" data-path="src/pages/MealPlannerPage.tsx">
                <CalendarDays className="h-5 w-5 text-green-500" data-id="fk18i8yiu" data-path="src/pages/MealPlannerPage.tsx" />
                <span data-id="0thne13n1" data-path="src/pages/MealPlannerPage.tsx">Daily Nutrition Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-id="bvwk4obo4" data-path="src/pages/MealPlannerPage.tsx">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="u78prb43q" data-path="src/pages/MealPlannerPage.tsx">
                <div className="text-center" data-id="w8suuuvf3" data-path="src/pages/MealPlannerPage.tsx">
                  <div className="flex items-center justify-center space-x-2 mb-2" data-id="q5eqlclsh" data-path="src/pages/MealPlannerPage.tsx">
                    <Flame className="h-4 w-4 text-red-500" data-id="o8pv2cuc2" data-path="src/pages/MealPlannerPage.tsx" />
                    <span className="text-sm text-gray-400" data-id="kmyox075w" data-path="src/pages/MealPlannerPage.tsx">Total Calories</span>
                  </div>
                  <p className="text-2xl font-bold text-white" data-id="wlsmjfdne" data-path="src/pages/MealPlannerPage.tsx">{getTotalCalories().toFixed(0)}</p>
                </div>
                
                {Object.entries(getTotalMacros()).map(([macro, value]) =>
              <div key={macro} className="text-center" data-id="05m3p2yqa" data-path="src/pages/MealPlannerPage.tsx">
                    <div className="text-sm text-gray-400 mb-2 capitalize" data-id="lsu8pyql6" data-path="src/pages/MealPlannerPage.tsx">{macro}</div>
                    <p className="text-xl font-bold text-white" data-id="2dr1nj2ro" data-path="src/pages/MealPlannerPage.tsx">{value.toFixed(1)}g</p>
                    <div className="mt-2" data-id="yagry4hwj" data-path="src/pages/MealPlannerPage.tsx">
                      <Progress
                    value={getMacroPercentage(value, getTotalCalories())}
                    className="h-2 bg-gray-700" data-id="nae4r9nfe" data-path="src/pages/MealPlannerPage.tsx" />

                      <p className="text-xs text-gray-500 mt-1" data-id="9mgfu8b3x" data-path="src/pages/MealPlannerPage.tsx">
                        {getMacroPercentage(value, getTotalCalories()).toFixed(1)}%
                      </p>
                    </div>
                  </div>
              )}
              </div>
            </CardContent>
          </Card>

          {/* Meal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="jgxtqcfxs" data-path="src/pages/MealPlannerPage.tsx">
            {mealTypes.map(({ key, label, icon: Icon, color, time }) => {
            const meal = mealPlan[key as keyof typeof mealPlan];

            return (
              <Dialog key={key} data-id="njbx5yo7r" data-path="src/pages/MealPlannerPage.tsx">
                  <DialogTrigger asChild data-id="9cndz6o1e" data-path="src/pages/MealPlannerPage.tsx">
                    <Card
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedMeal({ meal, type: label })} data-id="vpluitkgj" data-path="src/pages/MealPlannerPage.tsx">

                      <CardHeader data-id="65cag3x5s" data-path="src/pages/MealPlannerPage.tsx">
                        <div className="flex items-center justify-between" data-id="omhha31gg" data-path="src/pages/MealPlannerPage.tsx">
                          <CardTitle className="text-white flex items-center space-x-2" data-id="a6j64ppt6" data-path="src/pages/MealPlannerPage.tsx">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`} data-id="gla2kpjir" data-path="src/pages/MealPlannerPage.tsx">
                              <Icon className="h-5 w-5 text-white" data-id="wuvjt5iy9" data-path="src/pages/MealPlannerPage.tsx" />
                            </div>
                            <span data-id="semg9jddd" data-path="src/pages/MealPlannerPage.tsx">{label}</span>
                          </CardTitle>
                          <Badge variant="outline" className="border-gray-600 text-gray-400" data-id="2guxq6f6f" data-path="src/pages/MealPlannerPage.tsx">
                            <Clock className="h-3 w-3 mr-1" data-id="d7f1mwlhm" data-path="src/pages/MealPlannerPage.tsx" />
                            {time}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4" data-id="8hz7cdzuu" data-path="src/pages/MealPlannerPage.tsx">
                        <div data-id="c1dcplqal" data-path="src/pages/MealPlannerPage.tsx">
                          <h3 className="text-lg font-semibold text-white mb-2" data-id="nl0jsh2up" data-path="src/pages/MealPlannerPage.tsx">{meal.name}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2" data-id="8o1jhf8yz" data-path="src/pages/MealPlannerPage.tsx">{meal.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4" data-id="7onm4pij0" data-path="src/pages/MealPlannerPage.tsx">
                          <div className="text-center" data-id="olozdg9se" data-path="src/pages/MealPlannerPage.tsx">
                            <p className="text-orange-500 font-bold text-lg" data-id="1wru1lyc8" data-path="src/pages/MealPlannerPage.tsx">{meal.calories}</p>
                            <p className="text-gray-500 text-xs" data-id="mo873s5kp" data-path="src/pages/MealPlannerPage.tsx">Calories</p>
                          </div>
                          <div className="text-center" data-id="oaqcmcmpe" data-path="src/pages/MealPlannerPage.tsx">
                            <p className="text-blue-500 font-bold text-lg" data-id="7sw3u009v" data-path="src/pages/MealPlannerPage.tsx">{meal.protein}g</p>
                            <p className="text-gray-500 text-xs" data-id="58g37gdfx" data-path="src/pages/MealPlannerPage.tsx">Protein</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2" data-id="lcsyaceso" data-path="src/pages/MealPlannerPage.tsx">
                          <Badge variant="secondary" className="text-xs" data-id="xpcy9wtgt" data-path="src/pages/MealPlannerPage.tsx">
                            {meal.carbs}g carbs
                          </Badge>
                          <Badge variant="secondary" className="text-xs" data-id="9lfhde64w" data-path="src/pages/MealPlannerPage.tsx">
                            {meal.fat}g fat
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  
                  {/* Meal Detail Modal */}
                  <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white" data-id="rz1dp9wpc" data-path="src/pages/MealPlannerPage.tsx">
                    <DialogHeader data-id="26u3chs9t" data-path="src/pages/MealPlannerPage.tsx">
                      <DialogTitle className="text-2xl flex items-center space-x-2" data-id="3bezq89bl" data-path="src/pages/MealPlannerPage.tsx">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`} data-id="gmz3mhzj8" data-path="src/pages/MealPlannerPage.tsx">
                          <Icon className="h-5 w-5 text-white" data-id="j1glc5uqz" data-path="src/pages/MealPlannerPage.tsx" />
                        </div>
                        <span data-id="9prcledyd" data-path="src/pages/MealPlannerPage.tsx">{meal.name}</span>
                      </DialogTitle>
                      <DialogDescription className="text-gray-300 text-lg" data-id="3ezoy80d9" data-path="src/pages/MealPlannerPage.tsx">
                        {meal.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6" data-id="80ji1rigl" data-path="src/pages/MealPlannerPage.tsx">
                      {/* Nutrition Facts */}
                      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg" data-id="myrazzb3l" data-path="src/pages/MealPlannerPage.tsx">
                        <div className="text-center" data-id="asf8c4u9n" data-path="src/pages/MealPlannerPage.tsx">
                          <p className="text-orange-500 font-bold text-xl" data-id="gx5ic1uom" data-path="src/pages/MealPlannerPage.tsx">{meal.calories}</p>
                          <p className="text-gray-400 text-sm" data-id="j3o14fny0" data-path="src/pages/MealPlannerPage.tsx">Calories</p>
                        </div>
                        <div className="text-center" data-id="u18cp7r40" data-path="src/pages/MealPlannerPage.tsx">
                          <p className="text-blue-500 font-bold text-xl" data-id="uyha6f7xt" data-path="src/pages/MealPlannerPage.tsx">{meal.protein}g</p>
                          <p className="text-gray-400 text-sm" data-id="ia1izhks7" data-path="src/pages/MealPlannerPage.tsx">Protein</p>
                        </div>
                        <div className="text-center" data-id="qr1p3aftn" data-path="src/pages/MealPlannerPage.tsx">
                          <p className="text-green-500 font-bold text-xl" data-id="56haekepk" data-path="src/pages/MealPlannerPage.tsx">{meal.carbs}g</p>
                          <p className="text-gray-400 text-sm" data-id="mhxpwt55i" data-path="src/pages/MealPlannerPage.tsx">Carbs</p>
                        </div>
                        <div className="text-center" data-id="i14si35iq" data-path="src/pages/MealPlannerPage.tsx">
                          <p className="text-yellow-500 font-bold text-xl" data-id="di14581lj" data-path="src/pages/MealPlannerPage.tsx">{meal.fat}g</p>
                          <p className="text-gray-400 text-sm" data-id="aj5xywyrp" data-path="src/pages/MealPlannerPage.tsx">Fat</p>
                        </div>
                      </div>
                      
                      {/* Rationale */}
                      <div data-id="0uu7ba2hz" data-path="src/pages/MealPlannerPage.tsx">
                        <h4 className="text-lg font-semibold mb-2 text-green-500" data-id="mrdx3tein" data-path="src/pages/MealPlannerPage.tsx">Why This Meal?</h4>
                        <p className="text-gray-300 leading-relaxed" data-id="mx6e6tqgq" data-path="src/pages/MealPlannerPage.tsx">{meal.rationale}</p>
                      </div>
                      
                      {/* Preparation Steps */}
                      <div data-id="08fq4u4l3" data-path="src/pages/MealPlannerPage.tsx">
                        <h4 className="text-lg font-semibold mb-3 text-orange-500" data-id="xvq66as1j" data-path="src/pages/MealPlannerPage.tsx">Preparation Steps</h4>
                        <ol className="space-y-2" data-id="9nka6oagk" data-path="src/pages/MealPlannerPage.tsx">
                          {meal.preparation_steps.map((step, index) =>
                        <li key={index} className="flex items-start space-x-3" data-id="jf24olmtb" data-path="src/pages/MealPlannerPage.tsx">
                              <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white text-sm rounded-full flex items-center justify-center" data-id="a7c0ui80t" data-path="src/pages/MealPlannerPage.tsx">
                                {index + 1}
                              </span>
                              <span className="text-gray-300" data-id="ng48jrlb4" data-path="src/pages/MealPlannerPage.tsx">{step}</span>
                            </li>
                        )}
                        </ol>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>);

          })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4" data-id="xpj8uxiqz" data-path="src/pages/MealPlannerPage.tsx">
            <Button
            onClick={generateMealPlan}
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white" data-id="iyjzvfikx" data-path="src/pages/MealPlannerPage.tsx">

              <UtensilsCrossed className="h-4 w-4 mr-2" data-id="y7chm5i65" data-path="src/pages/MealPlannerPage.tsx" />
              Generate New Plan
            </Button>
            <Button
            onClick={() => navigate('/workout-planner')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" data-id="ueahaimmf" data-path="src/pages/MealPlannerPage.tsx">

              <Dumbbell className="h-4 w-4 mr-2" data-id="crrkxwzyi" data-path="src/pages/MealPlannerPage.tsx" />
              Create Workout Plan
            </Button>
          </div>
        </>
      }
    </div>);

};

export default MealPlannerPage;