import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Container: React.FC = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
