import { NotificationResponse } from 'expo-notifications';
import { useCallback, useEffect } from 'react';

import { NOTIFICATION_EVENT } from '../../const/events.const';
import { EventBus } from '../../utils/eventBus';

export const NotificationEvents = {
  TEAM_INVITE: 'team_invite',
  UNRECOGNIZED: 'unrecognized',
};

export const useNotificationHandler = (navigation: any) => {
  const handleNotifiationPress = useCallback(
    (response: NotificationResponse) => {
      // TODO: add other notification types and refactor this solution
      navigation.jumpTo('Team', {
        screen: 'TeamInvitations',
      });
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
