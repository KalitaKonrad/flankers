import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
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

const mock: MatchElementInHistory[] = [
  { winner: true, id: 1 },
  { winner: false, id: 2 },
  { winner: false, id: 3 },
  { winner: false, id: 4 },
  { winner: false, id: 5 },
  { winner: false, id: 6 },
  { winner: false, id: 7 },
  { winner: false, id: 8 },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const profile = useUserProfileQuery();
  const matchHistory = useUserMatchHistoryQuery();

  if (matchHistory.data !== undefined)
    console.log(matchHistory.data[0].current_page);

  return (
    <ContainerWithAvatar avatar={{ uri: profile.data?.versioned_avatar }}>
      <View style={styles.meta}>
        <AppText variant="h1">{profile.data?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: 2000</AppText>
      </View>
      <View style={{ paddingBottom: 180 }}>
        {matchHistory.data?.[0].data !== undefined && (
          <MatchHistoryList
            onListEnd={() => {
              console.log('KONIECCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCccc');
              matchHistory
                .fetchMore()
                .then((r) =>
                  console.log(
                    'FETCH MOREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE'
                  )
                );
            }}
            // matchHistory={matchHistory.data[0].data}
            matchHistory={matchHistory.data[0].data}
          />
        )}
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
