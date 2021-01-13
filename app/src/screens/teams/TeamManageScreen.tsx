import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = () => {
  const userProfile = useUserProfileQuery();
  const membersList = useTeamMembersQuery(userProfile.data?.current_team_id);
  const [showMatches, setShowMatches] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  });

  const onAvatarButtonClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <ContainerWithAvatar
      avatar={{ uri: userProfile.data?.teams[0].versioned_avatar }}>
      <AppButton
        mode="contained"
        style={{
          backgroundColor: theme.colors.secondary,
          width: '30%',
          position: 'absolute',
        }}
        onPress={onAvatarButtonClick}>
        Zmień
      </AppButton>
      <View style={styles.meta}>
        <AppText variant="h1">{userProfile.data?.teams?.[0]?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: 1000</AppText>
      </View>
      <View style={styles.switch}>
        <Switch
          leftLabel="Członkowie"
          rightLabel="Mecze"
          onSwitchToLeft={() => setShowMatches(false)}
          onSwitchToRight={() => setShowMatches(true)}
        />
      </View>
      {showMatches && <MatchHistoryList matchHistory={[]} />}
      {!showMatches && membersList.isSuccess && (
        <TeamMemberList members={membersList.data!} />
      )}
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
  switch: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
