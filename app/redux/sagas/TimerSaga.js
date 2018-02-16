import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import BackgroundTimer from 'react-native-background-timer';

import { 
    PRESENT_WORKOUT_EXERCISE,
    PRESENT_WORKOUT_TAGS,
    PRESENT_WORKOUT_EXPANDED,
    START_EDITING_WORKOUT_RPE,
    START_EDITING_WORKOUT_WEIGHT,
    PRESENT_WORKOUT_VIDEO_RECORDER,
    PRESENT_WORKOUT_VIDEO_PLAYER,
    START_RECORDING_WORKOUT,
    DISMISS_WORKOUT_EXERCISE,
    DISMISS_WORKOUT_TAGS,
    DISMISS_WORKOUT_EXPANDED,
    END_EDITING_WORKOUT_RPE,
    END_EDITING_WORKOUT_WEIGHT,
    DISMISS_WORKOUT_VIDEO_RECORDER,
    DISMISS_WORKOUT_VIDEO_PLAYER,
    STOP_RECORDING_WORKOUT,
    END_SET,
    END_WORKOUT
} from 'app/configs+constants/ActionTypes';

import * as TimerActionCreators from 'app/redux/shared_actions/TimerActionCreators';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const TimerSaga = function * TimerSaga() {
    yield all([
        takeEvery(PRESENT_WORKOUT_EXERCISE, pauseTimer),
        takeEvery(PRESENT_WORKOUT_TAGS, pauseTimer),
        takeEvery(PRESENT_WORKOUT_EXPANDED, pauseTimer),
        takeEvery(START_EDITING_WORKOUT_RPE, pauseTimer),
        takeEvery(START_EDITING_WORKOUT_WEIGHT, pauseTimer),
        takeEvery(PRESENT_WORKOUT_VIDEO_RECORDER, pauseTimer),
        takeEvery(PRESENT_WORKOUT_VIDEO_PLAYER, pauseTimer),
        takeEvery(START_RECORDING_WORKOUT, pauseTimer),
        takeEvery(DISMISS_WORKOUT_EXERCISE, resumeTimer),
        takeEvery(DISMISS_WORKOUT_TAGS, resumeTimer),
        takeEvery(DISMISS_WORKOUT_EXPANDED, resumeTimer),
        takeEvery(END_EDITING_WORKOUT_RPE, resumeTimer),
        takeEvery(END_EDITING_WORKOUT_WEIGHT, resumeTimer),
        takeEvery(DISMISS_WORKOUT_VIDEO_RECORDER, resumeTimer),
        takeEvery(DISMISS_WORKOUT_VIDEO_PLAYER, resumeTimer),
        takeEvery(STOP_RECORDING_WORKOUT, resumeTimer),
        takeEvery(END_SET, stopTimer),
        takeEvery(END_WORKOUT, stopTimer)
    ]);
};

function* pauseTimer() {
    yield put(TimerActionCreators.pauseEndSetTimer());
};

function* resumeTimer() {
    let isEditing = yield select(WorkoutSelectors.getIsEditing);
    if (!isEditing) {
        yield put(TimerActionCreators.resumeEndSetTimer());
    }
    console.tron.log("isEditing on resume check " + isEditing);
};

function* stopTimer() {
    yield put(TimerActionCreators.stopEndSetTimer());
}

export default TimerSaga;
