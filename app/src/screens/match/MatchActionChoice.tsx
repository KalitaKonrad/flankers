import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchActionChoiceProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

export const MatchActionChoice: React.FC<MatchActionChoiceProps> = ({
  navigation,
}) => {
  return (
    <>
      <SubmitButton
        backgroundColor={theme.colors.primary}
        labelColor={theme.colors.background.white}
        onPress={() => navigation.push('MatchJoinFromMap')}>
        Mecze w okolicy
      </SubmitButton>
      <SubmitButton
        backgroundColor={theme.colors.primary}
        labelColor={theme.colors.background.white}
        onPress={() => navigation.push('MatchCreate')}>
        Utwórz mecz
      </SubmitButton>
    </>
  );
};
