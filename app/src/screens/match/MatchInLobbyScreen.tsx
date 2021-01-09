import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import App from '../../../App';
import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import {
  GAME_UPDATE_EVENT,
  USER_JOINED_SQUAD_EVENT,
} from '../../const/events.const';
import { useAddUserToGameSquadMutation } from '../../hooks/useAddUserToGameSquadMutation';
import { useEcho } from '../../hooks/useEcho';
import { useGameDetailsQuery } from '../../hooks/useGameDetailsQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import { UserJoinedSquadEvent } from '../../types/UserJoinedSquadEvent';
import { GameUpdateEvent } from '../../types/gameUpdateEvent';
import { UserProfilePayload } from '../../types/userProfilePayload';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInLobbyScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchInLobby'
>;

export interface MatchInLobbyScreenRouteParams {
  gameId: number;
}

export const MatchInLobbyScreen: React.FC<MatchInLobbyScreenProps> = ({
  route,
  navigation,
}) => {
  const profile = useUserProfileQuery();
  const [mutateJoinSquad, mutationJoinSquad] = useAddUserToGameSquadMutation();
  const matchDetails = useGameDetailsQuery(route.params.gameId);

  const [firstTeamPlayersList, setFirstTeamPlayersList] = useState<
    UserProfilePayload[]
  >();
  const [secondTeamPlayersList, setSecondTeamPlayersList] = useState<
    UserProfilePayload[]
  >();

  // const mockPlayerList = useMemo(() => {
  //   if (profile.isSuccess) {
  //     return Array(5)
  //       .fill(profile.data)
  //       .map((profile, i) => ({ ...profile, id: i }));
  //   }
  //   return [];
  // }, [profile.data, profile.isSuccess]);

  const { echo, isReady: isEchoReady } = useEcho();

  const onGameUpdated = useCallback((event: GameUpdateEvent) => {
    console.log('===> Received GameUpdateEvent');
    console.log(event);
  }, []);

  const onUserJoinedSquad = useCallback(
    (event: UserJoinedSquadEvent) => {
      console.log('===> Received UserJoinedSquadEvent');
      console.log(event);
      setFirstTeamPlayersList(matchDetails.data?.squads[0].members);
      setSecondTeamPlayersList(matchDetails.data?.squads[1].members);
    },
    [matchDetails.data?.squads]
  );

  useEffect(() => {
    const channel = `games.${route.params.gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_UPDATE_EVENT, onGameUpdated);
      echo?.channel(channel).listen(USER_JOINED_SQUAD_EVENT, onUserJoinedSquad);
    }

    return () => {
      echo?.channel(channel).stopListening(GAME_UPDATE_EVENT, onGameUpdated);
      echo
        ?.channel(channel)
        .stopListening(USER_JOINED_SQUAD_EVENT, onUserJoinedSquad);
    };
  }, [
    echo,
    isEchoReady,
    onGameUpdated,
    onUserJoinedSquad,
    route.params.gameId,
  ]);

  const onJoin = async () => {
    if (profile.data?.id === undefined) {
      alert('Wystąpił błąd podczas dołączania do składu');
      return;
    }
    try {
      await mutateJoinSquad({
        user_id: profile?.data?.id,
        squad_id: route.params.gameId,
      });
    } catch (error) {
      alert('Wystąpił błąd podaczas dołączania do składu');
    }
  };

  return (
    <Container>
      <PaddedInputScrollView style={styles.container}>
        <View style={styles.row}>
          <View style={styles.teamLabel}>
            <AppText variant="h2" style={styles.title}>
              Zespół A
            </AppText>
            <AppButton
              style={styles.joinBtn}
              mode="contained"
              onPress={onJoin}
              contentStyle={styles.joinBtnContentStyle}>
              Dołącz
            </AppButton>
          </View>
          {firstTeamPlayersList !== undefined && (
            <PlayerAvatarList players={firstTeamPlayersList} />
          )}
        </View>
        <View style={styles.row}>
          <View style={styles.teamLabel}>
            <AppText variant="h2" style={styles.title}>
              Zespół B
            </AppText>
            <AppButton
              style={styles.joinBtn}
              mode="contained"
              onPress={onJoin}
              contentStyle={styles.joinBtnContentStyle}>
              Dołącz
            </AppButton>
          </View>
          {secondTeamPlayersList !== undefined && (
            <PlayerAvatarList players={secondTeamPlayersList} />
          )}
        </View>
        <View style={styles.action}>
          <AppButton
            mode="contained"
            onPress={() => navigation.navigate('MatchInProgress')}>
            Rozpocznij mecz
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  row: {
    marginBottom: 28,
  },
  title: {
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  action: {
    marginTop: 32,
  },
  joinBtn: {
    marginBottom: 24,
  },
  joinBtnContentStyle: {
    height: 45,
    width: 122,
  },
  teamLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
