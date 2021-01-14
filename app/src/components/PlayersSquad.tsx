import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from './shared/Avatar';

interface PlayersSquadProps {
  firstTeamAvatarList: string[];
  firstTeamName: string;
  secondTeamAvatarList: string[];
  secondTeamName: string;
  notReadyPlayersAvatarList?: string[];
}

export const PlayersSquad: React.FC<PlayersSquadProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.label}>
        <Text>Zespół {props.firstTeamName}</Text>
      </View>
      <View style={styles.avatarsList}>
        {props.firstTeamAvatarList.map((imgSrc, index) => (
          <Avatar size={50} src={{ uri: imgSrc }} key={index} />
        ))}
      </View>

      <View style={styles.label}>
        <Text>Zespół {props.secondTeamName}</Text>
      </View>
      <View style={styles.avatarsList}>
        {props.secondTeamAvatarList.map((imgSrc, index) => (
          <Avatar size={50} src={{ uri: imgSrc }} key={index} />
        ))}
      </View>
      {props.notReadyPlayersAvatarList && (
        <View>
          <View style={styles.label}>
            <Text>Oczekiwanie na graczy</Text>
          </View>
          <View style={styles.avatarsList}>
            {props.notReadyPlayersAvatarList.map((imgSrc, index) => (
              <Avatar size={50} src={{ uri: imgSrc }} key={index} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    justifyContent: 'center',
    marginBottom: 18,
  },
  avatarsList: {
    flexDirection: 'row',
    margin: 5,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 40,
  },
});
