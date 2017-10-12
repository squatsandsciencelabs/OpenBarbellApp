import {
    AppState
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

var state = AppState.currentState;

export default function (store) {
    AppState.addEventListener('change', (nextAppState) => {
        if (state.match(/inactive|background/) && nextAppState === 'active') {
            store.dispatch(AppStateActionCreators.unlockedScreen());
        } else {
            store.dispatch(AppStateActionCreators.lockedScreen());
        }
        state = nextAppState;
    });
};
