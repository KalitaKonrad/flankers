import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { theme } from '../../theme';

interface AvatarProps {
  size: number;
  src: ImageSourcePropType;
  border?: number;
  elevation?: number;
  borderRadius?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  size,
  src,
  border = 0,
  elevation = 0,
  borderRadius = 100,
}) => (
  <View
    style={[
      styles.container,
      {
        elevation,
        height: size,
        width: size,
        borderRadius,
      },
    ]}>
    <Image
      style={[
        styles.avatar,
        {
          height: size,
          width: size,
          borderWidth: border,
          borderRadius,
        },
      ]}
      source={src}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 80,
    backgroundColor: '#fff',
  },
  avatar: {
    borderColor: theme.colors.white,
  },
});
