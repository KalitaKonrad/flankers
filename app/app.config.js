import 'dotenv/config';

module.exports = {
  expo: {
    name: 'Flankers',
    slug: 'flankers',
    version: '1.0.0',
    extra: {
      apiBaseUrl: process.env.EXPO_API_BASE_URL,
      webSocket: {
        host: process.env.EXPO_WEBSOCKET_HOST,
        port: process.env.EXPO_WEBSOCKET_PORT,
        pusherKey: process.env.EXPO_PUSHER_APP_KEY,
        pusherCluster: process.env.EXPO_PUSHER_APP_CLUSTER,
      },
      stripe: {
        publicKey: process.env.EXPO_STRIPE_PUBLIC_KEY,
      },
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
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
      package: 'pl.flankers.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
