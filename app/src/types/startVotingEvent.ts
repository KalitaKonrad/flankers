import { Game } from './game';

export interface StartVotingEvent {
  game: Game;
  timer: number;
}
