import { take, put, fork } from 'redux-saga/effects';
import {
    LOGIN_SUCCESS,
    LOGOUT,
    STORE_INITIALIZED,
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    SAVE_WORKOUT_SET_TAGS,
    SAVE_HISTORY_SET_TAGS,
    UPDATE_SET_DATA_FROM_SERVER,
} from 'app/ActionTypes';

import * as SuggestionsActionCreators from 'app/redux/shared_actions/SuggestionsActionCreators';

const SuggestionsSaga = function * SuggestionsSaga() {
    yield fork(exerciseSuggestions);
    yield fork(tagSuggestions);
    yield fork(bothSuggestions);
};

function* exerciseSuggestions() {
    while (true) {
        const action = yield take([SAVE_WORKOUT_SET, SAVE_HISTORY_SET]);
        if ('exercise' in action) {
            yield put(SuggestionsActionCreators.updateExerciseSuggestions());
        }
    }
}

function* tagSuggestions() {
    while (true) {
        yield take([SAVE_WORKOUT_SET_TAGS, SAVE_HISTORY_SET_TAGS]);
        yield put(SuggestionsActionCreators.updateTagSuggestions());
    }
}

function* bothSuggestions() {
    while (true) {
        yield take([LOGIN_SUCCESS, LOGOUT, STORE_INITIALIZED, UPDATE_SET_DATA_FROM_SERVER]);
        yield put(SuggestionsActionCreators.updateExerciseSuggestions());
        yield put(SuggestionsActionCreators.updateTagSuggestions());
    }
}

export default SuggestionsSaga;
