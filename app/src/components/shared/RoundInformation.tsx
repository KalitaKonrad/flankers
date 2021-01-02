import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../theme';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

interface RoundInformationProps {
  mainText: string;
  subText?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const RoundInformation: React.FC<RoundInformationProps> = ({
  mainText,
  subText,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <AppText variant="h1" style={styles.mainText}>
        {mainText}
      </AppText>
      {subText && <AppText style={styles.subText}>{subText}</AppText>}
      {buttonText && (
        <AppButton
          mode="contained"
          style={styles.button}
          onPress={onButtonPress}>
          {buttonText}
        </AppButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 196,
    height: 196,
    borderWidth: 3,
    borderRadius: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
  },
  mainText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: theme.colors.darkGray,
  },
  button: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: theme.colors.secondary,
  },
});

export default RoundInformation;
