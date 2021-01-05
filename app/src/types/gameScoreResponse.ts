export interface GameScoreResponse {
  message: string;
  data: {
    scores: {
      squadAId: number;
      squadBId: number;
    };
    winners: number[];
    tie: boolean;
  };
}
