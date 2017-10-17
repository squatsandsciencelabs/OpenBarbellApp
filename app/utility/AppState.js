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
        } else if (state.match(/active/) && nextAppState === 'background') {
            store.dispatch(AppStateActionCreators.lockedScreen());
        } else if (state.match(/active/) && nextAppState === 'inactive') {
            store.dispatch(AppStateActionCreators.multiTask());
        }
        state = nextAppState;
    });
};
