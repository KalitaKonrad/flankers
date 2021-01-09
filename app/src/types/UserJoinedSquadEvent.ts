import { SquadResponse } from './squadResponse';
import { UserProfilePayload } from './userProfilePayload';

export interface UserJoinedSquadEvent {
  squad: SquadResponse;
  user: UserProfilePayload;
}
