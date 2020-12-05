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
      labelStyle={{ color: props.labelColor }}
      style={{ margin: 10 }}
      theme={{ roundness: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
