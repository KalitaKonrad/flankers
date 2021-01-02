import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { NumberSelector } from '../../components/shared/NumberSelector';
import { Switch } from '../../components/shared/Switch';
import { theme } from '../../theme';
import { MatchJoinType, MatchVisibility } from '../../types/match';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchCreateScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

const INITIAL_MATCH_ENTRY_FEE = 5;

export const MatchCreateScreen: React.FC<MatchCreateScreenProps> = ({
  navigation,
}) => {
  const [matchJoinType, setMatchJoinType] = useState(MatchJoinType.TEAM);
  const [isMatchRanked, setMatchRanked] = useState(true);
  const [matchVisbility, setMatchVisibility] = useState(MatchVisibility.PUBLIC);
  const [matchEntryFee, setMatchEntryFee] = useState(INITIAL_MATCH_ENTRY_FEE);

  return (
    <Container>
      <PaddedInputScrollView style={styles.wrapper}>
        <View style={styles.row}>
          <AppText style={styles.title}>Typ meczu</AppText>
          <Switch
            leftLabel="Drużynowy"
            rightLabel="Swobodny"
            onSwitchToLeft={() => setMatchJoinType(MatchJoinType.TEAM)}
            onSwitchToRight={() => setMatchJoinType(MatchJoinType.OPEN)}
          />
        </View>
        <View style={styles.row}>
          <AppText style={styles.title}>Mecz rankingowy</AppText>
          <Switch
            leftLabel="Tak"
            rightLabel="Nie"
            onSwitchToLeft={() => setMatchRanked(true)}
            onSwitchToRight={() => setMatchRanked(false)}
          />
        </View>
        <View style={styles.row}>
          <AppText style={styles.title}>Widoczność meczu</AppText>
          <Switch
            leftLabel="Publiczny"
            rightLabel="Prywatny"
            onSwitchToLeft={() => setMatchVisibility(MatchVisibility.PUBLIC)}
            onSwitchToRight={() => setMatchVisibility(MatchVisibility.PRIVATE)}
          />
        </View>
        {isMatchRanked && (
          <View style={styles.row}>
            <AppText style={styles.title}>Wpisowe</AppText>
            <NumberSelector
              min={0}
              step={0.5}
              initialValue={INITIAL_MATCH_ENTRY_FEE}
              numberFormatter={(value) => value.toFixed(2)}
            />
          </View>
        )}
        <View style={styles.action}>
          <AppButton
            mode="contained"
            onPress={() => navigation.navigate('MatchLocation')}>
            Utwórz
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 32,
  },
  row: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#666666',
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 16,
  },
  action: {
    marginTop: 24,
  },
});
