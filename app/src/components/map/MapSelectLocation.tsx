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

interface MapSelectLocationProps {}

export const MapSelectLocation: React.FC<MapSelectLocationProps> = (props) => {
  // const [markerPosition, setMarkerPosition] = useState<AnimatedRegion>({});
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const handlePress = (event: MapEvent) => {
    setMarkers([...markers, event.nativeEvent.coordinate]);
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
          {markers.map((marker) => {
            return <Marker key={JSON.stringify(marker)} coordinate={marker} />;
          })}
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
