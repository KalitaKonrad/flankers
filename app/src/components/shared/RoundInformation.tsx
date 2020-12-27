import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TextStyle, theme } from '../../theme';
import { SubmitButton } from './SubmitButton';

interface RoundInformationProps {
  mainText: string;
  subText?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const RoundInformation: React.FC<RoundInformationProps> = ({
  mainText,
  subText,
  buttonText,
  onButtonClick,
}) => {
  return (
    <View style={styles.informationContainer}>
      <View style={styles.informationWrapper}>
        <View style={styles.information}>
          {mainText && (
            <View style={styles.mainTextWrapper}>
              <Text style={styles.mainText}>{mainText}</Text>
              {subText && (
                <View style={styles.subTextWrapper}>
                  <Text style={styles.subText}>{subText}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        {buttonText && (
          <View style={styles.buttonWrapper}>
            <SubmitButton
              labelColor={theme.colors.white}
              backgroundColor={theme.colors.secondary}
              onPress={onButtonClick}>
              {buttonText}
            </SubmitButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 230,
    backgroundColor: theme.colors.white,
  },
  informationWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  information: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.primary,
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextWrapper: {
    position: 'relative',
    display: 'flex',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subTextWrapper: {
    position: 'absolute',
    top: 35,
    right: 0,
    left: 0,
  },
  subText: {
    color: theme.colors.darkGray,
    fontSize: 14,
    textAlign: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: -20,
    right: -10,
  },
});

export default RoundInformation;
