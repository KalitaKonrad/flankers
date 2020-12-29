import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ScreenContent: React.FC = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
