import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { InlineHeader } from '../../components/shared/InlineHeader';
import { MatchHistory } from '../../components/shared/MatchHistory';
import { Modal } from '../../components/shared/Modal';
import RoundInformation from '../../components/shared/RoundInformation';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { TextStyle, theme } from '../../theme';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletScreenProps = object &
  StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), [setModalVisible]);

  const closeModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const [topUpAmount, setTopUpAmount] = useState(5.0);

  return (
    <>
      <InlineHeader color={theme.colors.white}>
        <View style={styles.placeholder} />
        <View style={styles.titleContainer}>
          <Text style={TextStyle.noteH1}>Portfel</Text>
        </View>
        <Button mode="text" color={theme.colors.primary} onPress={openModal}>
          Wypłać
        </Button>
      </InlineHeader>

      <RoundInformation
        mainText="20.00 PLN"
        subText="Aktualny stan konta"
        buttonText="Doładuj"
        onButtonClick={() => setModalVisible(true)}
      />

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <InlineHeader center>
          <Text style={[TextStyle.noteH2]}>Wybierz kwotę doładowania</Text>
        </InlineHeader>
        <View style={styles.accountTopUpSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (topUpAmount > 1) {
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
        <SubmitButton
          mode="text"
          labelColor={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={closeModal}>
          Doładuj
        </SubmitButton>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 2,
  },
  placeholder: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  accountTopUpSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 50,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: theme.colors.background.lightGray,
  },
});
