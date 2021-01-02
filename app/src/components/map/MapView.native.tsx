import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, {
  Heatmap,
  LatLng,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import { MapViewProps } from '../../types/mapViewComponentProps';

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const MapViewComponent: React.FC<MapViewProps> = ({
  markers: initialMarkers,
  heatPoints,
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [markers, setMarkers] = useState<LatLng[]>(initialMarkers);
  const [marginFix, setMarginFix] = useState(1);

  const onMapReady = async () => {
    setMarginFix(0);
  };

  const onLocatePress = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Accuracy.Highest,
      });

      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            longitude,
            latitude,
          },
        });
      }
    } else {
      alert(
        'Nie udzielono zezwolenia na dostęp do lokalizacji. Nie możemy przenieść Cie do Twojej aktualnej pozycji.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <IconButton
        style={styles.locationButton}
        icon="crosshairs-gps"
        onPress={onLocatePress}
      />
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill, { padding: marginFix }]}
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
  locationButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 1,
    backgroundColor: '#fff',
  },
});
