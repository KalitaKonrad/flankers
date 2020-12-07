import * as React from 'react';
import { Button } from 'react-native-paper';

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
