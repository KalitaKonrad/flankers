import {
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from '@expo-google-fonts/inter';
import React from 'react';

import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { NOTIFICATION_EVENT } from '../const/events.const';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { EventBus } from '../utils/eventBus';
import { SplashScreen } from './SplashScreen';
import { AuthScreenStack } from './auth/AuthScreenStack';

export const AppScreen: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  // INITIALIZE NOTIFICATION AND ADD LISTENER
  useNotification();
  EventBus.on(NOTIFICATION_EVENT, handleNotifiationPress);

  if (isLoading || !fontsLoaded) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <BottomTabNavigation />;
  } else {
    return <AuthScreenStack />;
  }
};
