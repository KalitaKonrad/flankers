import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { theme, TextStyle, ObjectStyle } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamCreateScreen: React.FC<TeamCreateScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <InputScrollView>
        <HeaderWithAvatar color={theme.colors.primary} center>
          <View style={TextStyle.headerWithAvatarTitle}>
            <Text style={TextStyle.headerWithAvatarTitle}>Zespół</Text>
          </View>
          <View style={ObjectStyle.headerWithAvatarImage}>
            <MyAvatar height={150} width={150} />
          </View>
        </HeaderWithAvatar>
      </InputScrollView>
    </>
  );
};
