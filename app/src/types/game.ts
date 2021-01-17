import { SquadResponse } from './squadResponse';

export interface GameInvitation {
  code: string;
  game_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Game {
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
  squad_size: string;
  location: {
    long: number;
    lat: number;
  };
  squads: SquadResponse[];
  invite?: GameInvitation;
}
