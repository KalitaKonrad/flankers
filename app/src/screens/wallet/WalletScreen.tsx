import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import { BottomTabNavigationParamList } from '../../components/BottomTabNavigation';
import { InlineHeader } from '../../components/shared/InlineHeader';
import { Modal } from '../../components/shared/Modal';
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
      <InlineHeader color={theme.colors.black}>
        <View style={styles.placeholder} />
        <View style={styles.titleContainer}>
          <Text style={TextStyle.noteH1}>Portfel</Text>
        </View>
        <Button mode="text" color={theme.colors.primary} onPress={openModal}>
          Wypłać
        </Button>
      </InlineHeader>

      <Modal>
        <InlineHeader center>
          <Text style={[TextStyle.noteH2]}>Wybierz kwotę doładowania</Text>
        </InlineHeader>
        <View style={styles.accountTopUpSection}>
          <Button
            mode="text"
            onPress={(prevAmount) => setTopUpAmount(prevAmount - 1)}>
            -
          </Button>
        </View>
        <SubmitButton
          mode="text"
          labelColor={theme.colors.white}
          backgroundColor={theme.colors.primary}
          onPress={closeModal}>
          Close
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
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 50,
  },
});
