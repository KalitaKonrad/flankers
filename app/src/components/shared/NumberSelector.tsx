import React, { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

import { theme } from '../../theme';
import { AppText } from './AppText';

interface NumberSelectorProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  numberFormatter?(value: number): string;
  onValueChange?(value: number): void;
  style?: StyleProp<ViewStyle>;
}

const defaultNumberFormatter = (value: number) => value.toString();

export const NumberSelector: React.FC<NumberSelectorProps> = ({
  min,
  max,
  step = 1,
  initialValue = 0,
  numberFormatter,
  onValueChange,
  style,
}) => {
  const [value, setValue] = useState(initialValue);
  const formatter = useMemo(() => numberFormatter ?? defaultNumberFormatter, [
    numberFormatter,
  ]);

  const onDecrementPress = () => {
    let nextValue = value - step;
    if (min !== undefined && nextValue < min) {
      nextValue = min;
    }
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  const onIncrementPress = () => {
    let nextValue = value + step;
    if (max !== undefined && nextValue > max) {
      nextValue = max;
    }
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <View style={[styles.container, style]}>
      <IconButton
        icon="minus"
        size={16}
        style={styles.button}
        onPress={onDecrementPress}
      />
      <AppText variant="h1">{formatter(value)}</AppText>
      <IconButton
        icon="plus"
        size={16}
        style={styles.button}
        onPress={onIncrementPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: theme.colors.lightGray,
  },
});
