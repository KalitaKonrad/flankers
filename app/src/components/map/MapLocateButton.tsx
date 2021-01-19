import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { IconButton } from 'react-native-paper';

interface MapLocateButtonProps {
  mapRef: MapView | null;
}

export const MapLocateButton: React.FC<MapLocateButtonProps> = ({ mapRef }) => {
  const onPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Accuracy.Highest,
      });

      if (mapRef) {
        mapRef.animateCamera({
          center: {
            longitude,
            latitude,
          },
        });
      }
    } else {
      alert(
        'Nie udzielono zezwolenia na dostęp do lokalizacji. Nie możemy przenieść Cie do Twojej aktualnej pozycji.'
      );
    }
  };

  return (
    <IconButton
      style={styles.button}
      accessibilityTraits=""
      accessibilityComponentType=""
      icon="crosshairs-gps"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    elevation: 1,
    backgroundColor: '#fff',
  },
});
