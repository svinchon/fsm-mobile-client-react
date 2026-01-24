import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zephyr.fsm.mobile.react',
  appName: 'fsm-mobile-client-react',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
