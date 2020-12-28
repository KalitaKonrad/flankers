import { SquadResponse } from './squadResponse';

export interface MatchResponse {
  id: number;
  type: string;
  bet: number;
  rated: boolean;
  public: boolean;
  start_date: null;
  duration: number;
  long: number;
  lat: number;
  owner_id: number;
  completed: boolean;
  location: {
    long: number;
    lat: number;
  };
  squads: SquadResponse[];
}
