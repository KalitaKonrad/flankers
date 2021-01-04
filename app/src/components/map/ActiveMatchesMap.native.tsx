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
  const [heatPointsArray, setHeatPointsArray] = useState<WeightedLatLng[]>();
  const [publicMatchesArray, setPublicMatchesArray] = useState<
    MatchResponse[]
  >();
  const [marginFix, setMarginFix] = useState(1);

  const onMapReady = () => {
    setMarginFix(0);
  };
  const onMarkerPress = (match: MatchResponse) => {
    props.onMarkerPress(match);
  };

  useEffect(() => {
    const publicMatches = props.matchList.filter((match) => {
      return match.public;
    });
    setPublicMatchesArray(publicMatches);
  }, [props.matchList]);

  useMemo(() => {
    setHeatPointsArray(
      publicMatchesArray?.map((match) => {
        return {
          latitude: match.lat,
          longitude: match.long,
        };
      })
    );
  }, [publicMatchesArray]);

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

        {publicMatchesArray?.map((match) => {
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
