import { LatLng, WeightedLatLng } from 'react-native-maps';

export interface MapViewProps {
  heatPoints: WeightedLatLng[];
  markers: LatLng[];
}
