import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, {
  Heatmap,
  LatLng,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';
import { number } from 'yup';

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
    setHeatPointsArray(
      props.matchList.map((match) => {
        return {
          latitude: match.lat,
          longitude: match.long,
        };
      })
    );
  }, [props.matchList]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={initialRegion}
          style={styles.mapStyle}
          showsUserLocation>
          {heatPointsArray !== undefined && (
            <Heatmap points={heatPointsArray} />
          )}

          {props.matchList.map((match) => {
            if (match.lat === null || match.long === null) {
              return <></>;
            }
            return (
              <Marker
                coordinate={{
                  latitude: match.lat,
                  longitude: match.long,
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
