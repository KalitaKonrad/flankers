import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { Container } from '../../components/layout/Container';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { Timer } from '../../components/shared/Timer';
import { Modal } from '../../components/shared/modal/Modal';
import { GAME_FINISHED_EVENT } from '../../const/events.const';
import { useAxios } from '../../hooks/useAxios';
import { useEcho } from '../../hooks/useEcho';
import { useGameDetailsQuery } from '../../hooks/useGameDetailsQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import { FinishGameEvent } from '../../types/finishGameEvent';
import { MembersPayload } from '../../types/squadResponse';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInProgressScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchInProgress'
>;

export interface MatchInProgressScreenRouteParams {
  gameId: number;
}

export const MatchInProgressScreen: React.FC<MatchInProgressScreenProps> = ({
  navigation,
  route,
}) => {
  const profile = useUserProfileQuery();
  const matchDetails = useGameDetailsQuery(route.params.gameId);
  const axios = useAxios();
  const firstTeamId = matchDetails.data?.squads[0].team_id;
  const secondTeamId = matchDetails.data?.squads[1].team_id;

  const gameId = matchDetails.data?.id;

  const [firstTeamPlayersList, setFirstTeamPlayersList] = useState<
    MembersPayload[] | undefined
  >(matchDetails.data?.squads[0].members);
  const [secondTeamPlayersList, setSecondTeamPlayersList] = useState<
    MembersPayload[] | undefined
  >(matchDetails.data?.squads[1].members);

  const modalEndGame = useRef<BottomSheet | null>(null);
  const { echo, isReady: isEchoReady } = useEcho();

  const onEndGame = useCallback((event: FinishGameEvent) => {
    modalEndGame?.current?.snapTo(0);
    // TODO: zablokowac wysjcie z tego ekranuc
    // TODO: add stop timer effect when the game is ended
    console.log('EVENT', event);
  }, []);

  const onSubmitGameScore = async (winningTeamId: number | undefined) => {
    try {
      await axios.post('games/memos', {
        game_id: gameId,
        winning_squad: winningTeamId,
      });
    } catch (e) {
      console.log('erroraaaa:', e.message);
      console.log('erroraaaa:', JSON.stringify(e));

      alert(
        'Wystąpił błąd podczas przesyłania głosu na zwycięską drużynę. Sprawdź połączenie z internetem.'
      ); // TODO: dopisac com
    }
  };

  const onOwnerEndGame = async () => {
    try {
      await axios.put(`games/${gameId}`, {
        command: {
          end_game: true,
        },
      });
    } catch (e) {
      console.log('errordddd:', e.message);
      alert(
        'Wystąpił błąd podczas próby zakończenia gry. Sprawdź połączenie z internetem.'
      );
    }
  };

  useEffect(() => {
    const channel = `games.${route.params.gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_FINISHED_EVENT, onEndGame);
    }

    return () => {
      echo?.channel(channel).stopListening(GAME_FINISHED_EVENT, onEndGame);
    };
  }, [echo, isEchoReady, onEndGame, route.params.gameId]);

  // TODO: use this to allow only the owner to finish match
  const isOwner = matchDetails.data?.owner_id === profile.data?.id;

  return (
    <Container style={styles.container}>
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
        {/*{isOwner && TODO: ENABLE THAT(*/}
        <AppButton mode="contained" onPress={() => onOwnerEndGame()}>
          Zakończ mecz
        </AppButton>

        {/*)}*/}
      </View>
      {/*TODO: turn off background click possibility when deciding which team won*/}
      <Modal ref={modalEndGame} title="Mecz dobiegł końca">
        <AppText style={styles.subtitle}>
          Wybierz drużynę, która zwyciężyła. Wyniki obliczane są na podstawie
          głosów wszystkich uczestników
        </AppText>
        <View style={styles.endGameButtonsContainer}>
          <AppButton
            mode="contained"
            style={styles.modalButton}
            onPress={() => onSubmitGameScore(firstTeamId)}>
            Zespół A
          </AppButton>
          <AppButton
            mode="contained"
            style={styles.modalButton}
            onPress={() => onSubmitGameScore(secondTeamId)}>
            Zespół B
          </AppButton>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
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
