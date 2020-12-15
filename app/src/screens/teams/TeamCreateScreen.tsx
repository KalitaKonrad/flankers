import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { useTheme } from 'react-native-paper';

import { AppInput } from '../../components/shared/AppInput';
import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import { MultilineTextInput } from '../../components/shared/MultilineTextInput';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useTeamCreateQuery } from '../../hooks/useTeamCreateQuery';
import { ObjectStyle, TextStyle, theme } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

export const TeamCreateScreen: React.FC<TeamCreateScreenProps> = ({
  navigation,
}) => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  const [mutate, mutation] = useTeamCreateQuery();

  const onPress = () => {
    mutate({ name: teamName, description });
    navigation.push('TeamManage');
  };

  return (
    <InputScrollView>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={TextStyle.headerWithAvatarTitle}>
          <Text style={TextStyle.headerWithAvatarTitle}>Utwórz zespół</Text>
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
        <Text style={[TextStyle.noteH2]}>Dane zespołu</Text>
      </View>
      <View style={styles.container}>
        <AppInput
          style={{ marginBottom: 7 }}
          label="Nazwa zespołu"
          onChangeText={(text) => setTeamName(text)}
        />
        <MultilineTextInput
          label="Opis"
          style={{ marginVertical: 10 }}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <SubmitButton
        backgroundColor={useTheme().colors.primary}
        labelColor={useTheme().colors.white}
        onPress={onPress}>
        Utwórz
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
    backgroundColor: theme.colors.darkGray,
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
    backgroundColor: theme.colors.darkGray,
  },
});
