import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  UtensilsCrossed,
  Dumbbell,
  Camera,
  Brain,
  Users,
  TrendingUp,
  Heart } from
'lucide-react';
import UserProfileForm from '@/components/UserProfileForm';

const HomePage: React.FC = () => {
  const features = [
  {
    icon: Brain,
    title: 'AI-Powered Coaching',
    description: 'Get personalized advice from our intelligent fitness coach that learns from your goals and preferences.',
    color: 'text-blue-500'
  },
  {
    icon: UtensilsCrossed,
    title: 'Custom Meal Plans',
    description: 'Receive tailored nutrition plans based on your dietary preferences, allergies, and fitness goals.',
    color: 'text-green-500'
  },
  {
    icon: Dumbbell,
    title: 'Workout Routines',
    description: 'Access scientifically-designed workout plans that adapt to your fitness level and objectives.',
    color: 'text-orange-500'
  },
  {
    icon: Camera,
    title: 'Food Scanner',
    description: 'Scan your meals to get instant nutritional analysis and track your dietary intake effortlessly.',
    color: 'text-purple-500'
  }];


  const stats = [
  { icon: TrendingUp, value: '95%', label: 'Success Rate' },
  { icon: Heart, value: '24/7', label: 'AI Support' },
  { icon: Target, value: '4+', label: 'AI Features' }];


  return (
    <div className="space-y-12" data-id="eic44lwsn" data-path="src/pages/HomePage.tsx">
      {/* Hero Section */}
      <section className="text-center space-y-6" data-id="wlchtw5bb" data-path="src/pages/HomePage.tsx">
        <div className="space-y-4" data-id="71qlmxt58" data-path="src/pages/HomePage.tsx">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight" data-id="u26g92sfm" data-path="src/pages/HomePage.tsx">
          VitaFlex{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-id="nbxn7hhqo" data-path="src/pages/HomePage.tsx">
              AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed" data-id="spmv8o4q8" data-path="src/pages/HomePage.tsx">
            Transform your fitness journey with personalized AI coaching, custom meal plans, 
            and intelligent workout routines tailored just for you.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3" data-id="jsiivr5dz" data-path="src/pages/HomePage.tsx">
          <Badge variant="secondary" className="px-4 py-2 bg-orange-600 text-white text-sm" data-id="g46dwfigk" data-path="src/pages/HomePage.tsx">
            🔥 Personalized Plans
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-red-600 text-white text-sm" data-id="5xio2l2n4" data-path="src/pages/HomePage.tsx">
            🧠 AI-Powered
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-gray-600 text-white text-sm" data-id="2kg4sj9a4" data-path="src/pages/HomePage.tsx">
            📱 Mobile Friendly
          </Badge>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8" data-id="wg45fw1vk" data-path="src/pages/HomePage.tsx">
        {stats.map((stat, index) =>
        <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-center p-4 hover:scale-105 transition-transform duration-300" data-id="dwmhalcs1" data-path="src/pages/HomePage.tsx">
            <CardContent className="p-0 space-y-2" data-id="3cxuhwaqi" data-path="src/pages/HomePage.tsx">
              <stat.icon className="h-8 w-8 mx-auto text-orange-500" data-id="34dfjb8hv" data-path="src/pages/HomePage.tsx" />
              <p className="text-2xl md:text-3xl font-bold text-white" data-id="prnjqeuzh" data-path="src/pages/HomePage.tsx">{stat.value}</p>
              <p className="text-gray-400 text-sm" data-id="h20rtcld0" data-path="src/pages/HomePage.tsx">{stat.label}</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Features Section */}
      <section className="space-y-8" data-id="a8f114tk3" data-path="src/pages/HomePage.tsx">
        <div className="text-center space-y-4" data-id="7r1uwi1hm" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl md:text-4xl font-bold text-white" data-id="yk63585qf" data-path="src/pages/HomePage.tsx">
            Everything You Need for{' '}
            <span className="text-orange-500" data-id="iq3jekpqg" data-path="src/pages/HomePage.tsx">Fitness Success</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto" data-id="v4sftqnjp" data-path="src/pages/HomePage.tsx">
            This comprehensive platform combines cutting-edge AI technology with proven fitness science
            to deliver results that exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="bx71rzmil" data-path="src/pages/HomePage.tsx">
          {features.map((feature, index) =>
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105" data-id="skkexr8rb" data-path="src/pages/HomePage.tsx">

              <CardHeader data-id="l4fyywu7f" data-path="src/pages/HomePage.tsx">
                <CardTitle className="flex items-center space-x-3 text-white" data-id="0vwmichvd" data-path="src/pages/HomePage.tsx">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} data-id="yj9rsz1rl" data-path="src/pages/HomePage.tsx" />
                  <span data-id="sxw50gi51" data-path="src/pages/HomePage.tsx">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent data-id="rn956scab" data-path="src/pages/HomePage.tsx">
                <CardDescription className="text-gray-300 text-base leading-relaxed" data-id="pagfsapv2" data-path="src/pages/HomePage.tsx">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Profile Form Section */}
      <section className="space-y-8" data-id="g694p76pw" data-path="src/pages/HomePage.tsx">
        <div className="text-center space-y-4" data-id="2igazb9fo" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl md:text-4xl font-bold text-white" data-id="vs67dbdza" data-path="src/pages/HomePage.tsx">
            Get Started with Your{' '}
            <span className="text-orange-500" data-id="1cs0huz0r" data-path="src/pages/HomePage.tsx">Personal Profile</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto" data-id="jhaokxbls" data-path="src/pages/HomePage.tsx">
            Tell us about your fitness goals and preferences so we can create the perfect 
            workout and nutrition plan just for you.
          </p>
        </div>

        <UserProfileForm data-id="028os1db8" data-path="src/pages/HomePage.tsx" />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12" data-id="en3quyvg9" data-path="src/pages/HomePage.tsx">
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20" data-id="24xl4w343" data-path="src/pages/HomePage.tsx">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" data-id="794grb5yc" data-path="src/pages/HomePage.tsx">
            Ready to Transform Your Body?
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto" data-id="s1ie86yau" data-path="src/pages/HomePage.tsx">
            Join thousands of users who have already achieved their fitness goals with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-id="7bzv8p3r3" data-path="src/pages/HomePage.tsx">
            <Badge variant="outline" className="border-green-500 text-green-400 px-4 py-2" data-id="vdvz0vj2b" data-path="src/pages/HomePage.tsx">
              ✓ No subscription required
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400 px-4 py-2" data-id="zc9h46dk9" data-path="src/pages/HomePage.tsx">
              ✓ Instant results
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400 px-4 py-2" data-id="77tasmw48" data-path="src/pages/HomePage.tsx">
              ✓ Personalized approach
            </Badge>
          </div>
        </div>
      </section>
    </div>);

};

export default HomePage;