import React from 'react';
import { Button, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

export const theme = {
  ...PaperDefaultTheme,
  colors: {
    primary: '#F4B740',
    secondary: '#FFD789',
    background: {
      lightGray: '#F6F6F6',
      darkGray: '#E8E8E8',
      white: '#FFFFFF',
    },
    black: '#000',
  },
  headerOptions: {
    title: '',
    headerStyle: {
      backgroundColor: '#F4B740',
      height: 55,
      elevation: 0,
    },
    headerTintColor: '#FFFFFF',
  },
  whiteButton: {
    color: '#FFFFFF',
    mode: 'text',
  },
};
