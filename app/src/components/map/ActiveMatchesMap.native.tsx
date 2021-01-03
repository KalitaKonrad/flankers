import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Heatmap, LatLng, Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import { ActiveMatchesMapProps } from '../../types/mapViewComponentProps';
import { MapLocateButton } from './MapLocateButton';

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const ActiveMatchesMap: React.FC<ActiveMatchesMapProps> = ({
  markers: initialMarkers,
  heatPoints,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [markers, setMarkers] = useState<LatLng[]>(initialMarkers);
  const [marginFix, setMarginFix] = useState(1);

  const onMapReady = () => {
    setMarginFix(0);
  };

  return (
    <View style={styles.container}>
      <MapLocateButton mapRef={mapRef.current} />
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill, { marginBottom: marginFix }]}
        showsMyLocationButton={false}
        showsUserLocation
        onMapReady={onMapReady}>
        <Heatmap points={heatPoints} />

        {markers.map((marker) => {
          return (
            <Marker
              key={JSON.stringify(marker)}
              coordinate={marker}
              onPress={() => console.log('wybrano')} //w przyszlosci po wybraniu pojawia sie ModalComponent
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
