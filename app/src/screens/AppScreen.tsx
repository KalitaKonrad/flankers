import {
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  useFonts,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import React, { useEffect } from 'react';

import { BottomTabNavigation } from '../components/BottomTabNavigation';
import { NOTIFICATION_EVENT } from '../const/events.const';
import { useAuth } from '../hooks/useAuth';
import { EventBus } from '../utils/eventBus';
import { handleNotifiationPress } from '../utils/notificationHandler';
import { AuthScreenStack } from './auth/AuthScreenStack';

export const AppScreen: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    const unsubscribe = EventBus.on(NOTIFICATION_EVENT, handleNotifiationPress);
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading || !fontsLoaded) {
    return <AppLoading />;
  }

  if (isAuthenticated) {
    return <BottomTabNavigation />;
  } else {
    return <AuthScreenStack />;
  }
};
