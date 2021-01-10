import { LatLng, WeightedLatLng } from 'react-native-maps';

import { MatchResponse } from './matchResponse';

export interface ActiveMatchesMapProps {
  matchList: MatchResponse[];
  onMarkerPress: (match: MatchResponse) => void;
}
