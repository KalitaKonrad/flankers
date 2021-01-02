import { LatLng } from 'react-native-maps';

export interface MapLocationSelectMapProps {
  onLocationSelected: (location: LatLng) => void;
}
