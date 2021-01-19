import * as React from 'react';
import { useMemo, useState } from 'react';
import { useTheme } from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';

interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  onSwitchToLeft(): void;
  onSwitchToRight(): void;
  disabled?: boolean;
}

enum SwitchValue {
  LEFT = 'left',
  RIGHT = 'right',
}

export const Switch: React.FC<SwitchProps> = ({
  leftLabel,
  rightLabel,
  onSwitchToLeft,
  onSwitchToRight,
  disabled,
}) => {
  const theme = useTheme();
  const [currentValue, setCurrentValue] = useState(SwitchValue.LEFT);

  const onPress = (value: SwitchValue) => {
    if (currentValue !== value) {
      setCurrentValue(value);
      (value === SwitchValue.LEFT ? onSwitchToLeft : onSwitchToRight)();
    }
  };

  const options = useMemo(
    () => [
      { label: leftLabel, value: SwitchValue.LEFT },
      { label: rightLabel, value: SwitchValue.RIGHT },
    ],
    [leftLabel, rightLabel]
  );

  return (
    <SwitchSelector
      bold
      hasPadding
      initial={0}
      textColor="#BDBDBD"
      selectedColor={theme.colors.primary}
      buttonColor={theme.colors.white}
      borderColor="#E8E8E8"
      backgroundColor="#F6F6F6"
      height={50}
      disabled={disabled}
      fontSize={16}
      options={options}
      onPress={onPress}
    />
  );
};
