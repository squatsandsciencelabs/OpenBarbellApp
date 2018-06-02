import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
    CHANGE_TAB,
    STORE_INITIALIZED,
} from 'app/configs+constants/ActionTypes';

import OpenBarbellConfig from 'app/configs+constants/OpenBarbellConfig.json';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/DateUtils';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

const EndOldWorkoutSaga = function * EndOldWorkoutSaga() {
    yield all([
        takeEvery(CHANGE_TAB, endOldWorkout),
        takeEvery(STORE_INITIALIZED, endOldWorkout)        
    ]);
};

function* endOldWorkout() {
    // check end time
    var endTime = yield select(SetsSelectors.lastWorkoutRepTime);
    console.tron.log("End time originally " + endTime);
    endTime = DateUtils.getDate(endTime);
    if (endTime === null) {
        return;
    }

    // compare
    var currentTime = new Date();
    var timeDifference = Math.abs(currentTime - endTime);
    console.tron.log("Time difference is " + timeDifference + " comparing " + endTime + " against " + currentTime + " with config timer " + OpenBarbellConfig.endWorkoutTimer);

    const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);    
    // error
    if (isLoggedIn) {
        if (timeDifference >= OpenBarbellConfig.endWorkoutTimer) {
            yield put(WorkoutActionCreators.autoEndWorkout());
            Alert.alert("Ending Workout", "You can find your last workout on the History screen.");
        }
    } else {
        if (timeDifference >= OpenBarbellConfig.endWorkoutTimer) {
            yield put(WorkoutActionCreators.autoEndWorkout());
        }
    }
};

export default EndOldWorkoutSaga;
