import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PlayersSquad } from '../../components/PlayersSquad';
import { Container } from '../../components/layout/Container';
import { AppButton } from '../../components/shared/AppButton';
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
        <AppButton onPress={() => console.log('zakoncz mecz')}>
          Zakończ mecz
        </AppButton>
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
