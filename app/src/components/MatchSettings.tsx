import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Switch } from './shared/Switch';

interface MatchSettingsProps {
  onRankingMatchToggled: (arg: boolean) => void;
}

export const MatchSettings: React.FC<MatchSettingsProps> = (props) => {
  const [isSwitchedMatchType, setIsSwitchedMatchType] = useState<boolean>(
    false
  );
  const [isSwitchedRankingMatch, setIsSwitchedRankingMatch] = useState<boolean>(
    false
  );
  const [
    isSwitchedMatchVisibility,
    setIsSwitchedMatchVisibility,
  ] = useState<boolean>(false);

  return (
    <View style={styles.matchSettings}>
      <Text>Typ Meczu</Text>
      <Switch
        leftLabel="Drużynowy"
        rightLabel="Swobodny"
        onLeftSideToggled={(res) => setIsSwitchedMatchType(res)}
      />
      <Text>Mecz Rankingowy</Text>
      <Switch
        leftLabel="Tak"
        rightLabel="Nie"
        onLeftSideToggled={(res) => {
          setIsSwitchedRankingMatch(res);
          props.onRankingMatchToggled(isSwitchedRankingMatch);
        }}
      />
      <Text>Mecz Rankingowy</Text>
      <Switch
        leftLabel="Publiczny"
        rightLabel="Prywatny"
        onLeftSideToggled={(res) => setIsSwitchedMatchVisibility(res)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  matchSettings: {
    flex: 0.7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
