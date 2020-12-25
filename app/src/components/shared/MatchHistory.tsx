import React from 'react';
import { List } from 'react-native-paper';

import { MatchResponse } from '../../types/matchResponse';

interface MatchHistoryProps {
  name: string;
  matchHistory: MatchResponse[];
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({
  name,
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
