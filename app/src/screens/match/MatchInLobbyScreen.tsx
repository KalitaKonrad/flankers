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
  USER_CHANGED_SQUAD_EVENT,
  USER_JOINED_SQUAD_EVENT,
} from '../../const/events.const';
import { useAddUserToGameSquadMutation } from '../../hooks/useAddUserToGameSquadMutation';
import { useEcho } from '../../hooks/useEcho';
import { useGameDetailsQuery } from '../../hooks/useGameDetailsQuery';
import { useMoveMemberToAnotherSquadMutation } from '../../hooks/useMoveMemberToAnotherSquadMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import {
  UserChangedSquadsEvent,
  UserJoinedSquadEvent,
} from '../../types/UserJoinedSquadEvent';
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
    UserProfilePayload[]
  >();
  const [secondTeamPlayersList, setSecondTeamPlayersList] = useState<
    UserProfilePayload[]
  >();

  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  const [isUserAllowedToChangeSquad, setIsUserAllowedToChangeSquad] = useState(
    true
  );

  const unlockChangingSquads = () => {
    setTimeout(() => {
      setIsUserAllowedToChangeSquad(true);
    }, 30000);
  };

  const { echo, isReady: isEchoReady } = useEcho();

  const onGameUpdated = useCallback((event: GameUpdateEvent) => {
    console.log('===> Received GameUpdateEvent');
    console.log(event);
  }, []);

  const onUserChangedSquad = useCallback((event: UserChangedSquadsEvent) => {
    console.log('===> Received UserChangedSquadEvent');
    console.log(event);
    setFirstTeamPlayersList(event.squads[0].members);
    setSecondTeamPlayersList(event.squads[1].members);
  }, []);

  const onUserJoinedSquad = useCallback((event: UserJoinedSquadEvent) => {
    console.log('===> Received UserJOINEDSquadEvent');
    console.log(event);
    setFirstTeamPlayersList(event.squad.members);
  }, []);

  useEffect(() => {
    console.log('++++++++> ', route.params.gameId);
    const channel = `games.${route.params.gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_UPDATE_EVENT, onGameUpdated);
      echo
        ?.channel(channel)
        .listen(USER_CHANGED_SQUAD_EVENT, onUserChangedSquad);
      echo?.channel(channel).listen(USER_JOINED_SQUAD_EVENT, onUserJoinedSquad);
    }

    return () => {
      echo?.channel(channel).stopListening(GAME_UPDATE_EVENT, onGameUpdated);
      echo
        ?.channel(channel)
        .stopListening(USER_CHANGED_SQUAD_EVENT, onUserChangedSquad);
      echo
        ?.channel(channel)
        .stopListening(USER_JOINED_SQUAD_EVENT, onUserJoinedSquad);
    };
  }, [
    echo,
    isEchoReady,
    onGameUpdated,
    onUserChangedSquad,
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
