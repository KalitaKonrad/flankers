import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type SubmitButtonProps = {
  backgroundColor?: string;
  labelColor: string;
} & React.ComponentProps<typeof Button>;

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <Button
      style={styles.button}
      {...props}
      mode="contained"
      color={props.backgroundColor}
      labelStyle={{
        color: props.labelColor,
        letterSpacing: 0,
        fontWeight: 'bold',
        fontSize: 16,
      }}
      theme={{ roundness: 20 }}
      contentStyle={styles.buttonInner}
      uppercase={false}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  buttonInner: {
    paddingVertical: 3,
  },
});
