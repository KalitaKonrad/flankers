import React from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';

import { UserProfilePayload } from '../hooks/useUserProfile';

interface MemberListProps {
  name: string;
  teamMembers: UserProfilePayload[];
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  if (!props.teamMembers) {
    return <Text>Wczytywanie</Text>;
  }
  return (
    <View>
      {props.teamMembers.map((element, index) => (
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
