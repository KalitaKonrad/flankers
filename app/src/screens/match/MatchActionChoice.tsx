import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { AppButton } from '../../components/shared/AppButton';
import { Logo } from '../../components/shared/Logo';
import { ScreenContent } from '../../components/shared/ScreenContent';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchActionChoiceProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

export const MatchActionChoice: React.FC<MatchActionChoiceProps> = ({
  navigation,
}) => {
  const handleSubmit = () => {
    navigation.push('MatchCreate');
  };
  return (
    <>
      {/*////////////////////////////////////////////////////////////////////////*/}
      {/*//TODO: INLINE HEADER*/}
      {/*/////////////////////////////////////////////////////*/}
      <ScreenContent>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={() => navigation.push('MatchJoinFromMap')}>
          Mecze w okolicy
        </SubmitButton>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={() => navigation.push('MatchCreate')}>
          Utwórz mecz
        </SubmitButton>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </ScreenContent>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    left: -10,
    height: 100,
    width: Dimensions.get('window').width - 20,
    resizeMode: 'contain',
  },
});
