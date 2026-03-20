#!/bin/bash
# Archive for TestFlight

echo "Opening Xcode for TestFlight archive..."
echo ""
echo "Steps in Xcode:"
echo "1. Select 'Any iOS Device' as target"
echo "2. Product → Archive"
echo "3. Wait for archive to complete"
echo "4. Window → Organizer"
echo "5. Distribute App → App Store Connect"
echo "6. Upload"
echo ""
echo "Then go to App Store Connect to add testers"

open ios/ProductionArchitectureRN.xcworkspace
