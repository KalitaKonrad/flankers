import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { theme, TextStyle, ObjectStyle } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamCreateScreen: React.FC<TeamCreateScreenProps> = ({
  navigation,
}) => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  const onPress = () => {
    navigation.push('TeamManage');
  };

  return (
    <>
      <InputScrollView>
        <HeaderWithAvatar color={theme.colors.primary} center>
          <View style={TextStyle.headerWithAvatarTitle}>
            <Text style={TextStyle.headerWithAvatarTitle}>Utwórz zespół</Text>
          </View>
          <View style={ObjectStyle.headerWithAvatarImage}>
            <MyAvatar src="../assets/avatar.png" height={150} width={150} />
          </View>
        </HeaderWithAvatar>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Dane zespołu</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Nazwa użytkownika"
            blurOnSubmit
            selectionColor={theme.colors.primary}
            defaultValue=""
            onChangeText={(text) => setTeamName(text)}
          />
          <TextInput
            style={styles.textMultiLineInputStyle}
            placeholder="Opis"
            blurOnSubmit
            multiline
            selectionColor={theme.colors.primary}
            defaultValue=""
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.background.white}
          onPress={onPress}>
          Utwórz
        </SubmitButton>
      </InputScrollView>
    </>
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
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    borderRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.background.darkGray,
  },
  textMultiLineInputStyle: {
    borderRadius: 12,
    height: 150,
    textAlignVertical: 'top',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.background.darkGray,
  },
});
