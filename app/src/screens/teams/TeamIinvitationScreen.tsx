import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { ObjectStyle, TextStyle, theme } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamInvitationScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamInvitationScreen: React.FC<TeamInvitationScreenProps> = ({
  navigation,
}) => {
  const [userName, setUsername] = useState('');

  const onPress = () => {
    console.log('wyślij zaproszenie');
  };

  return (
    <InputScrollView>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={TextStyle.headerWithAvatarTitle}>
          <Text style={TextStyle.headerWithAvatarTitle}>Zaproś</Text>
        </View>
        <View style={ObjectStyle.headerWithAvatarImage}>
          <MyAvatar
            src="../assets/avatar.png"
            height={150}
            width={150}
            isBorder
          />
        </View>
      </HeaderWithAvatar>

      <View style={styles.note}>
        <Text style={[TextStyle.noteH2]}>Zaproś użytkownika</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Nazwa użytkownika"
          blurOnSubmit
          selectionColor={theme.colors.primary}
          defaultValue=""
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <SubmitButton
        backgroundColor={theme.colors.primary}
        labelColor={theme.colors.white}
        onPress={onPress}>
        Prześlij zaproszenie
      </SubmitButton>
    </InputScrollView>
  );
};

const styles = StyleSheet.create({
  note: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
  },
  container: {
    top: 90,
    height: 350,
  },
  textInputStyle: {
    borderRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
});
