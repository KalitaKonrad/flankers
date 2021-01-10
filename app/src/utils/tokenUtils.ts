import * as SecureStore from 'expo-secure-store';

import { TOKEN_STORAGE_KEY, NOTIFICATION_TOKEN_KEY } from '../const/auth.const';
import {
  NOTIFICATION_TOKEN_CHANGED_EVENT,
  TOKEN_CHANGED_EVENT,
} from '../const/events.const';
import { EventBus } from './eventBus';

export const getToken = () => SecureStore.getItemAsync(TOKEN_STORAGE_KEY);

export const setToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token);
  EventBus.emit(TOKEN_CHANGED_EVENT);
};

export const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  EventBus.emit(TOKEN_CHANGED_EVENT);
};

// NOTIFICATION TOKEN

export const getStoredNotificationToken = () =>
  SecureStore.getItemAsync(NOTIFICATION_TOKEN_KEY);

export const setNotificationToken = async (token: string) => {
  await SecureStore.setItemAsync(NOTIFICATION_TOKEN_KEY, token);
  EventBus.emit(NOTIFICATION_TOKEN_CHANGED_EVENT);
};
