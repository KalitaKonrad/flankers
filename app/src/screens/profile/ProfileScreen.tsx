import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { useUserMatchHistoryQuery } from '../../hooks/useUserMatchHistoryQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { MatchElementInHistory } from '../../types/match';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();
  const matchHistory = useUserMatchHistoryQuery({ page: 1 });
  const matchHistoryList = useMemo(() => {
    if (
      (matchHistory.isFetching || matchHistory.isError) &&
      !matchHistory.isFetchingNextPage
    ) {
      return [];
    }
    return matchHistory.data!.pages.reduce((list, page) => {
      return [...list, ...page.data];
    }, [] as MatchElementInHistory[]);
  }, [matchHistory]);

  return (
    <ContainerWithAvatar avatar={{ uri: profile.data?.versioned_avatar }}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: 2000</AppText>
      </View>
      <View style={{ paddingBottom: 180 }}>
        <MatchHistoryList
          onListEndReached={() => {
            if (matchHistory.hasNextPage) {
              matchHistory.fetchNextPage();
            }
          }}
          matchHistory={matchHistoryList}
        />
      </View>
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
