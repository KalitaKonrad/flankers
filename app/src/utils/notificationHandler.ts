interface NotificationEvents {
  JOIN_SQUAD: 'JOIN_SQUAD';
}

export type NotificationEventType = keyof NotificationEvents;

const actions = {
  JOIN_SQUAD: () => {
    //TODO: JOIN SQUAD ACTION
  },
};

export const handleNotifiationPress = (eventType: NotificationEventType) => {
  return actions[eventType]();
};
