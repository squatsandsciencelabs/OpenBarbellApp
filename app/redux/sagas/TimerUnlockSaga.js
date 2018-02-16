import { take, put } from 'redux-saga/effects';
import { Platform } from 'react-native';

import { 
    UNLOCKED_SCREEN
} from 'app/configs+constants/ActionTypes';

import * as TimerActionCreators from 'app/redux/shared_actions/TimerActionCreators';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const TimerUnlockSaga = function * TimerSaga() {
    if (Platform.OS === 'ios') {
        while (true) {
            yield take(UNLOCKED_SCREEN);
            yield put(TimerActionCreators.sanityCheckTimer());
        }
    }
};

export default TimerUnlockSaga;
