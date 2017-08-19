import { takeEvery, select, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import {
    CHANGED_TAB,
    STORE_INITIALIZED
} from 'app/ActionTypes';

import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/transforms/DateUtils';

const EndOldWorkoutSaga = function * EndOldWorkoutSaga() {
    yield all([
        takeEvery(CHANGED_TAB, endOldWorkout),
        takeEvery(STORE_INITIALIZED, endOldWorkout)        
    ]);
};

function* endOldWorkout() {
    // check end time
    var endTime = yield select(SetsSelectors.lastRepTime);
    console.tron.log("End time originally " + endTime);
    endTime = DateUtils.getDate(endTime);
    if (endTime === null) {
        return;
    }

    // compare
    var currentTime = new Date();
    var timeDifference = Math.abs(currentTime - endTime);
    console.tron.log("Time difference is " + timeDifference + " comparing " + endTime + " against " + currentTime + " with config timer " + OpenBarbellConfig.endWorkoutTimer);

    // error
    if (timeDifference >= OpenBarbellConfig.endWorkoutTimer) {
        Alert.alert("Ending workout! You can find your last workout on the History screen.");
        yield put(WorkoutActionCreators.endWorkout());
    }
};

export default EndOldWorkoutSaga;
