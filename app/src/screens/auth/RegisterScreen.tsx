import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import { Container } from '../../components/shared/Container';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme } from '../../theme';
import { AuthScreenStackParamList } from './AuthScreenStack';

type RegisterScreenProps = object &
  StackScreenProps<AuthScreenStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  return (
    <Container>
      <View>
        <TextInput label="Nick" style={styles.row} />
        <TextInput label="Email" style={styles.row} />
        <TextInput label="Hasło" style={styles.row} />
        <TextInput label="Powtórz hasło" style={styles.row} />
      </View>
      <View>
        <SubmitButton backgroundColor={theme.colors.primary} labelColor="#fff">
          Zarejestruj
        </SubmitButton>
        <Button>Zapomniałeś hasła?</Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
});
