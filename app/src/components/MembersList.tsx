import React from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { UserProfile } from '../hooks/useUserProfile';

interface MemberListProps {
  name: string;
  teamMembers: UserProfile[];
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  if (!props.teamMembers) {
    console.log('NIE RENDERUJE');
    return <Text>MEMEBERS</Text>;
  }
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
