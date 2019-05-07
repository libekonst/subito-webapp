The Subito E8 webapp is a rework of the native Android app initially [made with Flutter](https://github.com/AlexLig/ergani_e8_mobile).

The app is written with React, TypeScript, Material Ui and React Router.

## Features:
- Utilizes indexedDB to locally store the user's data
- Provides easy composition of the E8 SMS request and links to the default native messaging app
- Provides export to CSV functionality
- Features routing, offering native-like navigation
- It is accessible by any device and can be added to the home screen
- Uses service workers to provide offline support and seamless over the air updates

## Todo:
- Add prompt to add to home screen
- Add app icon, favicon, splash colors
- Add informational screens about the E8 requests, etc
- Prompt the user to add employer settings more elegantly
- Remove hard coded strings, add to constants
- Stop screens from fetching from idb individually. Some data can be shared. Cache results.
- Improve E8 time errors presentation
- Add back end to allow sharing data between platforms. Utilize idb for caching.

