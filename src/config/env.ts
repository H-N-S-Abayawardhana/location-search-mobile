import { Platform } from 'react-native';

// The backend has no public host yet, so this is a plain constant rather
// than a build-time .env value. Update it to match how you're running things:
//  - Android emulator: host machine's localhost is reachable at 10.0.2.2
//  - iOS simulator: localhost works as-is
//  - physical device: use your machine's LAN IP (e.g. 192.168.x.x)
const DEV_WS_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const WS_URL = `ws://${DEV_WS_HOST}:8080`;
