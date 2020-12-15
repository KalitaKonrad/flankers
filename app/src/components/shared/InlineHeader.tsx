import React from 'react';
import { StyleSheet, View } from 'react-native';

interface InlineHeaderProps {
  color?: string;
  center?: boolean;
}

export const InlineHeader: React.FC<InlineHeaderProps> = ({
  children,
  color,
  center,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          justifyContent: center ? 'center' : 'space-between',
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    padding: 10,
  },
});
