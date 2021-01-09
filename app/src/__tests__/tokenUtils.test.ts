import * as SecureStore from 'expo-secure-store';

import { setToken } from '../utils/tokenUtils';
jest.mock('expo-secure-store');

const setItemAsync = SecureStore.setItemAsync as jest.MockedFunction<
  typeof SecureStore.setItemAsync
>;

const deleteItemAsync = SecureStore.deleteItemAsync as jest.MockedFunction<
  typeof SecureStore.deleteItemAsync
>;

beforeEach(() => {
  setItemAsync.mockClear();
  deleteItemAsync.mockClear();
});

it('blalba', () => {
  setToken('token_test');
  expect(setItemAsync).toHaveBeenCalledWith('token_test');
});
