import { Platform } from 'react-native';

const DEV_WS_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const WS_URL = `ws://${DEV_WS_HOST}:8080`;
