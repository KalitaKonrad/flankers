import * as React from 'react';
import { Avatar } from 'react-native-paper';

import { theme } from '../../theme';

const MyAvatar = () => (
  <Avatar.Image
    size={150}
    style={{
      //dziwny filoetowy pasek w lewym gorym rogu, jesli nie uda sie go wyeliminowac border trzeba odrzucic
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: theme.colors.background.white,
    }}
    source={require('../../../assets/avatar.png')}
  />
);
export default MyAvatar;
