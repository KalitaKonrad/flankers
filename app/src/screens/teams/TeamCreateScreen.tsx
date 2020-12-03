import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamCreateScreen: React.FC<TeamCreateScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Create team Page</Text>
    </>
  );
};
