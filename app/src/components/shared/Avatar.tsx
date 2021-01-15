import * as React from 'react';
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

  return isLoading ? (
    <SkeletonPlaceholder>
      <View
        style={[
          styles.container,
          {
            elevation,
            height: size,
            width: size,
            borderRadius,
          },
          containerStyle,
        ]}>
        <View
          style={[
            styles.avatar,
            {
              height: size,
              width: size,
              borderWidth: border,
              borderRadius,
            },
          ]}
        />
      </View>
    </SkeletonPlaceholder>
  ) : (
    <View
      style={[
        styles.container,
        {
          elevation,
          height: size,
          width: size,
          borderRadius,
        },
        containerStyle,
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
