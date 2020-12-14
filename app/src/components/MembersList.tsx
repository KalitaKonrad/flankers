import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';

import { UserProfile } from '../hooks/useUserProfile';
import { Player } from '../types/player';
import MyAvatar from './shared/MyAvatar';
// import { TeamMembersResponse } from '../hooks/useTeamManage';

interface MemberListProps {
  name: string;
  teamMembers: UserProfile[];
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  console.log('ooooooooooooooooooooooooooooooooooo', props.teamMembers);
  if (!props.teamMembers) {
    console.log('NIE RENDERUJE');
    return <Text>MEMEBERS</Text>;
  }
  console.log('RENDERUJE');
  return (
    <View>
      {(props.teamMembers ?? []).map((element, index) => (
        <List.Item
          key={element.id}
          title={element.name}
          description="ranking points"
          left={(leftProps) => <List.Icon {...leftProps} icon="star" />}
        />
      ))}
    </View>
  );
};
