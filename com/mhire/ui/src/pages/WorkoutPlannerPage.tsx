import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Dumbbell,
  Play,
  ChevronDown,
  ChevronRight,
  Clock,
  Calendar,
  Target,
  Flame,
  Youtube,
  Activity } from
'lucide-react';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { useWorkoutPlan, WorkoutSection, Exercise } from '@/contexts/WorkoutPlanContext';
import { workoutPlanService } from '@/services/apiService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const WorkoutPlannerPage: React.FC = () => {
  const { profile } = useUserProfile();
  const { workoutPlan, setWorkoutPlan, isLoading, setIsLoading } = useWorkoutPlan();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<{section: WorkoutSection;title: string;day: string;} | null>(null);

  const generateWorkoutPlan = async () => {
    if (!profile) {
      toast({
        title: "Profil Diperlukan",
        description: "Silakan lengkapi profil Anda terlebih dahulu untuk membuat rencana latihan.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Generating workout plan for profile:', profile);
      const generatedPlan = await workoutPlanService.generateWorkoutPlan(profile);
      console.log('Generated workout plan received in component:', generatedPlan);
      console.log('Workout plan structure check:', {
        hasWorkoutPlan: !!generatedPlan?.workout_plan,
        isWorkoutPlanArray: Array.isArray(generatedPlan?.workout_plan),
        workoutPlanLength: generatedPlan?.workout_plan?.length,
        fullStructure: JSON.stringify(generatedPlan, null, 2)
      });
      
      // Ensure the workout plan has the expected structure before setting it
      if (generatedPlan && 
          generatedPlan.workout_plan && 
          Array.isArray(generatedPlan.workout_plan) && 
          generatedPlan.workout_plan.length > 0) {
        
        // Create a new object to ensure React detects the state change
        const formattedWorkoutPlan = {
          workout_plan: [...generatedPlan.workout_plan.map(day => ({
            ...day,
            warm_up: { ...day.warm_up },
            main_routine: { ...day.main_routine },
            cool_down: { ...day.cool_down }
          }))]
        };
        
        console.log('Setting formatted workout plan:', formattedWorkoutPlan);
        setWorkoutPlan(formattedWorkoutPlan);
        
        toast({
          title: "Rencana Latihan Dihasilkan!",
          description: "Rencana latihan pribadi Anda sudah siap. Perluas setiap hari untuk melihat latihan Anda."
        });
      } else {
        throw new Error('Data rencana latihan yang diterima tidak memiliki properti yang diperlukan');
      }
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast({
        title: "Pembuatan Gagal",
        description: "Gagal membuat rencana latihan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const sectionTypes = [
  { key: 'warm_up', label: 'Pemanasan', icon: Activity, color: 'from-blue-500 to-cyan-500' },
  { key: 'main_routine', label: 'Latihan Utama', icon: Dumbbell, color: 'from-orange-500 to-red-500' },
  { key: 'cool_down', label: 'Pendinginan', icon: Flame, color: 'from-green-500 to-teal-500' }];


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" data-id="573h0i25i" data-path="src/pages/WorkoutPlannerPage.tsx">
        <LoadingSpinner size="lg" text="Membuat rencana latihan pribadi Anda..." data-id="u53x2dk40" data-path="src/pages/WorkoutPlannerPage.tsx" />
      </div>);

  }

  return (
    <div className="space-y-8" data-id="nl5eoyr2w" data-path="src/pages/WorkoutPlannerPage.tsx">
      {/* Header */}
      <div className="text-center space-y-4" data-id="6v1slvesh" data-path="src/pages/WorkoutPlannerPage.tsx">
        <h1 className="text-4xl md:text-5xl font-bold text-white" data-id="yfcaykdof" data-path="src/pages/WorkoutPlannerPage.tsx">
          Rencana Latihan{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-id="3pkqmix7a" data-path="src/pages/WorkoutPlannerPage.tsx">
            Pribadi Anda
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-id="ldwiok81p" data-path="src/pages/WorkoutPlannerPage.tsx">
          Dapatkan rutinitas kebugaran yang dirancang secara ilmiah yang disesuaikan dengan tujuan, tingkat kebugaran, dan preferensi Anda.
        </p>
      </div>

      {/* Generate Button */}
      {!workoutPlan &&
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20 max-w-2xl mx-auto" data-id="rlihwhc08" data-path="src/pages/WorkoutPlannerPage.tsx">
          <CardHeader className="text-center" data-id="tvnh7ub1c" data-path="src/pages/WorkoutPlannerPage.tsx">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2" data-id="rbcxrobwp" data-path="src/pages/WorkoutPlannerPage.tsx">
              <Dumbbell className="h-6 w-6 text-orange-500" data-id="5qf6zcfb4" data-path="src/pages/WorkoutPlannerPage.tsx" />
              <span data-id="zh9p1dzlo" data-path="src/pages/WorkoutPlannerPage.tsx">Siap Membuat Rencana Latihan Anda?</span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg" data-id="fjk99v6dh" data-path="src/pages/WorkoutPlannerPage.tsx">
              AI kami akan merancang rutinitas latihan komprehensif yang sesuai dengan tujuan dan tingkat kebugaran Anda saat ini.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center" data-id="30djq0nfn" data-path="src/pages/WorkoutPlannerPage.tsx">
            <Button
            onClick={generateWorkoutPlan}
            disabled={!profile}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            size="lg" data-id="fad4p9sw1" data-path="src/pages/WorkoutPlannerPage.tsx">

              <Dumbbell className="h-5 w-5 mr-2" data-id="s3hth9bjv" data-path="src/pages/WorkoutPlannerPage.tsx" />
              Hasilkan Rencana Latihan Saya
            </Button>
            {!profile &&
          <p className="text-red-400 text-sm mt-2" data-id="9hok0zxhz" data-path="src/pages/WorkoutPlannerPage.tsx">
                Lengkapi profil Anda terlebih dahulu untuk membuat rencana latihan
              </p>
          }
          </CardContent>
        </Card>
      }

      {/* Workout Plan Display */}
      {workoutPlan &&
      <>
          {/* Plan Overview */}
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20" data-id="tkmpo3amz" data-path="src/pages/WorkoutPlannerPage.tsx">
            <CardHeader data-id="pyo9gzo6q" data-path="src/pages/WorkoutPlannerPage.tsx">
              <CardTitle className="text-xl text-white flex items-center space-x-2" data-id="jzw0v0wmi" data-path="src/pages/WorkoutPlannerPage.tsx">
                <Calendar className="h-5 w-5 text-orange-500" data-id="hfknlpb13" data-path="src/pages/WorkoutPlannerPage.tsx" />
                <span data-id="q7dh7w9j3" data-path="src/pages/WorkoutPlannerPage.tsx">Program Latihan 3 Hari</span>
              </CardTitle>
              <CardDescription className="text-gray-300" data-id="wk8ex0ldc" data-path="src/pages/WorkoutPlannerPage.tsx">
                Rencana pelatihan komprehensif yang dirancang untuk memaksimalkan hasil Anda dan membuat Anda tetap termotivasi.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Workout Days */}
          <div className="space-y-4" data-id="z100d9rdo" data-path="src/pages/WorkoutPlannerPage.tsx">
            {workoutPlan.workout_plan.map((day, dayIndex) =>
          <Card key={dayIndex} className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" data-id="5vix8i75i" data-path="src/pages/WorkoutPlannerPage.tsx">
                <Collapsible
              open={expandedDay === day.day}
              onOpenChange={() => setExpandedDay(expandedDay === day.day ? null : day.day)} data-id="3d3rksnvx" data-path="src/pages/WorkoutPlannerPage.tsx">

                  <CollapsibleTrigger asChild data-id="uaachigvv" data-path="src/pages/WorkoutPlannerPage.tsx">
                    <CardHeader className="hover:bg-gray-700/50 transition-colors cursor-pointer" data-id="nhwi5t04k" data-path="src/pages/WorkoutPlannerPage.tsx">
                      <div className="flex items-center justify-between" data-id="pia4tyign" data-path="src/pages/WorkoutPlannerPage.tsx">
                        <CardTitle className="text-white flex items-center space-x-3" data-id="cih7xo2j0" data-path="src/pages/WorkoutPlannerPage.tsx">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500" data-id="e046sin2b" data-path="src/pages/WorkoutPlannerPage.tsx">
                            <Dumbbell className="h-5 w-5 text-white" data-id="bg165ulpq" data-path="src/pages/WorkoutPlannerPage.tsx" />
                          </div>
                          <div data-id="f1qmjo7ta" data-path="src/pages/WorkoutPlannerPage.tsx">
                            <span className="text-xl" data-id="fvihnm25b" data-path="src/pages/WorkoutPlannerPage.tsx">{day.day}</span>
                            <p className="text-gray-400 text-sm font-normal" data-id="rasjjo3ek" data-path="src/pages/WorkoutPlannerPage.tsx">{day.focus}</p>
                          </div>
                        </CardTitle>
                        <div className="flex items-center space-x-2" data-id="lkuidgzdq" data-path="src/pages/WorkoutPlannerPage.tsx">
                          <Badge variant="outline" className="border-orange-500 text-orange-400" data-id="yow0h0nyo" data-path="src/pages/WorkoutPlannerPage.tsx">
                            3 Bagian
                          </Badge>
                          {expandedDay === day.day ?
                      <ChevronDown className="h-5 w-5 text-gray-400" data-id="uvs4nvnuj" data-path="src/pages/WorkoutPlannerPage.tsx" /> :

                      <ChevronRight className="h-5 w-5 text-gray-400" data-id="h01zbpix6" data-path="src/pages/WorkoutPlannerPage.tsx" />
                      }
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent data-id="8kjwcf12j" data-path="src/pages/WorkoutPlannerPage.tsx">
                    <CardContent className="pt-0" data-id="tf8rn58dt" data-path="src/pages/WorkoutPlannerPage.tsx">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="dcp5l9zyp" data-path="src/pages/WorkoutPlannerPage.tsx">
                        {sectionTypes.map(({ key, label, icon: Icon, color }) => {
                      const section = day[key as keyof typeof day] as WorkoutSection;

                      return (
                        <Dialog key={key} data-id="z3lu544il" data-path="src/pages/WorkoutPlannerPage.tsx">
                              <DialogTrigger asChild data-id="0a74fopyl" data-path="src/pages/WorkoutPlannerPage.tsx">
                                <Card
                              className="bg-gray-800 border-gray-600 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                              onClick={() => setSelectedSection({ section, title: label, day: day.day })} data-id="akbr9sugx" data-path="src/pages/WorkoutPlannerPage.tsx">

                                  <CardHeader className="pb-3" data-id="8eu6r9q6g" data-path="src/pages/WorkoutPlannerPage.tsx">
                                    <CardTitle className="text-white flex items-center space-x-2 text-sm" data-id="xtm8iym9z" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${color}`} data-id="5bh82qak4" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        <Icon className="h-4 w-4 text-white" data-id="4w9fn2abc" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                      </div>
                                      <span data-id="kv87emnfw" data-path="src/pages/WorkoutPlannerPage.tsx">{label}</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0" data-id="gemivw8uy" data-path="src/pages/WorkoutPlannerPage.tsx">
                                    <div className="space-y-2" data-id="ybg7wqjn3" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <p className="text-gray-300 text-sm italic" data-id="cdm04qu2i" data-path="src/pages/WorkoutPlannerPage.tsx">"{section.motto}"</p>
                                      <div className="flex items-center space-x-2" data-id="yhub3sh4x" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        <Clock className="h-3 w-3 text-gray-500" data-id="ydk11h47g" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                        <span className="text-gray-500 text-xs" data-id="ft84qpt93" data-path="src/pages/WorkoutPlannerPage.tsx">{section.duration}</span>
                                      </div>
                                      <Badge variant="secondary" className="text-xs" data-id="4m2224p7s" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        {section.exercises.length} latihan
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              </DialogTrigger>
                              
                              {/* Section Detail Modal */}
                              <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white max-h-[80vh] overflow-y-auto" data-id="5d81qdzg9" data-path="src/pages/WorkoutPlannerPage.tsx">
                                <DialogHeader data-id="7ng3o0hbz" data-path="src/pages/WorkoutPlannerPage.tsx">
                                  <DialogTitle className="text-2xl flex items-center space-x-2" data-id="5emzcmmmh" data-path="src/pages/WorkoutPlannerPage.tsx">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`} data-id="d16thjplm" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <Icon className="h-5 w-5 text-white" data-id="w8l5zlu9o" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                    </div>
                                    <span data-id="tpaihxg5q" data-path="src/pages/WorkoutPlannerPage.tsx">{day.day} - {label}</span>
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-300 text-lg" data-id="v5mnwh5i0" data-path="src/pages/WorkoutPlannerPage.tsx">
                                    <div className="flex items-center space-x-4 mt-2" data-id="hr55qpw3k" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <span className="italic" data-id="watrlbcua" data-path="src/pages/WorkoutPlannerPage.tsx">"{section.motto}"</span>
                                      <Badge variant="outline" className="border-gray-600" data-id="tiay9akvx" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        <Clock className="h-3 w-3 mr-1" data-id="n8mr2ehat" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                        {section.duration}
                                      </Badge>
                                    </div>
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-6" data-id="j07tc3q7g" data-path="src/pages/WorkoutPlannerPage.tsx">
                                  {/* Video Section */}
                                  {section.video_url &&
                              <div className="space-y-2" data-id="n8blzct23" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <h4 className="text-lg font-semibold text-orange-500 flex items-center space-x-2" data-id="vs8awk6o7" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        <Youtube className="h-5 w-5" data-id="eftu9wbcb" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                        <span data-id="ozqnf0xxe" data-path="src/pages/WorkoutPlannerPage.tsx">Video Ikuti</span>
                                      </h4>
                                      <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden" data-id="6ovrwdahg" data-path="src/pages/WorkoutPlannerPage.tsx">
                                        <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(section.video_url)}`}
                                    title={`${label} Video`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen data-id="0ai02j3rm" data-path="src/pages/WorkoutPlannerPage.tsx" />

                                      </div>
                                    </div>
                              }
                                  
                                  {/* Exercises */}
                                  <div data-id="w6cucyuk5" data-path="src/pages/WorkoutPlannerPage.tsx">
                                    <h4 className="text-lg font-semibold mb-4 text-white flex items-center space-x-2" data-id="3uvjlieoa" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      <Target className="h-5 w-5 text-orange-500" data-id="rd6f3ztfv" data-path="src/pages/WorkoutPlannerPage.tsx" />
                                      <span data-id="iy94xzltu" data-path="src/pages/WorkoutPlannerPage.tsx">Latihan ({section.exercises.length})</span>
                                    </h4>
                                    <div className="space-y-4" data-id="4i6yym18b" data-path="src/pages/WorkoutPlannerPage.tsx">
                                      {section.exercises.map((exercise, exerciseIndex) =>
                                  <Card key={exerciseIndex} className="bg-gray-800 border-gray-600" data-id="hyuh306kl" data-path="src/pages/WorkoutPlannerPage.tsx">
                                          <CardContent className="p-4" data-id="lzxljlaxy" data-path="src/pages/WorkoutPlannerPage.tsx">
                                            <div className="flex items-start justify-between mb-3" data-id="d3g7hbf16" data-path="src/pages/WorkoutPlannerPage.tsx">
                                              <h5 className="text-lg font-semibold text-white" data-id="jpils4m6j" data-path="src/pages/WorkoutPlannerPage.tsx">{exercise.name}</h5>
                                              <div className="flex space-x-2" data-id="vbmbvxe84" data-path="src/pages/WorkoutPlannerPage.tsx">
                                                <Badge variant="outline" className="border-blue-500 text-blue-400" data-id="tedik61jv" data-path="src/pages/WorkoutPlannerPage.tsx">
                                                  {exercise.sets} set
                                                </Badge>
                                                <Badge variant="outline" className="border-green-500 text-green-400" data-id="8pm524rhz" data-path="src/pages/WorkoutPlannerPage.tsx">
                                                  {exercise.reps}
                                                </Badge>
                                                <Badge variant="outline" className="border-yellow-500 text-yellow-400" data-id="q82h1fcz3" data-path="src/pages/WorkoutPlannerPage.tsx">
                                                  {exercise.rest} istirahat
                                                </Badge>
                                              </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed" data-id="uith8y5u4" data-path="src/pages/WorkoutPlannerPage.tsx">{exercise.instructions}</p>
                                          </CardContent>
                                        </Card>
                                  )}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>);

                    })}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
          )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4" data-id="f3fdy6r41" data-path="src/pages/WorkoutPlannerPage.tsx">
            <Button
            onClick={generateWorkoutPlan}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white" data-id="xwcu2ytc1" data-path="src/pages/WorkoutPlannerPage.tsx">

              <Dumbbell className="h-4 w-4 mr-2" data-id="87kxs9nxy" data-path="src/pages/WorkoutPlannerPage.tsx" />
              Hasilkan Rencana Baru
            </Button>
            <Button
            onClick={() => navigate('/food-scanner')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" data-id="r5h9m8uah" data-path="src/pages/WorkoutPlannerPage.tsx">

              <Target className="h-4 w-4 mr-2" data-id="mv3utuqfu" data-path="src/pages/WorkoutPlannerPage.tsx" />
              Pindai Makanan Anda
            </Button>
          </div>
        </>
      }
    </div>);

};

export default WorkoutPlannerPage;