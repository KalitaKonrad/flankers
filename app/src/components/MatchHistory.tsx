import React from 'react';
import { View } from 'react-native';

import { Match } from '../types/match';

interface MatchHistoryProps {
  name: string;
  matchHistory: Match[];
}

export const MatchHistory: React.FC<MatchHistoryProps> = ({
  name,
  matchHistory,
}) => {
  return <View>match history</View>;
};
