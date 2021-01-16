import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { List } from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { UserProfilePayload } from '../../types/userProfilePayload';
import { Avatar } from '../shared/Avatar';

interface TeamMemberListProps {
  members: UserProfilePayload[];
  style?: StyleProp<ViewStyle>;
}

export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  style,
}) => {
  const renderItem = ({ item }: ListRenderItemInfo<UserProfilePayload>) => (
    <List.Item
      title={item.name}
      titleStyle={styles.memberName}
      description={`${item.elo} punktów rankingowych`}
      left={() => (
        <View style={styles.memberAvatarContainer}>
          <Avatar
            size={40}
            borderRadius={8}
            src={{ uri: item.versioned_avatar }}
          />
        </View>
      )}
    />
  );

  return (
    <FlatList
      data={members}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={(member) => member.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  memberName: {
    fontWeight: 'bold',
  },

  memberAvatarContainer: {
    justifyContent: 'center',
    marginRight: 4,
  },
});
