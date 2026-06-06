import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eldemy.student',
  appName: 'Eldemy',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // Web Client ID - digunakan saat ionic serve di browser
      clientId:
        '928122069790-jh6uvrfqqn6hq6mlj40isk3j5os0e993.apps.googleusercontent.com',
      // Server Client ID - digunakan native Android untuk request token ke backend
      serverClientId:
        '928122069790-jh6uvrfqqn6hq6mlj40isk3j5os0e993.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
