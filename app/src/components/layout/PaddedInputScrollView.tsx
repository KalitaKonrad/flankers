import React from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface PaddedInputScrollViewProps {
  style?: StyleProp<ViewStyle>;
}

export const PaddedInputScrollView: React.FC<PaddedInputScrollViewProps> = ({
  style,
  children,
}) => {
  return (
    <KeyboardAwareScrollView style={[styles.container, style]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // marginBottom: 110,
    paddingHorizontal: 16,
  },
});
