import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { theme } from '../../theme';
import { AppInput, AppInputProps } from './AppInput';

type MultilineTextInputProps = AppInputProps;

export const MultilineTextInput: React.FC<MultilineTextInputProps> = (
  props
) => {
  return (
    <AppInput
      {...props}
      multiline
      style={{ height: 150, textAlignVertical: 'top' }}
    />
  );
};
