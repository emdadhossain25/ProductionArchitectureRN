# Test Builds & Distribution Guide

## Simulator Build (Share with Developers)

### Create Simulator Build
```bash
# Build for simulator
cd ios
xcodebuild -workspace ProductionArchitectureRN.xcworkspace \
  -scheme ProductionArchitectureRN \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath ./build

# Find the .app file
find ./build -name "*.app"

# Compress for sharing
cd build/Build/Products/Debug-iphonesimulator/
zip -r ProductionArchitectureRN.app.zip ProductionArchitectureRN.app
```

### Install on Another Mac
```bash
# Recipient drags .app to their simulator
xcrun simctl install booted ProductionArchitectureRN.app
```

## TestFlight Build (Share with Testers)

### Step 1: Archive in Xcode
```bash
# Open workspace
open ios/ProductionArchitectureRN.xcworkspace

# In Xcode:
1. Select "Any iOS Device" as target
2. Product → Archive (wait 5-10 min)
3. Window → Organizer
4. Select archive → Distribute App
5. Choose "App Store Connect"
6. Upload (wait 5-15 min for processing)
```

### Step 2: Add Testers in App Store Connect
```bash
1. Go to appstoreconnect.apple.com
2. My Apps → Your App
3. TestFlight tab
4. Add Internal/External Testers
5. Send invite emails
6. Testers get link to install TestFlight
```

## Ad Hoc Build (Share without TestFlight)

### Create Ad Hoc IPA
```bash
1. Xcode → Product → Archive
2. Distribute App → Ad Hoc
3. Select devices to include
4. Export IPA file
5. Share IPA + mobileprovision file
```

### Install Ad Hoc Build
```bash
# Testers need:
1. Device UDID registered in your developer account
2. Install via Xcode or third-party tools
3. Trust developer certificate on device
```

## Quick Test Build (Development)

### For Connected Device
```bash
# Fastest method for testing
npm run ios
# or
npx react-native run-ios --device "Device Name"
```

## Build Types Comparison

| Type | Speed | Users | Expiry | Cost |
|------|-------|-------|--------|------|
| Simulator | 5 min | Devs only | None | Free |
| Development | 2 min | Connected device | 7 days | Free |
| Ad Hoc | 10 min | 100 devices | 1 year | $99/year |
| TestFlight | 15 min | 10k testers | 90 days | $99/year |
| App Store | 30 min | Everyone | None | $99/year |

## Recommended Flow

1. Development: Test on your device
2. Simulator build: Share with team developers
3. TestFlight: Share with beta testers
4. App Store: Public release

