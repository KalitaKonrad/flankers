import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PlayersSquad } from '../../components/PlayersSquad';
import { Container } from '../../components/layout/Container';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInProgressScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchInProgress'
>;

export const MatchInProgressScreen: React.FC<MatchInProgressScreenProps> = ({
  navigation,
}) => {
  return (
    <Container>
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
    </Container>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    display: 'flex',
    bottom: 15,
  },
});
