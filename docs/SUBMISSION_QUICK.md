# App Store Submission Quick Guide

## Step 1: Prepare Build
```bash
# Update version
./scripts/version.sh minor

# Archive
open ios/ProductionArchitectureRN.xcworkspace
# Product → Archive
```

## Step 2: Upload
```bash
# In Organizer:
# Distribute App → App Store Connect → Upload
# Wait 15-30 minutes for processing
```

## Step 3: Complete Metadata
```bash
# Go to: appstoreconnect.apple.com
# Fill all required fields
# Add screenshots
# Select build
```

## Step 4: Submit
```bash
# Click "Submit for Review"
# Wait 24-48 hours
# Check email for status
```

## Required URLs
- Support: https://yourapp.com/support
- Privacy: https://yourapp.com/privacy
- Marketing: https://yourapp.com (optional)

## Screenshot Sizes
- 6.7": 1290 x 2796
- 6.5": 1242 x 2688
- 5.5": 1242 x 2208

