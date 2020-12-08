import React from 'react';
import { List } from 'react-native-paper';

import { Player } from '../types/player';

interface MemberListProps {
  name: string;
  teamMembers: Player[];
}

export const MemberList: React.FC<MemberListProps> = (props) => {
  return (
    <List.Item
      title="Member"
      description="description"
      left={(leftProps) => <List.Icon {...leftProps} icon="star" />}
    />
  );
};
