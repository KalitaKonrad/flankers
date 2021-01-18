import * as React from 'react';
import { useImperativeHandle, useMemo, useState } from 'react';
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

export interface NumberSelectorBehaviour {
  reset(): void;
}

const defaultNumberFormatter = (value: number) => value.toString();

export const NumberSelector = React.forwardRef<
  NumberSelectorBehaviour,
  NumberSelectorProps
>(
  (
    {
      min,
      max,
      step = 1,
      initialValue = 0,
      numberFormatter,
      onValueChange,
      style,
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);
    const formatter = useMemo(() => numberFormatter ?? defaultNumberFormatter, [
      numberFormatter,
    ]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setValue(initialValue);
        },
      }),
      [initialValue]
    );

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
          accessibilityTraits=""
          accessibilityComponentType
          icon="minus"
          size={16}
          style={styles.buttonContainer}
          onPress={onDecrementPress}
        />
        <AppText variant="h1">{formatter(value)}</AppText>
        <IconButton
          accessibilityTraits=""
          accessibilityComponentType
          icon="plus"
          size={16}
          style={styles.buttonContainer}
          onPress={onIncrementPress}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: theme.colors.lightGray,
  },
});
