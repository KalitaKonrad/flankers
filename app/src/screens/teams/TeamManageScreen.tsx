import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { Switch } from '../../components/shared/Switch';
import { ObjectStyle, TextStyle, theme } from '../../theme';
import { TeamScreenStackParamList } from './TeamScreenStack';
type TeamManageScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamManage'>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = ({
  navigation,
}) => {
  const onExit = () => {
    navigation.push('TeamCreate');
  };
  const onSwitch = () => {
    console.log('switched');
  };

  return (
    <>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={styles.title}>
          <Text style={TextStyle.headerWithAvatarTitle}>Zespół</Text>
        </View>
        <View style={{ position: 'absolute', right: 0 }}>
          <Button
            icon="account-multiple-minus"
            mode="text"
            color={theme.colors.background.white}
            onPress={onExit}>
            Opuść
          </Button>
        </View>
        <View style={ObjectStyle.headerWithAvatarImage}>
          <MyAvatar src="../assets/avatar.png" height={150} width={150} />
        </View>
      </HeaderWithAvatar>
      <View style={styles.note}>
        <Text style={[TextStyle.noteH1]}>Nazwa zespołu</Text>
        <Text style={[TextStyle.noteH3]}>Punkty rankingowe: 1000</Text>
      </View>
      <View style={styles.toggle}>
        <Switch leftLabel="Członkowie" rightLabel="Mecze" />
      </View>
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
  matchHistory: {
    display: 'flex',
    top: 90,
  },
  title: {
    position: 'relative',
    alignItems: 'center',
    top: 0,
    color: '#fff',
  },
  toggle: {
    flex: 1,
    top: 70,
  },
});
