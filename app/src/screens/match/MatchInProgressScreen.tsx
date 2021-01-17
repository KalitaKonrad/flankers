import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { Timer } from '../../components/shared/Timer';
import { Modal } from '../../components/shared/modal/Modal';
import {
  GAME_FINISHED_EVENT,
  GAME_VOTING_STARTED_EVENT,
} from '../../const/events.const';
import { useAxios } from '../../hooks/useAxios';
import { useEcho } from '../../hooks/useEcho';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import { MembersPayload } from '../../types/squadResponse';
import { StartVotingEvent } from '../../types/startVotingEvent';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInProgressScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialBottomTabNavigationProp<BottomTabNavigationParamList, 'Match'>,
    StackNavigationProp<MatchScreenStackParamList, 'MatchInProgress'>
  >;
  route: RouteProp<MatchScreenStackParamList, 'MatchInProgress'>;
};

export interface MatchInProgressScreenRouteParams {
  gameId: number;
  firstSquadId?: number;
  secondSquadId?: number;
  firstTeamPlayersList?: MembersPayload[];
  secondTeamPlayersList?: MembersPayload[];
  ownerId?: number;
}

export const MatchInProgressScreen: React.FC<MatchInProgressScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useUserProfileQuery();
  const axios = useAxios();
  const {
    gameId,
    firstSquadId,
    secondSquadId,
    firstTeamPlayersList,
    secondTeamPlayersList,
    ownerId,
  } = route.params;
  const [isPending, setPending] = useState(false);

  const modalEndGame = useRef<BottomSheet | null>(null);
  const { echo, isReady: isEchoReady } = useEcho();

  const onStartVoting = useCallback((event: StartVotingEvent) => {
    modalEndGame?.current?.snapTo(0);
  }, []);

  const onGameEnded = useCallback(() => {
    navigation.jumpTo('Profile', { screen: 'Profile' });
  }, [navigation]);

  const onSubmitGameScore = async (winningSquadId: number | undefined) => {
    try {
      await axios.post('games/memos', {
        game_id: gameId,
        winning_squad: winningSquadId,
      });
      modalEndGame?.current?.snapTo(1);
      navigation.jumpTo('Profile', { screen: 'Profile' });
    } catch (e) {
      alert('Wystąpił błąd podczas przesyłania głosu na zwycięską drużynę');
    }
  };

  const onOwnerStartVoting = async () => {
    setPending(true);
    try {
      await axios.put(`games/${gameId}`, {
        command: {
          start_voting: true,
        },
      });
    } catch (e) {
      alert('Wystąpił błąd podczas próby zakończenia gry');
    }
  };

  useEffect(() => {
    const channel = `games.${gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_VOTING_STARTED_EVENT, onStartVoting);
      echo?.channel(channel).listen(GAME_FINISHED_EVENT, onGameEnded);
    }

    return () => {
      echo
        ?.channel(channel)
        .stopListening(GAME_VOTING_STARTED_EVENT, onStartVoting);
      echo?.channel(channel).stopListening(GAME_FINISHED_EVENT, onGameEnded);
    };
  }, [echo, isEchoReady, onStartVoting, gameId, onGameEnded]);

  const isOwner = ownerId === profile.data?.id;

  return (
    <Container style={styles.container}>
      <PaddedInputScrollView style={styles.container}>
        <View style={styles.mainSection}>
          <View style={styles.timer}>
            <Timer subText="Czas trwania meczu" />
          </View>
          <AppText variant="h1" style={styles.title}>
            Zespół A
          </AppText>
          <View style={styles.row}>
            {firstTeamPlayersList !== undefined && (
              <PlayerAvatarList players={firstTeamPlayersList} />
            )}
          </View>
          <AppText variant="h1" style={styles.title}>
            Zespół B
          </AppText>
          <View style={styles.row}>
            {secondTeamPlayersList !== undefined && (
              <PlayerAvatarList players={secondTeamPlayersList} />
            )}
          </View>
        </View>
        <View style={styles.action}>
          {isOwner && (
            <AppButton
              loading={isPending}
              disabled={isPending}
              mode="contained"
              onPress={() => onOwnerStartVoting()}>
              Zakończ mecz
            </AppButton>
          )}
        </View>
        <Modal
          ref={modalEndGame}
          title="Mecz dobiegł końca"
          dismissible={false}>
          <AppText style={styles.subtitle}>
            Wybierz drużynę, która zwyciężyła. Wyniki obliczane są na podstawie
            głosów wszystkich uczestników
          </AppText>
          <View style={styles.endGameButtonsContainer}>
            <AppButton
              mode="contained"
              style={styles.modalButton}
              onPress={() => onSubmitGameScore(firstSquadId)}>
              Zespół A
            </AppButton>
            <AppButton
              mode="contained"
              style={styles.modalButton}
              onPress={() => onSubmitGameScore(secondSquadId)}>
              Zespół B
            </AppButton>
          </View>
        </Modal>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  row: {
    marginBottom: 28,
  },
  mainSection: {
    display: 'flex',
    flexGrow: 2,
  },
  title: {
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
  action: {
    marginBottom: 16,
  },
  endGameButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  subtitle: {
    color: '#666',
    paddingHorizontal: 22,
    textAlign: 'center',
  },
  modalButton: {
    width: 150,
  },
});
