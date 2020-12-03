import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderWithAvatarProps {
  color?: string;
  center?: boolean;
}

export const HeaderWithAvatar: React.FC<HeaderWithAvatarProps> = ({
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
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    top: 50,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,

    fontWeight: 'bold',
  },
});
