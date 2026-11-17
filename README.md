# ROSHA Android starter

This is the first installable Android project scaffold for ROSHA.

## What is included
- Arabic RTL-oriented starter interface with red/gold ROSHA branding.
- Camera launch using Expo Image Picker.
- Photo/video library selection.
- Local preview of the selected media.
- EAS configuration for producing an Android APK.

## Important current limitations
This is a starter build, not yet a complete global social network. Publishing, public feeds, email/phone authentication, SMS verification, comments, likes, follows, cloud video storage, music licensing/search, and AI video generation require backend services and provider credentials. The current buttons explain which backend features are not connected yet.

## Build an APK
1. Install Node.js and EAS CLI on a computer.
2. In this project folder run `npm install`.
3. Run `npx eas login` and sign in to an Expo account.
4. Run `npx eas build:configure`.
5. Run `npx eas build --platform android --profile preview`.
6. When the cloud build finishes, open the build link and download the APK to the Samsung phone.

The APK build runs in Expo's cloud service; it cannot be produced merely by copying App.js into a browser preview.
