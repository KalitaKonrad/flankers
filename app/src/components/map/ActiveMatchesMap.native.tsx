import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Heatmap, Marker, WeightedLatLng } from 'react-native-maps';

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
  const [marginFix, setMarginFix] = useState(1);

  const onMapReady = () => {
    setMarginFix(0);
  };
  const onMarkerPress = (match: MatchResponse) => {
    props.onMarkerPress(match);
  };

  const publicMatches = useMemo(() => {
    return props.matchList.filter((match) => {
      return match.public;
    });
  }, [props.matchList]);

  const heatMapPoints = useMemo(() => {
    return publicMatches.map((match) => {
      return {
        latitude: match.lat,
        longitude: match.long,
      };
    });
  }, [publicMatches]);

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
        <Heatmap points={heatMapPoints} />

        {publicMatches?.map((match) => {
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
