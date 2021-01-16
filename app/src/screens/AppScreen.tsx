import {
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React from 'react';

import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { useAuth } from '../hooks/useAuth';
import { AuthScreenStack } from './auth/AuthScreenStack';

export const AppScreen: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (isLoading || !fontsLoaded) {
    return <AppLoading />;
  }

  if (isAuthenticated) {
    return <BottomTabNavigation />;
  } else {
    return <AuthScreenStack />;
  }
};
t;
