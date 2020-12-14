import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PlayersSquad } from '../../components/PlayersSquad';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInProgressScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchInProgress'>;

export const MatchInProgressScreen: React.FC<MatchInProgressScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      {/*////////////////////////////////////////////////////////////////////////*/}
      {/*//TODO: INLINE HEADER*/}
      {/*/////////////////////////////////////////////////////*/}
      {/*////////////////////////////////////////////////////////////////////////*/}
      {/*//TODO: TIMER or sth else*/}
      {/*/////////////////////////////////////////////////////*/}
      <PlayersSquad
        firstTeamAvatarList={['src', 'oki']}
        firstTeamName="A"
        secondTeamAvatarList={['src']}
        secondTeamName="B"
      />
      <View style={styles.submitBtn}>
        <SubmitButton
          labelColor={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={() => console.log('zakoncz mecz')}>
          Zakończ mecz
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
