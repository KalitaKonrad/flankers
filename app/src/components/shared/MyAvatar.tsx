import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { theme } from '../../theme';

interface MyAvatarProps {
  height: number;
  width: number;
  src: string;
}

const tempImage: string = '../../../assets/avatar.png';

const MyAvatar: React.FC<MyAvatarProps> = (props) => (
  <Image
    style={[styles.image, { height: props.height, width: props.width }]}
    // source={{ uri: props.src }}
    source={require('../../../assets/avatar.png')}
  />
);

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
});
export default MyAvatar;
