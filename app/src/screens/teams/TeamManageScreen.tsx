import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';

import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreen = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamManage'>;

export const TeamManageScreen: React.FC<TeamManageScreen> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>View Team</Text>
      <Button
        title="Utwórz zespół"
        onPress={() => navigation.navigate('TeamCreate')}
      />
    </View>
  );
};
