import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import BackgroundTimer from 'react-native-background-timer';

import { 
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    START_EDITING_RPE,
    START_EDITING_WEIGHT,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED,
    DISMISS_EDITING_RPE,
    DISMISS_EDITING_WEIGHT,
} from 'app/ActionTypes';

import * as TimerActionCreators from 'app/redux/shared_actions/TimerActionCreators';

const TimerSaga = function * TimerSaga() {
    yield all([
        takeEvery(PRESENT_WORKOUT_EXERCISE, pauseTimer),
        takeEvery(PRESENT_WORKOUT_TAGS, pauseTimer),
        takeEvery(PRESENT_WORKOUT_EXPANDED, pauseTimer),
        takeEvery(START_EDITING_RPE, pauseTimer),
        takeEvery(START_EDITING_WEIGHT, pauseTimer),
        takeEvery(DISMISS_WORKOUT_EXERCISE, resumeTimer),
        takeEvery(DISMISS_WORKOUT_TAGS, resumeTimer),
        takeEvery(DISMISS_WORKOUT_EXPANDED, resumeTimer),
        takeEvery(DISMISS_EDITING_RPE, resumeTimer),
        takeEvery(DISMISS_EDITING_WEIGHT, resumeTimer),
    ]);
};

function* pauseTimer() {
    yield put(TimerActionCreators.pauseEndSetTimer());
};

function* resumeTimer() {
    yield put(TimerActionCreators.resumeEndSetTimer());
};

export default TimerSaga;