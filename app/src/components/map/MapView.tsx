import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, {
  Heatmap,
  LatLng,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';

import { MatchResponse } from '../../types/matchResponse';

interface MapViewProps {
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
  const [heatPointsArray, setHeatPointsArray] = useState<WeightedLatLng[]>();
  const onMarkerPress = (match: MatchResponse) => {
    props.onMarkerPress(match);
  };

  useEffect(() => {
    props.matchList.map((match) => {
      setHeatPointsArray([
        ...{
          latitude: parseFloat(match.lat),
          longitude: parseFloat(match.long),
        },
      ]);
    });
  });

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={initialRegion}
          style={styles.mapStyle}
          showsUserLocation>
          <Heatmap points={props.matchList.map((match) => {})} />

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
