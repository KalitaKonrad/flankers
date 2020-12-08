import React, { useState } from 'react';
import SwitchSelector from 'react-native-switch-selector';

import { theme } from '../../theme';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <SwitchSelector
      initial={0}
      onPress={() => {
        console.log('pushed');
      }}
      textColor="#7f8581"
      selectedColor={theme.colors.primary}
      buttonColor={theme.colors.background.white}
      borderColor={theme.colors.background.darkGray}
      backgroundColor={theme.colors.background.darkGray}
      hasPadding
      height={50}
      fontSize={20}
      bold
      options={[
        { label: props.leftLabel, value: 'f' }, //images.feminino = require('./path_to/assets/img/feminino.png')
        { label: props.rightLabel, value: 'm' }, //images.masculino = require('./path_to/assets/img/masculino.png')
      ]}
    />
  );
};
