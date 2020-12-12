import * as React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { TextStyle, theme } from '../theme';
import MyAvatar from './shared/MyAvatar';

interface PlayersGroupProps {
  firstTeamAvatarList: string[];
  firstTeamName: string;
  secondTeamAvatarList: string[];
  secondTeamName: string;
  notReadyPlayersAvatarList?: string[];
}

export const PlayersGroup: React.FC<PlayersGroupProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.label}>
        <Text style={TextStyle.noteH1}>Zespół {props.firstTeamName}</Text>
      </View>
      <View style={styles.avatarsList}>
        {props.firstTeamAvatarList.map((imgSrc, index) => (
          <MyAvatar height={50} width={50} src={imgSrc} />
        ))}
      </View>

      <View style={styles.label}>
        <Text style={TextStyle.noteH1}>Zespół {props.secondTeamName}</Text>
      </View>
      <View style={styles.avatarsList}>
        {props.secondTeamAvatarList.map((imgSrc, index) => (
          <MyAvatar height={50} width={50} src={imgSrc} />
        ))}
      </View>
      {props.notReadyPlayersAvatarList && (
        <View>
          <View style={styles.label}>
            <Text style={TextStyle.noteH1}>Oczekiwanie na graczy</Text>
          </View>
          <View style={styles.avatarsList}>
            {props.notReadyPlayersAvatarList.map((imgSrc, index) => (
              <MyAvatar height={50} width={50} src={imgSrc} />
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
