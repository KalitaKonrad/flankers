import { MatchResponse } from './matchResponse';

export interface ActiveMatchesMapProps {
  matchList: MatchResponse[];
  onMarkerPress: (match: MatchResponse) => void;
}
