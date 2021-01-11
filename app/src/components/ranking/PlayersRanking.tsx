import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';

import { UserProfilePayload } from '../../types/userProfilePayload';
import { Avatar } from '../shared/Avatar';

interface PlayersRankingProps {
  players: UserProfilePayload[];
  pageNumber: number;
  userId: number;
  onEndReached(): void;
}

export const PlayersRanking: React.FC<PlayersRankingProps> = ({
  players,
  pageNumber,
  userId,
  onEndReached,
}) => {
  const theme = useTheme();

  const [onEndReachedState, setOnEndReachedState] = useState(false);

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<UserProfilePayload>) => (
    <List.Item
      title={item.name}
      titleStyle={styles.playerName}
      description={`${item.elo} punktów rankingowych`}
      left={() => (
        <View style={styles.playerAvatarContainer}>
          <Avatar size={40} borderRadius={8} src={{ uri: item.avatar }} />
        </View>
      )}
      right={() => (
        <Text style={styles.rightIndexStyle}>
          #{index + (pageNumber - 1) * 10 + 1}
        </Text>
      )}
      style={
        item.id === userId
          ? {
              backgroundColor: theme.colors.primary,
              borderRadius: 8,
              opacity: 0.5,
            }
          : { backgroundColor: theme.colors.white }
      }
    />
  );

  return (
    <FlatList
      data={players}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(player) => player.id.toString()}
      onEndReached={() => {
        setOnEndReachedState(true);
        onEndReached();
      }}
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
  rightIndexStyle: {
    fontWeight: 'bold',
    textAlign: 'justify',
    marginRight: 12,
    paddingTop: 6,
  },
});
