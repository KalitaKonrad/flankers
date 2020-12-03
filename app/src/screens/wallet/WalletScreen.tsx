import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Text } from 'react-native';

import { BottomTabNavigationParamList } from '../../components/BottomTabNavigation';

type WalletScreenProps = object &
  MaterialBottomTabScreenProps<BottomTabNavigationParamList, 'Wallet'>;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  return (
    <>
      <Text>Wallet Page</Text>
    </>
  );
};
