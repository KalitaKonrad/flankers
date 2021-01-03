import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {
  Heatmap,
  LatLng,
  Marker,
  WeightedLatLng,
} from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import { ActiveMatchesMapProps } from '../../types/activeMatchesMapComponentProps';
import { MatchResponse } from '../../types/matchResponse';
import { MapLocateButton } from './MapLocateButton';

const initialRegion = {
  latitude: 50.068607,
  longitude: 19.90621,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

export const ActiveMatchesMap: React.FC<ActiveMatchesMapProps> = (props) => {
  const mapRef = useRef<MapView | null>(null);
  // const [markers, setMarkers] = useState<LatLng[]>(initialMarkers);
  const [heatPointsArray, setHeatPointsArray] = useState<WeightedLatLng[]>();
  const [marginFix, setMarginFix] = useState(1);

  const onMapReady = () => {
    setMarginFix(0);
  };
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
    <View style={styles.container}>
      <MapLocateButton mapRef={mapRef.current} />
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        style={[StyleSheet.absoluteFill, { marginBottom: marginFix }]}
        showsMyLocationButton={false}
        showsUserLocation
        onMapReady={onMapReady}>
        {heatPointsArray !== undefined && <Heatmap points={heatPointsArray} />}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
