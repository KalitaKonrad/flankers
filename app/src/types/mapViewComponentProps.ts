import { LatLng, WeightedLatLng } from 'react-native-maps';

export interface ActiveMatchesMapProps {
  heatPoints: WeightedLatLng[];
  markers: LatLng[];
}
