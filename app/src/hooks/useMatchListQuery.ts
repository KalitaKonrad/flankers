import { useQuery } from 'react-query';

import { QUERY_GAMES } from '../const/query.const';
import { useAxios } from './useAxios';

export interface MatchListResponse {
  id: number;
  type: string;
  bet: number;
  rated: number;
  public: number;
  start_date: null;
  duration: number;
  created_at: string;
  updated_at: string;
  long: string;
  lat: string;
  owner_id: number;
  completed: number;
}

export const useMatchListQuery = () => {
  const axios = useAxios();

  return useQuery<MatchListResponse[]>(QUERY_GAMES, async () => {
    const response = await axios.get('games');

    return response.data;
  });
};
