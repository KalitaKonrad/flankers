import { yupResolver } from '@hookform/resolvers/yup';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, Keyboard, StyleSheet, Text, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { Logo } from '../../components/shared/Logo';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchActionChoiceProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchCreate'>;

type MatchCodeFormData = {
  code: string;
};

const MatchCodeSchema = yup.object().shape({
  code: yup.string().required('Wpisz kod gry aby dołączyć'),
});

export const MatchActionChoice: React.FC<MatchActionChoiceProps> = ({
  navigation,
}) => {
  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<MatchCodeFormData>({
    resolver: yupResolver(MatchCodeSchema),
  });

  useEffect(() => {
    register('code');
  }, [register()]);

  const onPressMatchJoinWithCode = async ({ code }: MatchCodeFormData) => {
    Keyboard.dismiss();

    try {
      //TODO: MUTATION TO JOIN MATCH WITH CODE
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <>
      {/*////////////////////////////////////////////////////////////////////////*/}
      {/*//TODO: INLINE HEADER*/}
      {/*/////////////////////////////////////////////////////*/}
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
      <SubmitButton
        backgroundColor={theme.colors.primary}
        labelColor={theme.colors.white}
        onPress={handleSubmit(onPressMatchJoinWithCode)}>
        Dołącz poprzez kod gry
      </SubmitButton>
      <AppInput
        style={{ marginBottom: 7, marginTop: 20, marginHorizontal: 10 }}
        label="Kod gry"
        onChangeText={(text) => setValue('code', text)}
      />
      {!!errors.code && (
        <HelperText type="error" visible={!!errors.code}>
          {errors.code?.message}
        </HelperText>
      )}

      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 60,
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
