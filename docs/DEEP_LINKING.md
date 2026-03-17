# Deep Linking Configuration

## iOS Setup

1. Open Xcode workspace:
   ios/ProductionArchitectureRN.xcworkspace

2. Select project → Signing & Capabilities

3. Add Associated Domains capability

4. Add domain: applinks:yourapp.com

5. Update Info.plist:
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleURLSchemes</key>
       <array>
         <string>productionarch</string>
       </array>
     </dict>
   </array>

## URL Schemes

productionarch://home
productionarch://profile
productionarch://settings

## Navigation Config

Add linking prop to NavigationContainer in RootNavigator.js
