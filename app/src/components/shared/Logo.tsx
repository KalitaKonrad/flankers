import * as React from 'react';
import { Image } from 'react-native';

export const Logo: React.FC<
  Omit<React.ComponentProps<typeof Image>, 'source'>
> = (props) => (
  <Image {...props} source={require('../../../assets/flankers-logo.png')} />
);
