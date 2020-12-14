import * as SecureStore from 'expo-secure-store';

import { TOKEN_STORAGE_KEY } from '../const/auth.const';
import { TOKEN_CHANGED_EVENT } from '../const/events.const';
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
