import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MatchSettings } from '../../components/MatchSettings';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useTeamCreateMutation } from '../../hooks/useTeamCreateMutation';
import { TextStyle, theme } from '../../theme';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchCreateScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

export const MatchCreateScreen: React.FC<MatchCreateScreenProps> = ({
  navigation,
}) => {
  const [feeAmount, setFeeAmount] = useState<number>(5.0);
  const [playersAmount, setPlayersAmount] = useState<number>(2.0);
  const [isRankingMatchSwitched, setIsRankingMatchSwitched] = useState<boolean>(
    true
  );
  const [isVisibilitySwitched, setIsVisibilitySwitched] = useState<boolean>(
    true
  );
  const [isTypeSwitched, setIsTypeSwitched] = useState<boolean>(true);

  const [mutate] = useTeamCreateMutation();

  const onPress = () => {
    mutate({
      typeTeam: isTypeSwitched,
      rated: isRankingMatchSwitched,
      public: isVisibilitySwitched,
      bet: feeAmount,
    });
  };

  return (
    // //////////////////////////////////////////////////////////////////////
    // TODO: INLINE HEADER
    // ///////////////////////////////////////////////////
    <View style={styles.container}>
      <View style={styles.matchSettings}>
        <MatchSettings
          onRankingMatchToggled={(res) => {
            setIsRankingMatchSwitched(res);
          }}
          onMatchTypeToggled={(res) => setIsTypeSwitched(res)}
          onVisibilityToggled={(res) => setIsVisibilitySwitched(res)}
        />
      </View>
      <View>
        <View style={styles.label}>
          <Text style={{ textAlign: 'center' }}>Liczba Graczy</Text>
        </View>

        <View style={styles.playersAmountPicker}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (playersAmount > 2) {
                setPlayersAmount(playersAmount - 1);
              }
            }}>
            <Text style={{ color: theme.colors.black }}>-</Text>
          </TouchableOpacity>
          <Text style={TextStyle.noteH2}>{playersAmount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (playersAmount < 5) {
                setPlayersAmount(playersAmount + 1);
              }
            }}>
            <Text style={{ color: theme.colors.black }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isRankingMatchSwitched ? (
        <View>
          <View style={styles.label}>
            <Text style={{ textAlign: 'center' }}>Wpisowe</Text>
          </View>
          <View style={styles.feePicker}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (feeAmount > 0) {
                  setFeeAmount(feeAmount - 1);
                }
              }}>
              <Text style={{ color: theme.colors.black }}>-</Text>
            </TouchableOpacity>
            <Text style={TextStyle.noteH2}>{feeAmount + '.00'}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFeeAmount(feeAmount + 1)}>
              <Text style={{ color: theme.colors.black }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}

      {!isVisibilitySwitched && !isTypeSwitched ? (
        <View style={styles.invitation}>
          <Text style={{ textAlign: 'center' }}>
            Kod gry dzięki któremu przeciwna drużyna będzie mogła dołączyć
            zostanie wygenerowany. Wybierz miejsce na mapie
          </Text>
        </View>
      ) : (
        <></>
      )}

      {!isVisibilitySwitched && isTypeSwitched ? (
        <View style={styles.invitation}>
          <Text style={{ textAlign: 'center' }}>
            Kod gry dzięki któremu inne osoby będą mogły dołączyć zostanie
            wygenerowany. Wybierz miejsce na mapie
          </Text>
        </View>
      ) : (
        <></>
      )}

      <View style={styles.submitBtn}>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
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
  playersAmountPicker: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 50,
    marginBottom: 20,
  },

  feePicker: {
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
    marginBottom: 25,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.darkGray,
  },
  label: {
    top: 10,
  },
  textInputStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
  invitation: {
    bottom: 15,
    margin: 10,
  },
});
