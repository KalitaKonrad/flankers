import { NotificationResponse } from 'expo-notifications';
import { useCallback, useEffect } from 'react';

import { NOTIFICATION_EVENT } from '../const/events.const';
import { EventBus } from '../utils/eventBus';

export const NotificationEvents = {
  TEAM_INVITE: 'team_invite',
  UNRECOGNIZED: 'unrecognized',
};

export const useNotificationHandler = (navigation: any) => {
  const handleNotifiationPress = useCallback(
    (response: NotificationResponse) => {
      const eventType = response.notification.request.content.data.type;

      if (
        !(typeof eventType === 'string') ||
        !Object.values(NotificationEvents).includes(eventType)
      ) {
        console.error('Event type not recognized');
        return;
      }

      //TODO: add other events and refactor this solution
      if (eventType === NotificationEvents.TEAM_INVITE) {
        console.log('NAWIGACJA w useNotificationHanlder');

        navigation.navigate('TeamInvitationsScreen');
      }
    },
    [navigation]
  );

  useEffect(() => {
    const unsubscribe = EventBus.on(NOTIFICATION_EVENT, handleNotifiationPress);

    return () => {
      unsubscribe();
    };
  }, [handleNotifiationPress]);
};
