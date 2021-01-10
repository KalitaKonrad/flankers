import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import {
  GAME_UPDATE_EVENT,
  SQUAD_MEMBERS_CHANGED_EVENT,
} from '../../const/events.const';
import { useAddUserToGameSquadMutation } from '../../hooks/useAddUserToGameSquadMutation';
import { useEcho } from '../../hooks/useEcho';
import { useGameDetailsQuery } from '../../hooks/useGameDetailsQuery';
import { useMoveMemberToAnotherSquadMutation } from '../../hooks/useMoveMemberToAnotherSquadMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import { SquadMembersChangedEvent } from '../../types/UserJoinedSquadEvent';
import { GameUpdateEvent } from '../../types/gameUpdateEvent';
import { MembersPayload } from '../../types/squadResponse';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInLobbyScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchInLobby'
>;

export interface MatchInLobbyScreenRouteParams {
  gameId: number;
}

enum Squad {
  A,
  B,
}

export const MatchInLobbyScreen: React.FC<MatchInLobbyScreenProps> = ({
  route,
  navigation,
}) => {
  const profile = useUserProfileQuery();
  const [mutateJoinSquad, mutationJoinSquad] = useAddUserToGameSquadMutation();
  const [
    mutateChangeSquad,
    mutationChangeSquad,
  ] = useMoveMemberToAnotherSquadMutation();
  const matchDetails = useGameDetailsQuery(route.params.gameId);

  const [firstTeamPlayersList, setFirstTeamPlayersList] = useState<
    MembersPayload[] | undefined
  >(matchDetails.data?.squads[0].members);
  const [secondTeamPlayersList, setSecondTeamPlayersList] = useState<
    MembersPayload[] | undefined
  >(matchDetails.data?.squads[1].members);

  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  const [isUserAllowedToChangeSquad, setIsUserAllowedToChangeSquad] = useState(
    true
  );

  const unlockChangingSquads = () => {
    setTimeout(() => {
      setIsUserAllowedToChangeSquad(true);
    }, 3000);
  };

  const { echo, isReady: isEchoReady } = useEcho();

  const onGameUpdated = useCallback((event: GameUpdateEvent) => {
    console.log('===> Received GameUpdateEvent');
    console.log(event);
  }, []);

  const onSquadMembersChanged = useCallback(
    (event: SquadMembersChangedEvent) => {
      if (matchDetails.data?.squads[0].id === event.squad.id) {
        setFirstTeamPlayersList(event.squad.members);
      } else if (matchDetails.data?.squads[1].id === event.squad.id) {
        setSecondTeamPlayersList(event.squad.members);
      } else {
        alert('Nie udało się zaktualizować drużyn');
      }
    },
    [matchDetails.data?.squads]
  );

  useEffect(() => {
    setFirstTeamPlayersList(matchDetails.data?.squads[0].members);
    setSecondTeamPlayersList(matchDetails.data?.squads[1].members);

    const channel = `games.${route.params.gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_UPDATE_EVENT, onGameUpdated);
      echo
        ?.channel(channel)
        .listen(SQUAD_MEMBERS_CHANGED_EVENT, onSquadMembersChanged);
    }

    return () => {
      echo?.channel(channel).stopListening(GAME_UPDATE_EVENT, onGameUpdated);
      echo
        ?.channel(channel)
        .stopListening(SQUAD_MEMBERS_CHANGED_EVENT, onSquadMembersChanged);
    };
  }, [
    echo,
    isEchoReady,
    onGameUpdated,
    onSquadMembersChanged,
    route.params.gameId,
  ]);

  const onJoinSquad = async (squadIndex: number) => {
    if (
      profile.data?.id === undefined ||
      matchDetails.data?.squads[squadIndex].id === undefined
    ) {
      alert('Wystąpił błąd podczas dołączania do składu');
      return;
    }

    if (currentSquad === squadIndex) {
      alert('Jesteś przypisany do tego składu');
      return;
    }

    if (!isUserAllowedToChangeSquad) {
      alert('Musi upłynąć 30 sekund od ostatniej zmiany składu');
      return;
    }

    if (currentSquad == null) {
      try {
        await mutateJoinSquad({
          user_id: profile?.data?.id,
          squad_id: matchDetails.data?.squads[squadIndex].id,
        });
        setCurrentSquad(squadIndex === 0 ? Squad.A : Squad.B);
        setIsUserAllowedToChangeSquad(false);
        unlockChangingSquads();
      } catch (error) {
        alert('Wystąpił błąd podaczas dołączania do składu');
      }
    } else {
      try {
        const newSquadId =
          squadIndex === 1
            ? matchDetails.data.squads[1].id
            : matchDetails.data.squads[0].id;
        const actualSquadId =
          squadIndex === 1
            ? matchDetails.data.squads[0].id
            : matchDetails.data.squads[1].id;
        await mutateChangeSquad({
          user_id: profile?.data?.id,
          squad_id: actualSquadId,
          new_squad_id: newSquadId,
        });
        setCurrentSquad(squadIndex === 0 ? Squad.A : Squad.B);
        setIsUserAllowedToChangeSquad(false);
        unlockChangingSquads();
      } catch (error) {
        alert('Wystąpił błąd podaczas dołączania do składu');
      }
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
              onPress={() => onJoinSquad(0)}
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
              onPress={() => onJoinSquad(1)}
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
