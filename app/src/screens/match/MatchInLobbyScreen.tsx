import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayerAvatarList } from '../../components/match/PlayerAvatarList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { GAME_UPDATE_EVENT } from '../../const/events.const';
import { useEcho } from '../../hooks/useEcho';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { theme } from '../../theme';
import { GameUpdateEvent } from '../../types/gameUpdateEvent';
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
  const mockPlayerList = useMemo(() => {
    if (profile.isSuccess) {
      return Array(5)
        .fill(profile.data)
        .map((profile, i) => ({ ...profile, id: i }));
    }
    return [];
  }, [profile.data, profile.isSuccess]);

  const { echo, isReady: isEchoReady } = useEcho();

  const onGameUpdated = useCallback((event: GameUpdateEvent) => {
    console.log('===> Received GameUpdateEvent');
    console.log(event);
  }, []);

  useEffect(() => {
    const channel = `games.${route.params.gameId}`;

    if (isEchoReady) {
      echo?.channel(channel).listen(GAME_UPDATE_EVENT, onGameUpdated);
    }

    return () => {
      echo?.channel(channel).stopListening(GAME_UPDATE_EVENT, onGameUpdated);
    };
  }, [isEchoReady]);

  return (
    <Container>
      <PaddedInputScrollView style={styles.container}>
        <View style={styles.row}>
          <AppText variant="h2" style={styles.title}>
            Zespół A
          </AppText>
          <PlayerAvatarList players={mockPlayerList} />
        </View>
        <View style={styles.row}>
          <AppText variant="h2" style={styles.title}>
            Zespół B
          </AppText>
          <PlayerAvatarList players={mockPlayerList} />
        </View>
        <View style={styles.row}>
          <AppText variant="h2" style={styles.title}>
            Oczekiwanie na graczy
          </AppText>
          <PlayerAvatarList players={mockPlayerList} />
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
    marginBottom: 24,
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
});
