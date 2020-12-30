import { LatLng } from 'react-native-maps';

export interface MapSelectLocationProps {
  onMarkerPlaced: (arg: LatLng) => void;
}
