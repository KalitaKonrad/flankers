import React from 'react';
import { List } from 'react-native-paper';

import { Match } from '../../types/match';

interface MatchHistoryListProps {
  matchHistory: Match[];
}

export const MatchHistoryList: React.FC<MatchHistoryListProps> = ({
  matchHistory,
}) => {
  return (
    <List.Item
      title="Match"
      description="Result"
      left={(props) => <List.Icon {...props} icon="star" />}
    />
  );
};
