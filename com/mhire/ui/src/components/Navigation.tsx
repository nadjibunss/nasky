import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  UtensilsCrossed,
  Dumbbell,
  Camera,
  MessageCircle } from
'lucide-react';
import { useChat } from '@/contexts/ChatContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { setIsOpen } = useChat();

  const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/meal-planner', label: 'Meal Plans', icon: UtensilsCrossed },
  { path: '/workout-planner', label: 'Workouts', icon: Dumbbell },
  { path: '/food-scanner', label: 'Food Scanner', icon: Camera }];


  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-orange-900 to-red-900 shadow-lg border-b border-orange-500/20" data-id="3fdb4w7jm" data-path="src/components/Navigation.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="bza4js0q6" data-path="src/components/Navigation.tsx">
        <div className="flex justify-between items-center h-16" data-id="ty1vjf209" data-path="src/components/Navigation.tsx">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-id="mk6wtw7ui" data-path="src/components/Navigation.tsx">
            <Dumbbell className="h-8 w-8 text-orange-500" data-id="okpos4vkg" data-path="src/components/Navigation.tsx" />
            <span className="text-2xl font-bold text-white" data-id="mgtme57bs" data-path="src/components/Navigation.tsx">VitaFlex AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1" data-id="f2zukzh63" data-path="src/components/Navigation.tsx">
            {navItems.map(({ path, label, icon: Icon }) =>
            <Link key={path} to={path} data-id="zkipktykb" data-path="src/components/Navigation.tsx">
                <Button
                variant={isActive(path) ? "default" : "ghost"}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive(path) ?
                'bg-orange-600 text-white shadow-lg' :
                'text-gray-300 hover:text-white hover:bg-gray-800'}`
                } data-id="w82lst4iy" data-path="src/components/Navigation.tsx">

                  <Icon className="h-4 w-4" data-id="422vbzczr" data-path="src/components/Navigation.tsx" />
                  <span data-id="umg2avjl9" data-path="src/components/Navigation.tsx">{label}</span>
                </Button>
              </Link>
            )}
            
            {/* Chat Toggle Button */}
            <Button
              onClick={() => setIsOpen(true)}
              variant="ghost"
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200" data-id="nrw9rt79a" data-path="src/components/Navigation.tsx">

              <MessageCircle className="h-4 w-4" data-id="05n9jio15" data-path="src/components/Navigation.tsx" />
              <span data-id="crtp4n26k" data-path="src/components/Navigation.tsx">Chat</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden" data-id="90maiyv1x" data-path="src/components/Navigation.tsx">
            <Button
              onClick={() => setIsOpen(true)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white" data-id="7rdw0skan" data-path="src/components/Navigation.tsx">

              <MessageCircle className="h-5 w-5" data-id="xf0fzxhfz" data-path="src/components/Navigation.tsx" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-800 border-t border-gray-700" data-id="ffrlitu84" data-path="src/components/Navigation.tsx">
        <div className="px-2 pt-2 pb-3 space-y-1" data-id="5qh7qvw7y" data-path="src/components/Navigation.tsx">
          {navItems.map(({ path, label, icon: Icon }) =>
          <Link key={path} to={path} data-id="u4tnfkm8k" data-path="src/components/Navigation.tsx">
              <Button
              variant={isActive(path) ? "default" : "ghost"}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-left ${
              isActive(path) ?
              'bg-orange-600 text-white' :
              'text-gray-300 hover:text-white hover:bg-gray-700'}`
              } data-id="hyngj2x7f" data-path="src/components/Navigation.tsx">

                <Icon className="h-4 w-4" data-id="d06vrd5y3" data-path="src/components/Navigation.tsx" />
                <span data-id="vv6909gxm" data-path="src/components/Navigation.tsx">{label}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>);

};

export default Navigation;