#!/bin/bash
# Build for iOS Simulator

echo "Building for iOS Simulator..."

cd ios

xcodebuild -workspace ProductionArchitectureRN.xcworkspace \
  -scheme ProductionArchitectureRN \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath ./build

APP_PATH=$(find ./build -name "ProductionArchitectureRN.app" | head -1)

if [ -z "$APP_PATH" ]; then
  echo "Error: Build failed"
  exit 1
fi

echo "Build successful: $APP_PATH"

# Create zip
cd "$(dirname "$APP_PATH")"
zip -r ProductionArchitectureRN-simulator.zip ProductionArchitectureRN.app

echo "Simulator build ready: ProductionArchitectureRN-simulator.zip"
echo "Share this file with developers"
