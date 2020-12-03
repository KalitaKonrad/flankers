import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { TeamCreateScreen } from './TeamCreateScreen';
import { TeamManageScreen } from './TeamManageScreen';

export type TeamScreenStackParamList = {
  TeamCreate: undefined;
  TeamManage: undefined;
};

const Stack = createStackNavigator<TeamScreenStackParamList>();

export const TeamScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="TeamCreate" component={TeamCreateScreen} />
      <Stack.Screen name="TeamManage" component={TeamManageScreen} />
    </Stack.Navigator>
  );
};
