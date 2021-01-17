export interface InvitePayload {
  id: number;
  user_id: number; // id of user that INVITES current user
  team_id: number;
  type: string;
  email: string;
  accept_token: string;
  deny_token: string;
  created_at: string;
  updated_at: string;
  team_name: string;
  team_avatar?: string;
  team_description: string;
}
