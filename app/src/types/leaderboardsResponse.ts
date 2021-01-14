import { TeamProfilePayload } from './teamProfile';
import { UserProfilePayload } from './userProfilePayload';

export interface LeaderboardsResponse<T> {
  current_page: 1;
  data: T[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: 10;
  prev_page_url: string;
  to: number;
}
