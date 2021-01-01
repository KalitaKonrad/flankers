import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

type PaddedInputScrollViewProps = ComponentProps<typeof InputScrollView>;

export const PaddedInputScrollView: React.FC<PaddedInputScrollViewProps> = (
  props
) => <InputScrollView {...props} style={[styles.container, props.style]} />;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
