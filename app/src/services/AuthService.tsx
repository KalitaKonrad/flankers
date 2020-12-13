import axios from '../utils/axios';

export const register = (nick: string, email: string, password: string) => {
  return axios.post('auth/signup', {
    name: nick,
    email,
    password,
  });
};
