import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Switch } from './shared/Switch';

interface MatchSettingsProps {}

export const MatchSettings: React.FC<MatchSettingsProps> = (props) => {
  const [switchedMatchType, setSwitchedMatchType] = useState<boolean>(false);
  const [switchedRankingMatch, setSwitchedRankingMatch] = useState<boolean>(
    false
  );
  const [
    switchedMatchVisibility,
    setSwitchedMatchVisibility,
  ] = useState<boolean>(false);

  return (
    <View style={styles.matchSettings}>
      <Text>Typ Meczu</Text>
      <Switch
        leftLabel="Drużynowy"
        rightLabel="Swobodny"
        leftSideToggled={(res) => setSwitchedMatchType(res)}
      />
      <Text>Mecz Rankingowy</Text>
      <Switch
        leftLabel="Tak"
        rightLabel="Nie"
        leftSideToggled={(res) => setSwitchedRankingMatch(res)}
      />
      <Text>Mecz Rankingowy</Text>
      <Switch
        leftLabel="Publiczny"
        rightLabel="Prywatny"
        leftSideToggled={(res) => setSwitchedMatchVisibility(res)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  matchSettings: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
