import { TeamProfilePayload } from '../types/teamProfile';

export interface UserProfilePayload {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  current_team_id: number | null;
  teams: TeamProfilePayload[];
  invites: [];
}
