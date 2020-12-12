import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { MatchSettings } from '../../components/MatchSettings';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { TextStyle, theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchCreateScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

export const MatchCreateScreen: React.FC<MatchCreateScreenProps> = ({
  navigation,
}) => {
  const [topUpAmount, setTopUpAmount] = useState<number>(5.0);
  return (
    <View style={styles.container}>
      <View style={styles.matchSettings}>
        <MatchSettings />
      </View>
      <View style={styles.label}>
        <Text>Wpisowe</Text>
      </View>
      <View style={styles.accountTopUpSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (topUpAmount > 0) {
              setTopUpAmount(topUpAmount - 1);
            }
          }}>
          <Text style={{ color: theme.colors.black }}>-</Text>
        </TouchableOpacity>
        <Text style={TextStyle.noteH2}>{topUpAmount + '.00'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTopUpAmount(topUpAmount + 1)}>
          <Text style={{ color: theme.colors.black }}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.submitBtn}>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.background.white}
          onPress={() => navigation.push('MatchLocation')}>
          utwórz
        </SubmitButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  submitBtn: {
    bottom: 20,
  },
  matchSettings: {
    flex: 1,
    justifyContent: 'space-between',
    top: 20,
  },

  accountTopUpSection: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 50,
    bottom: 50,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.background.darkGray,
  },
  label: {
    top: 10,
  },
});
