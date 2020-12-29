import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';

interface MapSelectLocationProps {
  onMarkerPlaced: (arg: LatLng) => void;
}

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const MapSelectLocation: React.FC<MapSelectLocationProps> = (props) => {
  const [markerC, setMarkerC] = useState<LatLng>();

  const handlePress = (event: MapEvent) => {
    setMarkerC(event.nativeEvent.coordinate);
    props.onMarkerPlaced(event.nativeEvent.coordinate);
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={initialRegion}
          style={styles.mapStyle}
          showsUserLocation
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