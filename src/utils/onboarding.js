import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@onboarding_completed';

export const isOnboardingComplete = async () => {
  const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
  return completed === 'true';
};

export const completeOnboarding = async () => {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
};

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
};

export const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Welcome to Production Arch',
    description: 'Build production-ready React Native apps',
    icon: '🚀',
  },
  {
    id: '2',
    title: 'Offline Support',
    description: 'Work seamlessly without internet connection',
    icon: '📴',
  },
  {
    id: '3',
    title: 'Performance Optimized',
    description: 'Fast, smooth, and responsive experience',
    icon: '⚡',
  },
];
