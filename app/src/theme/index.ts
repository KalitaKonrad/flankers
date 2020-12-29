import { StyleSheet } from 'react-native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      lightGray: string;
      darkGray: string;
      white: string;
      black: string;
    }

    interface Theme {
      headerOptions: {
        title: string;
        headerStyle: {
          backgroundColor: string;
          height: number;
          elevation: number;
        };
        headerTintColor: string;
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

export const theme = {
  ...PaperDefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#ffaf19',
    secondary: '#FFD789',
    lightGray: '#F6F6F6',
    darkGray: '#E8E8E8',
    white: '#FFFFFF',
    black: '#000000',
    background: '#FFFFFF',
    placeholder: '#BDBDBD',
    error: '#EB5757',
  },
  headerOptions: {
    title: '',
    headerStyle: {
      backgroundColor: '#ffaf19',
      height: 55,
      elevation: 0,
    },
    headerTintColor: '#FFFFFF',
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
  headerWithAvatarTitle: {
    position: 'relative',
    top: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.95,
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
