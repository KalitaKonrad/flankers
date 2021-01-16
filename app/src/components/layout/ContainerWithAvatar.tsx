import React, { ComponentProps } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Avatar } from '../shared/Avatar';
import { Container } from './Container';

type ContainerWithAvatarProps = ComponentProps<typeof Container> & {
  avatar: ImageSourcePropType;
  button?: React.ReactNode;
};

const AVATAR_SIZE = 158;

export const ContainerWithAvatar: React.FC<ContainerWithAvatarProps> = (
  props
) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.navbarExtension,
            { backgroundColor: theme.colors.primary },
          ]}
        />
        <View style={styles.avatarWrapper}>
          <Avatar
            containerStyle={{ zIndex: 10 }}
            border={4}
            elevation={6}
            size={AVATAR_SIZE}
            src={props.avatar}
          />
          {props.button && <View style={styles.button}>{props.button}</View>}
        </View>
      </View>
      <View style={styles.contentContainer}>{props.children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
  },
  navbarExtension: {
    width: '100%',
    height: AVATAR_SIZE / 2,
  },
  avatarWrapper: {
    marginTop: -AVATAR_SIZE / 2,
    position: 'relative',
  },
  contentContainer: {
    paddingTop: 24,
  },
  button: {
    elevation: 7,
    position: 'absolute',
    zIndex: 100,
    bottom: 50,
    left: AVATAR_SIZE / 2 + 10,
    backgroundColor: 'red',
  },
});
