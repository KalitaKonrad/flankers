import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import { UserProfilePayload } from '../../types/userProfilePayload';
import { Avatar } from '../shared/Avatar';

interface PlayersRankingProps {
  players: UserProfilePayload[];
}

export const PlayersRanking: React.FC<PlayersRankingProps> = ({ players }) => {
  const renderItem = ({ item }: ListRenderItemInfo<UserProfilePayload>) => (
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
      data={players}
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
