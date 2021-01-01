import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { AppText } from '../../components/shared/AppText';
import { MatchHistoryList } from '../../components/shared/MatchHistoryList';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = object &
  StackScreenProps<ProfileScreenStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { data } = useUserProfileQuery();

  return (
    <ContainerWithAvatar avatar={require('../../../assets/avatar.png')}>
      <View style={styles.meta}>
        <AppText variant="h1">{data?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: 2000</AppText>
      </View>
      <MatchHistoryList matchHistory={[]} />
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
