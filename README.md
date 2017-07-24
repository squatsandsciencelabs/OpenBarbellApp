# INSTALLATION

* install react (https://facebook.github.io/react-native/docs/getting-started.html)
* git clone https://github.com/squatsandsciencelabs/OpenBarbellApp.git
* npm install
* create android/local.properties and point it at your Android SDK `sdk.dir = /Users/SquatsAndScience/Library/Android/sdk`
* `cd ios && carthage update` to install MixPanel
* set up provisioning profiles in xcode 

# RUNNING IT

* react-native run-ios
* react-native run-android

# DEBUGGING TIPS

* Install Reactotron https://github.com/infinitered/reactotron/blob/master/docs/installing.md which will allow you to sniff network requests and see the state of the Redux store. It is also suggested to use Reactotron logs instead of console.logs.
* Optionally, use VSCode with React Native extensions https://github.com/Microsoft/vscode-react-native as when set up properly you have breakpoints.

# IMPORTANT NOTES

A development version of the keystore and Google Sign In keys have been included in the repository to make getting started easier. The app is also pointed at the development version of the server, which in turn uses a development database.

Be careful when using react-native link. It duplicates imports for the React Native Google Sign In and React Native Device Info Libraries which will cause builds to fail. The solution is to REMOVE the additional Google Sign In and Device Info changes to the Android project after running link. If you have to use react-native link, use it only on the new packages that you just installed.

For Android, run it on device rather than the emulator. Bluetooth requirements cause issues.

# MISC

Unit tests have not been added yet; they are on the roadmap.

The codebase will likely move away from Thunks and towards Sagas for side effects.

It is also possible that the codebase will be refactored in the near future to use the Ignite CLI https://github.com/infinitered/ignite.

Vscode debugging is not working for real devices. After upgrading to 0.42.3, it doesn't seem to even build to the device. This is a work in progress.
