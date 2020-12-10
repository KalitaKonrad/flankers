import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, {
  Heatmap,
  LatLng,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';

interface MapViewProps {
  heatPoints: WeightedLatLng[];
  markers: LatLng[];
}

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const MapViewComponent: React.FC<MapViewProps> = (props) => {
  const [markers, setMarkers] = useState<LatLng[]>([]);

  useEffect(() => {
    setMarkers(props.markers);
  }, [props.markers]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={initialRegion}
          style={styles.mapStyle}
          showsUserLocation>
          <Heatmap points={props.heatPoints} />

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
