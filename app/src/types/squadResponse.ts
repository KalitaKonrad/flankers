export interface SquadResponse {
  id: number;
  game_id: number;
  slots: number;
  team_id: number;
  is_full: boolean;
  members?: MembersPayload[];
}

export interface MembersPayload {
  avatar: string;
  current_team_id: number;
  elo: number;
  email: string;
  id: number;
  name: string;
}
