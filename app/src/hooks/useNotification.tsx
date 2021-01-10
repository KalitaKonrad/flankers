import { Subscription } from '@unimodules/react-native-adapter';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';

import {
  NOTIFICATION_TOKEN_CHANGED_EVENT,
  NOTIFICATION_EVENT,
} from '../const/events.const';
import { EventBus } from '../utils/eventBus';
import { NotificationEvents } from '../utils/notificationHandler';
import {
  getStoredNotificationToken,
  setNotificationToken,
} from '../utils/tokenUtils';

type NotificationContextData = ReturnType<typeof useProvideNotification>;

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData
);

interface NotificationData {
  eventType: NotificationEvents;
}

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

const EXPO_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const useProvideNotification = () => {
  const [token, setToken] = useState<string | undefined | null>(null);
  const [isLoading, setLoading] = useState(true);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();

  const sendPushNotification = async (
    title: string,
    body: string,
    data: NotificationData
  ) => {
    const message = {
      to: token, //TODO: should the token be passed dynamically? or can it be just passed from state inside this function?
      sound: 'default',
      title,
      body,
      data,
    };

    await fetch(EXPO_NOTIFICATION_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return null;
  };

  useEffect(() => {
    const initNotificationUsage = async () => {
      const storedNotificationToken = await getStoredNotificationToken();
      setToken(storedNotificationToken);
      setLoading(false);

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          EventBus.emit(NOTIFICATION_EVENT, response);
        }
      );

      const notificationToken = await registerForPushNotificationsAsync();
      setToken(notificationToken);
      await setNotificationToken(notificationToken ?? '');
      setLoading(false);

      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    };
    initNotificationUsage();
  }, [token]);

  useEffect(() => {
    const unsubscribe = EventBus.on(
      NOTIFICATION_TOKEN_CHANGED_EVENT,
      async () => {
        const newToken = await getStoredNotificationToken();
        setToken(newToken);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const pushNotificationAllowed = !!token;

  return {
    sendPushNotification,
    registerForPushNotificationsAsync,
    token,
    isLoading,
    notification,
    pushNotificationAllowed,
  };
};
