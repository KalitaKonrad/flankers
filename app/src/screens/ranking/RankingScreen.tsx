import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { BottomTabNavigationParamList } from '../../components/BottomTabNavigation';
import { useNotification } from '../../hooks/useNotification';

type RankingScreenProps = object &
  MaterialBottomTabScreenProps<BottomTabNavigationParamList, 'Ranking'>;

export const RankingScreen: React.FC<RankingScreenProps> = ({ navigation }) => {
  const { notification, sendPushNotification } = useNotification();
  return (
    <>
      <View>
        <Button
          style={{ marginTop: 50 }}
          onPress={() => sendPushNotification('tytul', 'cialo', 'some data')}>
          send notification
        </Button>
        <Text>{JSON.stringify(notification)}</Text>
      </View>
    </>
  );
};
