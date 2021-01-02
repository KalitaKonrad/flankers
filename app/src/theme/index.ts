import { StackNavigationOptions } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      secondary: string;
      lightGray: string;
      darkGray: string;
      white: string;
      black: string;
    }

    interface Theme {
      tallHeader: any;
      headerOptions: any;
      headerButtonLabel: {
        fontSize: number;
        inverseColor: string;
      };
    }
  }
}

const fontConfig = {
  default: {
    thin: {
      fontFamily: 'Inter_100Thin',
      fontWeight: '100' as '100',
    },
    light: {
      fontFamily: 'Inter_300Light',
      fontWeight: '300' as '300',
    },
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: '500' as '500',
    },
  },
};

const colors = {
  primary: '#ffaf19',
  secondary: '#FFD789',
  lightGray: '#F6F6F6',
  darkGray: '#E8E8E8',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  placeholder: '#BDBDBD',
  error: '#EB5757',
};

export const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    ...colors,
  },
  headerButtonLabel: {
    fontSize: 14,
    inverseColor: colors.primary,
  },
  tallHeader: {
    headerTitleAlign: 'center',
    headerStyle: {
      elevation: 0,
      height: 180,
      backgroundColor: colors.primary,
    },
    headerTitleStyle: {
      color: colors.white,
      fontSize: 30,
      textAlign: 'center',
    },
    headerTitleContainerStyle: {
      height: '100%',
    },
    headerLeftContainerStyle: {
      justifyContent: 'flex-start',
      marginLeft: 4,
    },
    headerRightContainerStyle: {
      justifyContent: 'flex-start',
      marginRight: 4,
    },
  },
  headerOptions: {
    title: '',
    headerStyle: {
      backgroundColor: colors.primary,
      height: 55,
      elevation: 0,
    },
    headerTintColor: colors.white,
  },
};

export const TextStyle = StyleSheet.create({
  noteH1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noteH2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noteH3: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const ObjectStyle = StyleSheet.create({
  headerWithAvatarImage: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -60,
  },
});
