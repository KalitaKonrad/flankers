export interface Match {
  header: string;
  comment: string;
  date: Date;
}

export enum MatchJoinType {
  TEAM,
  OPEN,
}

export enum MatchVisibility {
  PUBLIC,
  PRIVATE,
}
