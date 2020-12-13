import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

import { theme } from '../../theme';

type SubmitButtonProps = {
  backgroundColor?: string;
  labelColor: string;
} & React.ComponentProps<typeof Button>;

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      color={props.backgroundColor}
      labelStyle={{
        color: props.labelColor,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontSize: 16,
      }}
      style={styles.button}
      contentStyle={styles.buttonInner}
      uppercase={false}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 100,
  },
  buttonInner: {
    paddingVertical: 8,
  },
});
