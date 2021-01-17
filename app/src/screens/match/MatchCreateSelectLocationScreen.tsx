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
  const isLocationSelected = matchLocation !== null;
  const { mutateAsync } = useMatchCreateMutation();

  const onPress = async () => {
    if (!matchLocation) {
      return;
    }

    try {
      await mutateAsync(
        {
          ...route.params,
          lat: matchLocation.latitude,
          long: matchLocation.longitude,
        },
        {
          onSuccess: (data) => {
            navigation.push('MatchInLobby', { gameId: data.id });
          },
        }
      );
    } catch (error) {
      alert('Wystąpił błąd podczas tworzenia meczu');
    }
  };

  return (
    <View style={styles.container}>
      <MatchLocationSelectMap
        onLocationSelected={(location) => setMatchLocation(location)}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          disabled={!isLocationSelected}
          style={!isLocationSelected ? { backgroundColor: '#bababa' } : {}}
          mode="contained"
          onPress={onPress}>
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
