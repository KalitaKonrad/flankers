import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LatLng } from 'react-native-maps';

import { MatchLocationSelectMap } from '../../components/map/MatchLocationSelectMap.native';
import { AppButton } from '../../components/shared/AppButton';
import { useMatchCreateMutation } from '../../hooks/useMatchCreateMutation';
import { MatchScreenStackParamList } from './MatchScreenStack';

interface Coordinates {
  latitude: number;
  longitude: number;
}

type MatchCreateSelectLocationScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchLocation'
> &
  Coordinates;

export const MatchCreateSelectLocationScreen: React.FC<MatchCreateSelectLocationScreenProps> = ({
  navigation,
  route,
}) => {
  const [matchLocation, setMatchLocation] = useState<LatLng | null>(null);

  const { type, isRated, isPublic, bet, playersAmount } = route.params;
  const [mutate, mutation] = useMatchCreateMutation();

  const onPress = () => {
    if (matchLocation !== null) {
      mutate({
        type,
        isRated,
        isPublic,
        bet,
        playersAmount,
        lat: matchLocation.latitude,
        long: matchLocation.longitude,
      });
      navigation.push('MatchInLobby');
    }
  };

  return (
    <View style={styles.container}>
      <MatchLocationSelectMap
        onLocationSelected={(location) => setMatchLocation(location)}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          mode="contained"
          onPress={() => {
            console.log(
              `przeslij coordinaty meczu ${matchLocation?.longitude} | ${matchLocation?.latitude}`
            );
            navigation.push('MatchInLobby');
          }}>
          Potwierdź lokalizacje
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
