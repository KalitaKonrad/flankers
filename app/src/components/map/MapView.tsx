import React, { useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, { Heatmap, Marker, WeightedLatLng } from 'react-native-maps';

interface MapViewProps {
  heatPoints: WeightedLatLng[];
  markers: any[];
}
/* TODO: display markers od matches */
export const MapViewComponent: React.FC<MapViewProps> = (props) => {
  const [mapPoints, setMapPoints] = useState();
  const [markers, setMarkers] = useState([]);

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
          style={styles.mapStyle}>
          <Heatmap points={props.heatPoints} />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
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
