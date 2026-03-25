# Onboarding Setup

## Implementation

Add to RootNavigator.js:
```javascript
import { isOnboardingComplete } from '../utils/onboarding';

const [showOnboarding, setShowOnboarding] = useState(true);

useEffect(() => {
  checkOnboarding();
}, []);

const checkOnboarding = async () => {
  const completed = await isOnboardingComplete();
  setShowOnboarding(!completed);
};

if (showOnboarding) {
  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
}

const handleOnboardingComplete = async () => {
  await completeOnboarding();
  setShowOnboarding(false);
};
```

## Onboarding Slides

Three slides configured:
1. Welcome message
2. Offline support feature
3. Performance highlight

## Reset Onboarding

For testing: await resetOnboarding();

