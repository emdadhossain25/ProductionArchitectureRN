# Release Management Process

Project Path: /Users/emdadhossain/Code/react-native/ProductionArchitecture/ProductionArchitectureRN

---

## Version Strategy

Following Semantic Versioning (semver):
- MAJOR: Breaking changes (1.0.0 → 2.0.0)
- MINOR: New features (1.0.0 → 1.1.0)
- PATCH: Bug fixes (1.0.0 → 1.0.1)

---

## Release Checklist

### Pre-Release
- [ ] All tests pass
- [ ] Manual testing complete
- [ ] No console errors
- [ ] Performance verified
- [ ] Documentation updated

### Version Bump
```bash
# Patch release (bug fixes)
./scripts/version.sh patch

# Minor release (new features)
./scripts/version.sh minor

# Major release (breaking changes)
./scripts/version.sh major
```

### Build
```bash
# iOS Archive
cd ios
pod install
cd ..
npx react-native run-ios --configuration Release

# Open Xcode for archive
open ios/ProductionArchitectureRN.xcworkspace
# Product → Archive
```

### Commit & Tag
```bash
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

---

## Build Numbers

iOS Build Number: Auto-incremented with each version bump
Format: Integer (1, 2, 3, ...)
Location: ios/ProductionArchitectureRN/Info.plist

---

## Release Notes Template
```markdown
# Version 1.0.0

Release Date: 2026-03-XX

## New Features
- Feature 1 description
- Feature 2 description

## Improvements
- Improvement 1
- Improvement 2

## Bug Fixes
- Fix 1
- Fix 2

## Breaking Changes
- None
```

---

## Distribution

### TestFlight (Beta)
1. Archive in Xcode
2. Upload to App Store Connect
3. Add beta testers
4. Send notifications

### App Store (Production)
1. Create new version in App Store Connect
2. Upload archive
3. Fill metadata
4. Submit for review
5. Release after approval

---

Last Updated: Day 61/100
