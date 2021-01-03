import 'dotenv/config';

module.exports = {
  expo: {
    name: 'Flankers',
    slug: 'flankers',
    version: '1.0.0',
    extra: {
      apiBaseUrl: process.env.EXPO_API_BASE_URL,
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      avatar: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffaf19',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffaf19',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
