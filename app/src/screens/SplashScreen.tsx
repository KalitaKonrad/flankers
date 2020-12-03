import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.splash}>
      <Text style={styles.title}>Flankers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
  },
});
