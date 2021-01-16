import * as React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '../../theme';

interface AvatarProps {
  size: number;
  src: ImageSourcePropType;
  border?: number;
  elevation?: number;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const shadow = {
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowRadius: 4,
  shadowOpacity: 1,
  shadowOffset: {
    width: 0,
    height: 4,
  },
};

export const Avatar: React.FC<AvatarProps> = ({
  size,
  src,
  border = 0,
  elevation = 0,
  borderRadius = 100,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          elevation,
          height: size,
          width: size,
          borderRadius,
        },
        Platform.OS === 'ios' && elevation !== undefined ? shadow : {},
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
        source={src}
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
