import { take, put, fork } from 'redux-saga/effects';
import {
    LOGIN_SUCCESS,
    LOGOUT,
    STORE_INITIALIZED,
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    SAVE_WORKOUT_SET_TAGS,
    SAVE_HISTORY_SET_TAGS,
} from 'app/ActionTypes';

import * as SuggestionsActionCreators from 'app/redux/shared_actions/SuggestionsActionCreators';

const SuggestionsSaga = function * SuggestionsSaga() {
    yield fork(exerciseSuggestions);
    yield fork(commentSuggestions);
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

function* commentSuggestions() {
    while (true) {
        yield take([SAVE_WORKOUT_SET_TAGS, SAVE_HISTORY_SET_TAGS]);
        yield put(SuggestionsActionCreators.updateCommentSuggestions());
    }
}

function* bothSuggestions() {
    while (true) {
        yield take([LOGIN_SUCCESS, LOGOUT, STORE_INITIALIZED]);
        yield put(SuggestionsActionCreators.updateExerciseSuggestions());
        yield put(SuggestionsActionCreators.updateCommentSuggestions());
    }
}

export default SuggestionsSaga;
