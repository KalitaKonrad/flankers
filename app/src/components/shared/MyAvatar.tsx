import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { theme } from '../../theme';

interface MyAvatarProps {
  height: number;
  width: number;
  src: string;
  isBorder?: boolean;
}

const tempImage: string = '../../../assets/avatar.png';

const MyAvatar: React.FC<MyAvatarProps> = (props) => (
  <Image
    style={[
      styles.image,
      {
        height: props.height,
        width: props.width,
        borderWidth: props.isBorder ? 4 : 0,
      },
    ]}
    // source={{ uri: props.src }}
    source={require('../../../assets/avatar_women.png')}
  />
);

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.background.white,
  },
});
export default MyAvatar;
