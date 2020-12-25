import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';

import { MatchResponse } from '../../types/matchResponse';

interface MapViewProps {
  // heatPoints: WeightedLatLng[];
  // markers: LatLng[] | undefined;
  matchList: MatchResponse[];
  onMarkerPress: (arg: MatchResponse) => void;
}

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const MapViewComponent: React.FC<MapViewProps> = (props) => {
  const [markers, setMarkers] = useState<LatLng[]>([]);

  // useEffect(() => {
  //   if (props.markers !== undefined) {
  //     setMarkers(props.markers);
  //   }
  // }, [props.markers]);

  const onMarkerPress = (match: MatchResponse) => {
    props.onMarkerPress(match);
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={initialRegion}
          style={styles.mapStyle}
          showsUserLocation>
          {/*<Heatmap points={props.heatPoints} />*/}

          {props.matchList.map((match) => {
            return (
              <Marker
                coordinate={{
                  latitude: parseFloat(match.lat),
                  longitude: parseFloat(match.long),
                }}
                key={JSON.stringify(match.id)}
                onPress={() => onMarkerPress(match)}
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
