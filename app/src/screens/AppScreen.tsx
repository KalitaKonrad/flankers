import {
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from '@expo-google-fonts/inter';
import React from 'react';

import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { useAuth } from '../hooks/useAuth';
import { SplashScreen } from './SplashScreen';
import { AuthScreenStack } from './auth/AuthScreenStack';

export const AppScreen: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <BottomTabNavigation />;
  } else {
    return <AuthScreenStack />;
  }
};
