import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import { InlineHeader } from '../../components/shared/InlineHeader';
import { Modal } from '../../components/shared/Modal';
import RoundInformation from '../../components/shared/RoundInformation';
import { ScreenContent } from '../../components/shared/ScreenContent';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { TextStyle, theme } from '../../theme';
import { WalletMatchHistory } from './WalletMatchHistory';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletScreenProps = object &
  StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

const TOP_UP_TITLE_TEXT = 'Wybierz kwotę doładowania';
const WITHDRAW_TITLE_TEXT = 'Wybierz kwotę środków, które chcesz wypłacić';
const TOP_UP_BUTTON_TEXT = 'Doładuj';
const WITHDRAW_BUTTON_TEXT = 'Wypłać';

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const modalRef = useRef<BottomSheet | null>(null);

  const closeModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const [topUpAmount, setTopUpAmount] = useState(5.0);
  const [modalButtonText, setModalButtonText] = useState('');
  const [modalTitleText, setModalTitleText] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <InlineHeader color={theme.colors.white}>
        <View style={styles.placeholder} />
        <View style={styles.titleContainer}>
          <Text style={TextStyle.noteH1}>Portfel</Text>
        </View>
        <Button
          mode="text"
          color={theme.colors.primary}
          onPress={() => {
            setModalButtonText(WITHDRAW_BUTTON_TEXT);
            setModalTitleText(WITHDRAW_TITLE_TEXT);
            openModal();
          }}>
          Wypłać
        </Button>
      </InlineHeader>

      <RoundInformation
        mainText="20.00 PLN"
        subText="Aktualny stan konta"
        buttonText="Doładuj"
        onButtonClick={() => {
          if (modalRef.current) {
            modalRef.current?.snapTo(0);
          }

          // setModalButtonText(TOP_UP_BUTTON_TEXT);
          // setModalTitleText(TOP_UP_TITLE_TEXT);
          // openModal();
        }}
      />
      <ScreenContent>
        <WalletMatchHistory name="hehe" matchHistory={[]} />
      </ScreenContent>

      <Modal ref={modalRef} title="Wybierz kwotę doładowania">
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
          backgroundColor={error ? theme.colors.error : theme.colors.primary}
          onPress={closeModal}>
          {modalButtonText}
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
    backgroundColor: theme.colors.lightGray,
  },
});
