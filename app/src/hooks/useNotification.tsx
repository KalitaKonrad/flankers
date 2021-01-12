import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { NOTIFICATION_EVENT } from '../const/events.const';
import { EventBus } from '../utils/eventBus';
import { useUserProfileQuery } from './useUserProfileQuery';

type NotificationContextData = ReturnType<typeof useProvideNotification>;

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider: React.FC = ({ children }) => {
  const notification = useProvideNotification();
  return (
    <NotificationContext.Provider value={notification}>
      {children}
    </NotificationContext.Provider>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useProvideNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);

  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();

  const userProfile = useUserProfileQuery();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      setLoading(true);
      if (!Constants.isDevice) {
        alert(
          'Musisz używać fizycznego urządzenia, gdy chcesz używać notyfikacji'
        );
        return;
      }

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== 'granted') {
        alert('Brak uprawnień do pokazywania notyfikacji!');
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(
          `user_${userProfile.data?.id}`,
          {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          }
        );
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      setLoading(false);

      return token ?? null;
    };
    registerForPushNotificationsAsync();
  }, [userProfile.data?.id]);

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    const notificationSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or
    // interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        EventBus.emit(NOTIFICATION_EVENT, response);
      }
    );

    return () => {
      notificationSubscription.remove();
      responseSubscription.remove();
    };
  }, [expoPushToken]);

  return {
    expoPushToken,
    isLoading,
    notification,
  };
};
