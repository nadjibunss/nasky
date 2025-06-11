import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  primary_goal: 'Build muscle' | 'Lose weight' | 'Eat healthier';
  weight_kg: number;
  height_cm: number;
  is_meat_eater: boolean;
  is_lactose_intolerant: boolean;
  allergies: string[];
  eating_style: 'Vegan' | 'Keto' | 'Paleo' | 'Vegetarian' | 'Balanced' | 'None';
  caffeine_consumption: 'None' | 'Occasionally' | 'Regularly';
  sugar_consumption: 'None' | 'Occasionally' | 'Regularly';
}

interface UserProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  const setProfile = (newProfile: UserProfile) => {
    console.log('Setting user profile:', newProfile);
    setProfileState(newProfile);
  };

  const clearProfile = () => {
    console.log('Clearing user profile');
    setProfileState(null);
  };

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, clearProfile }} data-id="rfgush2l6" data-path="src/contexts/UserProfileContext.tsx">
      {children}
    </UserProfileContext.Provider>);

};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};