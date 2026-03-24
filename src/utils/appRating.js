import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATING_KEY = '@app_rating_requested';
const APP_STORE_ID = 'YOUR_APP_ID';

export const requestRating = async () => {
  const hasRequested = await AsyncStorage.getItem(RATING_KEY);
  if (hasRequested) return;

  const url = Platform.select({
    ios: `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}?action=write-review`,
    android: `market://details?id=com.yourapp`,
  });

  await AsyncStorage.setItem(RATING_KEY, 'true');
  Linking.openURL(url);
};

export const shouldShowRating = async (minSessions = 5) => {
  const sessions = await AsyncStorage.getItem('@session_count');
  return parseInt(sessions || '0') >= minSessions;
};
