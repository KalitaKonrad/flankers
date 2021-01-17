import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { List } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';

import { theme } from '../../theme';
import { InvitePayload } from '../../types/inviteResponse';
import { AppButton } from '../shared/AppButton';
import { Avatar } from '../shared/Avatar';

interface TeamInvitesProps {
  invites: InvitePayload[];
  modalRef: MutableRefObject<BottomSheet | null>;
  setAcceptToken: Dispatch<SetStateAction<string>>;
  setDeclineToken: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
}

export const TeamInvitesList: React.FC<TeamInvitesProps> = ({
  invites,
  style,
  modalRef,
  setAcceptToken,
  setDeclineToken,
}) => {
  const onInviteClick = (acceptToken: string, declineToken: string) => {
    modalRef?.current?.snapTo(0);
    setAcceptToken(acceptToken);
    setDeclineToken(declineToken);
  };

  const renderItem = ({ item }: ListRenderItemInfo<InvitePayload>) => (
    <List.Item
      title={item.team_name}
      titleStyle={styles.invitedByEmail}
      description={item.team_description}
      style={styles.itemContainer}
      left={() => (
        <View style={styles.memberAvatarContainer}>
          <Avatar size={40} borderRadius={8} src={{ uri: item.team_avatar }} />
        </View>
      )}
      right={() => (
        <View style={styles.buttonContainer}>
          <AppButton
            style={styles.joinButton}
            mode="contained"
            onPress={() => onInviteClick(item.accept_token, item.deny_token)}>
            Dołącz
          </AppButton>
        </View>
      )}
    />
  );

  return (
    <FlatList
      data={invites}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: theme.colors.lightGray,
    marginVertical: 8,
    height: 80,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  invitedByEmail: {
    fontWeight: 'bold',
  },
  joinButton: {
    // height: 40,
  },
  memberAvatarContainer: {
    justifyContent: 'center',
    marginRight: 4,
  },
});
