import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { theme } from '../../theme';

interface MultilineTextInputProps {
  placeholder: string;
}

export const MultilineTextInput: React.FC<MultilineTextInputProps> = (
  props
) => {
  return (
    <TextInput
      style={styles.textMultiLineInputStyle}
      placeholder={props.placeholder}
      blurOnSubmit
      multiline
      selectionColor={theme.colors.primary}
      defaultValue=""
      onChangeText={(text) => {
        console.log('text');
      }}
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
