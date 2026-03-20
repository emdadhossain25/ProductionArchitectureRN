# Build Quick Reference

## I Want To Share With Developers
```bash
./scripts/build-simulator.sh
# Share the .zip file
```

## I Want To Share With Beta Testers
```bash
./scripts/archive-testflight.sh
# Follow Xcode prompts
# Add testers in App Store Connect
```

## I Want To Test on My Device
```bash
npm run ios --device
```

## Common Issues

### "No provisioning profile"
Sign in to Xcode with Apple ID. Let Xcode manage signing automatically.

### "Device not found"
Connect device. Trust computer on device. Unlock device.

### "Archive failed"
Clean build: Product → Clean Build Folder. Try again.

### TestFlight processing stuck
Wait 15-30 minutes. Check email for errors from Apple.

## File Locations

Simulator builds: ios/build/Build/Products/Debug-iphonesimulator/
Archives: Xcode → Window → Organizer
IPA exports: ~/Desktop (default)

