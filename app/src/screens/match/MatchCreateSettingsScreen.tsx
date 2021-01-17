import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { NumberSelector } from '../../components/shared/NumberSelector';
import { Switch } from '../../components/shared/Switch';
import { useUserWalletQuery } from '../../hooks/payments/useUserWalletQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { MatchJoinType, MatchVisibility } from '../../types/match';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchCreateScreenProps = StackScreenProps<
  MatchScreenStackParamList,
  'MatchCreate'
>;

const INITIAL_MATCH_ENTRY_FEE = 5;
const INITIAL_PLAYERS_IN_TEAM_AMOUNT = 2;

export const MatchCreateSettingsScreen: React.FC<MatchCreateScreenProps> = ({
  navigation,
}) => {
  const [matchJoinType, setMatchJoinType] = useState(MatchJoinType.OPEN);
  const [isMatchRanked, setMatchRanked] = useState(true);
  const [matchVisibility, setMatchVisibility] = useState(
    MatchVisibility.PUBLIC
  );
  const [matchEntryFee, setMatchEntryFee] = useState(INITIAL_MATCH_ENTRY_FEE);
  const [playersAmount, setPlayersAmount] = useState<number>(
    INITIAL_PLAYERS_IN_TEAM_AMOUNT
  );
  const userProfile = useUserProfileQuery();
  const hasTeam = useMemo(() => !!userProfile.data?.teams?.[0], [
    userProfile.data?.teams,
  ]);
  const wallet = useUserWalletQuery();
  const hasSufficientFunds = useMemo(() => {
    if (!isMatchRanked) {
      return true;
    }
    if (wallet?.data !== undefined) {
      return wallet.data.balance >= matchEntryFee;
    }
    return false;
  }, [isMatchRanked, matchEntryFee, wallet.data]);

  const onCreate = () => {
    navigation.push('MatchLocation', {
      type: matchJoinType,
      isRated: isMatchRanked,
      isPublic: matchVisibility === MatchVisibility.PUBLIC,
      bet: isMatchRanked ? matchEntryFee : 0,
      playersAmount,
    });
  };

  return (
    <Container>
      <PaddedInputScrollView style={styles.wrapper}>
        {hasTeam && (
          <View style={styles.row}>
            <AppText style={styles.title}>Typ meczu</AppText>
            <Switch
              leftLabel="Swobodny"
              rightLabel="Drużynowy"
              onSwitchToLeft={() => setMatchJoinType(MatchJoinType.OPEN)}
              onSwitchToRight={() => setMatchJoinType(MatchJoinType.TEAM)}
            />
          </View>
        )}
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
              onValueChange={(value) => setMatchEntryFee(value)}
            />
          </View>
        )}
        <View style={styles.row}>
          <AppText style={styles.title}>Liczba graczy</AppText>
          <NumberSelector
            min={2}
            step={1}
            max={5}
            initialValue={INITIAL_PLAYERS_IN_TEAM_AMOUNT}
            onValueChange={(value) => setPlayersAmount(value)}
          />
        </View>

        {matchVisibility === MatchVisibility.PRIVATE &&
        matchJoinType === MatchJoinType.TEAM ? (
          <View style={styles.invitation}>
            <AppText style={styles.privateMatchMessage}>
              Kod gry dzięki któremu przeciwna drużyna będzie mogła dołączyć
              zostanie wygenerowany. Wybierz miejsce na mapie
            </AppText>
          </View>
        ) : (
          <></>
        )}

        {matchVisibility === MatchVisibility.PRIVATE &&
        matchJoinType === MatchJoinType.OPEN ? (
          <View style={styles.invitation}>
            <AppText style={styles.privateMatchMessage}>
              Kod gry dzięki któremu inne osoby będą mogły dołączyć zostanie
              wygenerowany. Wybierz miejsce na mapie
            </AppText>
          </View>
        ) : (
          <></>
        )}

        <View style={styles.action}>
          {!hasSufficientFunds && (
            <AppText style={{ textAlign: 'center', marginBottom: 16 }}>
              Twój aktualny stan konta wynosi{' '}
              {(wallet?.data?.balance ?? 0).toFixed(2)}PLN. Aby rozpocząć grę z
              wybraną stawką doładuj swoje konto!
            </AppText>
          )}
          <AppButton
            disabled={!hasSufficientFunds}
            mode="contained"
            onPress={onCreate}>
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
    marginBottom: 50,
  },
  invitation: {
    bottom: 15,
    margin: 10,
  },
  privateMatchMessage: {
    textAlign: 'center',
  },
});
