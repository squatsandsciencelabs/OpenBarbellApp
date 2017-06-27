# INSTALLATION

* install react (https://facebook.github.io/react-native/docs/getting-started.html)
* git clone https://github.com/squatsandsciencelabs/OpenBarbellApp.git
* npm install
* create android/local.properties and point it at your Android SDK `sdk.dir = /Users/SquatsAndScience/Library/Android/sdk`
* set up provisioning profiles in xcode

NOTE: If you have problems installing, there might be issues with React Native 0.45.1 where you might have to downgrade the package.json to 0.44, npm install, then upgrade to 0.45.1, then npm install. See https://github.com/facebook/react-native/issues/7308

# RUNNING IT

* react-native run-ios
* react-native run-android

# IMPORTANT NOTES

A development version of the keystore and Google Sign In keys have been included in the repository to make getting started easier. The app is also pointed at the development version of the server, which in turn uses a development database.

Be careful when using react-native link. It duplicates imports for the React Native Google Sign In and React Native Device Info Libraries which will cause builds to fail. The solution is to REMOVE the additional Google Sign In and Device Info changes to the Android project after running link.

For Android, run it on device rather than the emulator. Bluetooth requirements cause issues.

# MISC

This is currently using React Native 0.42.3 as 0.43 had issues at the time.

Unit tests have not been added yet; they are on the roadmap.

Vscode debugging is not working for real devices. After upgrading to 0.42.3, it doesn't seem to even build to the device. This is a work in progress.
