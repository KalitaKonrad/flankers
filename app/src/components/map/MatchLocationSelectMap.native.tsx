import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';

import { MapLocationSelectMapProps } from '../../types/mapSelectLocationComponentProps';
import { MapLocateButton } from './MapLocateButton';

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const MatchLocationSelectMap: React.FC<MapLocationSelectMapProps> = ({
  onLocationSelected,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [matchLocation, setMatchLocation] = useState<LatLng | null>(null);
  const [marginFix, setMarginFix] = useState(1);

  const onMapPress = (event: MapEvent) => {
    const { coordinate } = event.nativeEvent;
    setMatchLocation(coordinate);
    onLocationSelected(coordinate);
  };

  const onMapReady = () => {
    setMarginFix(0);
  };

  return (
    <View style={styles.container}>
      <MapLocateButton mapRef={mapRef.current} />
      <MapView
        ref={mapRef}
        provider="google"
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill, { marginBottom: marginFix }]}
        showsUserLocation
        showsCompass={false}
        showsMyLocationButton={false}
        zoomTapEnabled={false}
        onPress={onMapPress}
        onMapReady={onMapReady}>
        {matchLocation && <Marker coordinate={matchLocation} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
