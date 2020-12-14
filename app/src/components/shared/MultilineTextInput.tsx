import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { theme } from '../../theme';

type MultilineTextInputProps = {
  placeholder: string;
} & React.ComponentProps<typeof TextInput>;

export const MultilineTextInput: React.FC<MultilineTextInputProps> = (
  props
) => {
  return (
    <TextInput
      {...props}
      style={styles.textMultiLineInputStyle}
      placeholder={props.placeholder}
      blurOnSubmit
      multiline
      selectionColor={theme.colors.primary}
    />
  );
};

const styles = StyleSheet.create({
  textMultiLineInputStyle: {
    borderRadius: 12,
    height: 150,
    textAlignVertical: 'top',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
});
