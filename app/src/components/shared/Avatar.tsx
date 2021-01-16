import * as React from 'react';
import { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { theme } from '../../theme';

interface AvatarProps {
  size: number;
  src: ImageSourcePropType | undefined | null;
  border?: number;
  elevation?: number;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  size,
  src,
  border = 0,
  elevation = 0,
  borderRadius = 100,
  containerStyle,
  isLoading,
}) => {
  const avatarPlaceholder = require('../../../assets/versioned_initial_avatar.png').toString();

  const imageStyle = useMemo(
    () => ({
      height: size,
      width: size,
      borderWidth: border,
      borderRadius,
    }),
    [border, borderRadius, size]
  );

  const elevatedStyle = useMemo(
    () => ({
      elevation,
      height: size,
      width: size,
      borderRadius,
    }),
    [borderRadius, elevation, size]
  );

  return isLoading ? (
    <SkeletonPlaceholder>
      <View style={[styles.container, elevatedStyle, containerStyle]}>
        <View style={[styles.avatar, imageStyle]} />
      </View>
    </SkeletonPlaceholder>
  ) : (
    <View style={[styles.container, elevatedStyle, containerStyle]}>
      <Image
        style={[styles.avatar, imageStyle]}
        source={src ?? avatarPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 80,
    backgroundColor: '#fff',
  },
  avatar: {
    borderColor: theme.colors.white,
  },
});
