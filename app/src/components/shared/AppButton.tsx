import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type AppButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

export const AppButton: React.FC<AppButtonProps> = (props) => (
  <Button
    {...props}
    loading={props.isLoading}
    theme={{ roundness: 100 }}
    uppercase={false}
    contentStyle={[
      !props.compact && styles.buttonContainer,
      props.contentStyle,
    ]}
    labelStyle={[
      styles.text,
      props.mode === 'contained' && styles.textInverted,
      props.labelStyle,
    ]}
  />
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
  },
  text: {
    letterSpacing: 0,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInverted: {
    color: '#fff',
  },
});
