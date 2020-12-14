import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { ActivityIndicator } from 'react-native-paper';

import { theme } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamLoadingScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamLoadingScreen: React.FC<TeamLoadingScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
