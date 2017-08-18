# INSTALLATION

* install react (https://facebook.github.io/react-native/docs/getting-started.html)
* git clone https://github.com/squatsandsciencelabs/OpenBarbellApp.git
* npm install
* create android/local.properties and point it at your Android SDK `sdk.dir = /Users/SquatsAndScience/Library/Android/sdk`
* `cd ios && carthage update` to install MixPanel
* set up provisioning profiles in XCode 

# RUNNING IT

* react-native run-ios
* react-native run-android

# DEBUGGING TIPS

* Install Reactotron https://github.com/infinitered/reactotron/blob/master/docs/installing.md which will allow you to sniff network requests and see the state of the Redux store.
* Optionally, use VSCode with React Native extensions https://github.com/Microsoft/vscode-react-native as when set up properly you have breakpoints.

# CODEBASE PRACTICES

* Follow the feature folder structure. Features include components, containers, and action creators.
* As a real of thumb, use Sagas for async operations. Try to keep Thunks when you need data from the store.
* Unit tests have not been added yet, but tests should go in a separate `Tests` folder.
* Generally, aim for fewer actions to reduce the number of dispatches and rerenders for performance purposes. One action can be set up such that multiple reducers will react to it.
* Actions should all have an Action Creator. Reason being, it makes it clear where all of them are in the app and it simplifies analytics.
* Action naming convention wise, use present and dismiss for popups, save for saving permanently to the store, and update for changes to the store that won't persist
* Use selectors rather than manually access sub properties of the state. For example, instead of doing state.auth.accessToken, use the AuthSelector's getAccessToken. Each of these selectors should start from the root state. In other words, always pass in the root state to the selector, not `state.sets`
* It may be possible to use selector caching via the reselect library to speed up the History screen, which is very slow right now.

# IMPORTANT NOTES

A development version of the keystore and Google Sign In keys have been included in the repository to make getting started easier. The app is also pointed at the development version of the server, which in turn uses a development database.

Be careful when using react-native link. It duplicates imports for the React Native Google Sign In and React Native Device Info Libraries which will cause builds to fail. The solution is to REMOVE the additional Google Sign In and Device Info changes to the Android project after running link. If you have to use react-native link, use it only on the new packages that you just installed.

For Android, run it on device rather than the emulator. Bluetooth requirements cause issues.

Unit tests have not been added yet; they are on the roadmap.