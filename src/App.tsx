import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import ChatWidget from '@/components/ChatWidget';
import HomePage from '@/pages/HomePage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import WorkoutPlannerPage from '@/pages/WorkoutPlannerPage';
import FoodScannerPage from '@/pages/FoodScannerPage';
import NotFound from '@/pages/NotFound';

// Context Providers
import { UserProfileProvider } from '@/contexts/UserProfileContext';
import { MealPlanProvider } from '@/contexts/MealPlanContext';
import { WorkoutPlanProvider } from '@/contexts/WorkoutPlanContext';
import { FoodScanProvider } from '@/contexts/FoodScanContext';
import { ChatProvider } from '@/contexts/ChatContext';

import './App.css';

function App() {
  return (
    <UserProfileProvider data-id="zlk9rk4sg" data-path="src/App.tsx">
      <MealPlanProvider data-id="0v7eouhw5" data-path="src/App.tsx">
        <WorkoutPlanProvider data-id="bqsbxj4bv" data-path="src/App.tsx">
          <FoodScanProvider data-id="av5a6403b" data-path="src/App.tsx">
            <ChatProvider data-id="1mjy08pol" data-path="src/App.tsx">
              <Router data-id="3k576qf7e" data-path="src/App.tsx">
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black" data-id="ghlsrr8ht" data-path="src/App.tsx">
                  <Navigation data-id="anz6i20l2" data-path="src/App.tsx" />
                  
                  <main className="container mx-auto px-4 py-8" data-id="amf939ynq" data-path="src/App.tsx">
                    <Routes data-id="t59vbd137" data-path="src/App.tsx">
                      <Route path="/" element={<HomePage data-id="jmwacqojh" data-path="src/App.tsx" />} data-id="2xk9m7kun" data-path="src/App.tsx" />
                      <Route path="/meal-planner" element={<MealPlannerPage data-id="5a6zxzq56" data-path="src/App.tsx" />} data-id="0y0m1kp0b" data-path="src/App.tsx" />
                      <Route path="/workout-planner" element={<WorkoutPlannerPage data-id="xdsg307r3" data-path="src/App.tsx" />} data-id="8s0nr7kaa" data-path="src/App.tsx" />
                      <Route path="/food-scanner" element={<FoodScannerPage data-id="vdj9s9ivn" data-path="src/App.tsx" />} data-id="qg37kz1ch" data-path="src/App.tsx" />
                      <Route path="*" element={<NotFound data-id="bhf5cmwca" data-path="src/App.tsx" />} data-id="qcrt7t0ey" data-path="src/App.tsx" />
                    </Routes>
                  </main>

                  <ChatWidget data-id="zhs3l3732" data-path="src/App.tsx" />
                  <Toaster data-id="wm94p4fjl" data-path="src/App.tsx" />
                </div>
              </Router>
            </ChatProvider>
          </FoodScanProvider>
        </WorkoutPlanProvider>
      </MealPlanProvider>
    </UserProfileProvider>);

}

export default App;