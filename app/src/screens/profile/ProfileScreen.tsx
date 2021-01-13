import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();

  return (
    <ContainerWithAvatar avatar={{ uri: profile.data?.versioned_avatar }}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.name}</AppText>
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
