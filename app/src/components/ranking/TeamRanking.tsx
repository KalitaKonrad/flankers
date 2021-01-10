import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import { useTeamLeaderboardsQuery } from '../../hooks/useTeamLeaderboardsQuery';
import { TeamProfilePayload } from '../../types/teamProfile';
import { Avatar } from '../shared/Avatar';

interface PlayersRankingProps {}

export const TeamsRanking: React.FC<PlayersRankingProps> = () => {
  const teamList = useTeamLeaderboardsQuery();

  const renderItem = ({ item }: ListRenderItemInfo<TeamProfilePayload>) => (
    <List.Item
      title={item.name}
      titleStyle={styles.playerName}
      description={`${item.elo} punktów rankingowych`}
      left={() => (
        <View style={styles.playerAvatarContainer}>
          <Avatar size={40} borderRadius={8} src={{ uri: item.avatar }} />
        </View>
      )}
    />
  );

  return (
    <FlatList
      data={teamList.data}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(player) => player.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  playerName: {
    fontWeight: 'bold',
  },
  playerAvatarContainer: {
    justifyContent: 'center',
    marginRight: 4,
  },
});
