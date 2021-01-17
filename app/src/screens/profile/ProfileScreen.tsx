import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { useUserMatchHistoryQuery } from '../../hooks/useUserMatchHistoryQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { MatchElementInHistory } from '../../types/match';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();
  const matchHistory = useUserMatchHistoryQuery({ page: 1 });
  const [isLoading, setLoading] = useState(true);

  const matchHistoryList = useMemo(() => {
    const initialLoad =
      (matchHistory.isFetching || matchHistory.isError) &&
      !matchHistory.isFetchingNextPage;

    if (initialLoad) {
      setLoading(true);
      return [];
    }

    setLoading(false);

    return matchHistory.data!.pages.reduce((list, page) => {
      return [...list, ...page.data];
    }, [] as MatchElementInHistory[]);
  }, [
    matchHistory.isFetching,
    matchHistory.isError,
    matchHistory.isFetchingNextPage,
    matchHistory.data,
    matchHistory.data?.pages,
  ]);

  return (
    <ContainerWithAvatar
      avatar={{ uri: profile?.data?.versioned_avatar }}
      isLoading={profile.isFetching}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: {profile.data?.elo}</AppText>
      </View>
      {!isLoading ? (
        <MatchHistoryList
          onListEndReached={() => {
            if (matchHistory.hasNextPage) {
              matchHistory.fetchNextPage();
            }
          }}
          matchHistory={matchHistoryList}
        />
      ) : (
        <ListPlaceholder placeholderCount={5} />
      )}
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
