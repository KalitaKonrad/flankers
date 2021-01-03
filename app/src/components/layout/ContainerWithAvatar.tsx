import React, { ComponentProps } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import { Avatar } from '../shared/Avatar';
import { Container } from './Container';

type ContainerWithAvatarProps = ComponentProps<typeof Container> & {
  avatar: ImageSourcePropType;
};

export const ContainerWithAvatar: React.FC<ContainerWithAvatarProps> = (
  props
) => {
  return (
    <Container {...props}>
      <View style={styles.avatarContainer}>
        <Avatar border={4} elevation={6} size={158} src={props.avatar} />
      </View>
      <View style={styles.contentContainer}>{props.children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    top: -79,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 90,
  },
  contentContainer: {
    paddingTop: 92,
  },
});
