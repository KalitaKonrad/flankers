import { NotificationResponse } from 'expo-notifications';

export enum NotificationEvents {
  JOIN_SQUAD = 'JOIN_SQUAD',
}

const actions = {
  [NotificationEvents.JOIN_SQUAD]: () => {
    //TODO: JOIN SQUAD ACTION
    console.log('JOIN SQUAD ACTION');
  },
};

export const handleNotifiationPress = (response: NotificationResponse) => {
  const eventType = response.notification.request.content.data.eventType;

  if (
    !(typeof eventType === 'string') ||
    !Object.keys(NotificationEvents).includes(eventType)
  ) {
    console.error('Event type not recognized');
    return;
  }

  return actions[eventType as NotificationEvents]();
};
