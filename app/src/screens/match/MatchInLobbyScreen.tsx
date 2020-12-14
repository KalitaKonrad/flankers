import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { PlayersSquad } from '../../components/PlayersSquad';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInLobbyScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchInLobby'>;

export const MatchInLobbyScreen: React.FC<MatchInLobbyScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      {/*////////////////////////////////////////////////////////////////////////*/}
      {/*//TODO: INLINE HEADER*/}
      {/*/////////////////////////////////////////////////////*/}
      <PlayersSquad
        firstTeamAvatarList={['src', 'oki']}
        firstTeamName="A"
        secondTeamAvatarList={['src']}
        secondTeamName="B"
        notReadyPlayersAvatarList={['jp2']}
      />
      <View style={styles.submitBtn}>
        <SubmitButton
          labelColor={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={() => navigation.push('MatchInProgress')}>
          Rozpocznij
        </SubmitButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    display: 'flex',
    bottom: 15,
  },
});
