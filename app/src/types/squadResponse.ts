import { UserProfilePayload } from './userProfilePayload';

export interface SquadResponse {
  id: number;
  game_id: number;
  slots: number;
  team_id: number;
  is_full: boolean;
  members?: UserProfilePayload[];
}
