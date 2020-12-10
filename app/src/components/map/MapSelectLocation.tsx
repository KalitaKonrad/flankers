/* TODO: view current location at send back coordinates of given marker*/

import React, { useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Heatmap,
  LatLng,
  MapEvent,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';

interface MapSelectLocationProps {
  onMarkerPlaced: (arg: LatLng) => void;
}

export const MapSelectLocation: React.FC<MapSelectLocationProps> = (props) => {
  const [markerC, setMarkerC] = useState<LatLng>();

  const handlePress = (event: MapEvent) => {
    setMarkerC(event.nativeEvent.coordinate);
    props.onMarkerPlaced({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 50.068607,
            longitude: 19.90621,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          style={styles.mapStyle}
          onPress={handlePress}>
          {markerC && <Marker coordinate={markerC} />}
        </MapView>
      </View>
    </>
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
