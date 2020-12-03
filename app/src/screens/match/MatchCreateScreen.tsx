import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchCreateScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

export const MatchCreateScreen: React.FC<MatchCreateScreenProps> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>Create Match Screen</Text>
      <Button onPress={() => navigation.push('MatchLocation')}>
        Wybierz miejsce na mapie
      </Button>
    </View>
  );
};
