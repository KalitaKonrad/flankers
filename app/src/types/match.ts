export interface MatchElementInHistory {
  winner: boolean;
}

export interface MatchHistoryResponse {
  current_page: number;
  data: MatchElementInHistory[];
  first_page_url: string;
  from: number;
  last_page_url: string;
  links: {
    url: string;
    label: string;
    active: boolean;
  };
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export enum MatchJoinType {
  TEAM = 'team',
  OPEN = 'ffa',
}

export enum MatchVisibility {
  PUBLIC,
  PRIVATE,
}

export interface MatchCreatePayload {
  type: string;
  isRated: boolean;
  isPublic: boolean;
  bet: number;
  playersAmount: number;
  lat: number;
  long: number;
}
