import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import {
  GAME_UPDATE_EVENT,
  SQUAD_MEMBERS_CHANGED_EVENT,
} from '../../const/events.const';
import { useGameDetailsQuery } from '../../hooks/game/useGameDetailsQuery';
import { useMoveMemberToAnotherSquadMutation } from '../../hooks/match/useMoveMemberToAnotherSquadMutation';
import { useAlert } from '../../hooks/useAlert';
import { useAxios } from '../../hooks/useAxios';
import { useEcho } from '../../hooks/useEcho';
import { useShare } from '../../hooks/useShare';
import { useAddUserToGameSquadMutation } from '../../hooks/user/useAddUserToGameSquadMutation';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
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
  const mutateJoinSquad = useAddUserToGameSquadMutation();
  const mutateChangeSquad = useMoveMemberToAnotherSquadMutation();
  const matchDetails = useGameDetailsQuery(route.params.gameId);
  const { share } = useShare();

  const axios = useAxios();
  const { showAlert } = useAlert();

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
  const [timeoutId, setTimeoutId] = useState<number>();
  const [isPending, setPending] = useState(false);

  const unlockChangingSquads = () => {
    const timeoutId = window.setTimeout(() => {
      setIsUserAllowedToChangeSquad(true);
    }, 30000);
    setTimeoutId(timeoutId);
  };

  const { echo, isReady: isEchoReady } = useEcho();

  const onGameUpdated = useCallback(
    (event: GameUpdateEvent) => {
      navigation.navigate('MatchInProgress', {
        gameId: event.game.id,
        firstSquadId: matchDetails.data?.squads[0].id,
        secondSquadId: matchDetails.data?.squads[1].id,
        firstTeamPlayersList,
        secondTeamPlayersList,
        ownerId: matchDetails.data?.owner_id,
      });
    },
    [
      firstTeamPlayersList,
      matchDetails.data?.owner_id,
      matchDetails.data?.squads,
      navigation,
      secondTeamPlayersList,
    ]
  );

  const onSquadMembersChanged = useCallback(
    (event: SquadMembersChangedEvent) => {
      if (matchDetails.data?.squads[0].id === event.squad.id) {
        setFirstTeamPlayersList(event.squad.members);
      } else if (matchDetails.data?.squads[1].id === event.squad.id) {
        setSecondTeamPlayersList(event.squad.members);
      } else {
        showAlert('Ups', 'Nie udało się zaktualizować drużyn');
      }
    },
    [matchDetails.data?.squads, showAlert]
  );

  useEffect(() => {
    setFirstTeamPlayersList(matchDetails.data?.squads[0].members);
    setSecondTeamPlayersList(matchDetails.data?.squads[1].members);
  }, [matchDetails.data?.squads]);

  useEffect(() => {
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
    matchDetails.data?.squads,
    onGameUpdated,
    onSquadMembersChanged,
    route.params.gameId,
  ]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const gameOwnerId = matchDetails.data?.owner_id === profile.data?.id;

  const onStartMatch = async () => {
    setPending(true);
    try {
      await axios.put(`games/${route.params.gameId}`, {
        command: {
          start_game: true,
        },
      });
    } catch (e) {
      showAlert('Ups', 'Wystąpił błąd podczas próby wystartowania gry');
    }
  };

  const onJoinSquad = async (squadIndex: number) => {
    if (
      profile.data?.id === undefined ||
      matchDetails.data?.squads[squadIndex].id === undefined
    ) {
      showAlert('Ups', 'Wystąpił błąd podczas dołączania do składu');
      return;
    }

    if (currentSquad === squadIndex) {
      showAlert('Ups', 'Jesteś przypisany do tego składu');
      return;
    }

    if (!isUserAllowedToChangeSquad) {
      showAlert('Ups', 'Musi upłynąć 30 sekund od ostatniej zmiany składu');
      return;
    }

    if (
      matchDetails.isFetched &&
      matchDetails.data.squads[squadIndex].is_full
    ) {
      showAlert('Ups', 'Skład jest pełny');
      return;
    }

    if (currentSquad == null) {
      try {
        await mutateJoinSquad.mutateAsync({
          user_id: profile?.data?.id,
          squad_id: matchDetails.data?.squads[squadIndex].id,
        });
        setCurrentSquad(squadIndex === 0 ? Squad.A : Squad.B);
        setIsUserAllowedToChangeSquad(false);
        unlockChangingSquads();
      } catch (error) {
        showAlert('Ups', 'Wystąpił błąd podczas dołączania do składu');
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
        await mutateChangeSquad.mutateAsync({
          user_id: profile?.data?.id,
          squad_id: actualSquadId,
          new_squad_id: newSquadId,
        });
        setCurrentSquad(squadIndex === 0 ? Squad.A : Squad.B);
        setIsUserAllowedToChangeSquad(false);
        unlockChangingSquads();
      } catch (error) {
        showAlert('Ups', 'Wystąpił błąd podaczas dołączania do składu');
      }
    }
  };

  const onShareCode = () => {
    if (matchDetails?.data?.invite?.code === undefined) {
      showAlert('Ups', 'Udostępnionianie nie powiodło się');
      return;
    }
    share(matchDetails.data.invite.code);
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
        <View style={styles.gameCode}>
          <View>
            <AppText
              style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
              Kod gry: {matchDetails?.data?.invite?.code}
            </AppText>
          </View>
          <IconButton
            accessibilityComponentType=""
            accessibilityTraits=""
            icon="share-variant"
            color={theme.colors.white}
            size={28}
            onPress={onShareCode}
          />
        </View>
        {gameOwnerId && (
          <View style={styles.action}>
            <AppButton
              loading={isPending}
              disabled={isPending}
              mode="contained"
              onPress={() => onStartMatch()}>
              Rozpocznij mecz
            </AppButton>
          </View>
        )}
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
    height: 150,
  },
  title: {
    borderBottomColor: theme.colors.darkGray,
  },
  action: {
    marginTop: 32,
  },
  joinBtn: {},
  joinBtnContentStyle: {
    height: 45,
    width: 122,
  },
  teamLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  gameCode: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
  },
});
