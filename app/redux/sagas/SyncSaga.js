import { take, call, select, put, fork, cancelled, cancel } from 'redux-saga/effects';

import {
    LOGOUT,
    TOKENS_READY,
    CHANGED_TAB,
    END_WORKOUT,
    SAVE_WORKOUT_REP,
    SAVE_HISTORY_REP,
    SAVE_WORKOUT_SET_TAGS,
    SAVE_HISTORY_SET_TAGS,
    SAVE_WORKOUT_SET,
    SAVE_HISTORY_SET,
    SAVE_HISTORY_VIDEO
} from 'app/ActionTypes';
import API from 'app/services/API';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

const SyncSaga = function * SyncSaga() {
    while (true) {
        // sync
        const task = yield fork(executeSync);        
        
        // cancel on logout
        yield take(LOGOUT);
        yield cancel(task);
    }
};

function* executeSync() {
    while (true) {
        yield take([
            TOKENS_READY,
            CHANGED_TAB,
            END_WORKOUT,
            SAVE_WORKOUT_SET,
            SAVE_HISTORY_SET,
            SAVE_WORKOUT_REP,
            SAVE_HISTORY_REP,
            SAVE_WORKOUT_SET_TAGS,
            SAVE_HISTORY_SET_TAGS,
            SAVE_HISTORY_VIDEO
        ]);

        // login check - do not need to check is uploading as relying on the cancel instead
        const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);    
        if (!isLoggedIn)  {
            console.tron.log("Not logged in, backing out of sync");
        } else {
            // actions
            yield call(pushUpdates);
        }
    }
}

// pushes updates to the server if needed
function* pushUpdates() {
    // valid check
    const sets = yield select(SetsSelectors.getSetsToUpload);
    if (sets.length <= 0) {
        yield call(pullUpdates);
    } else {
        yield put(SetsActionCreators.beginUploadingSets());
        try {
            // upload
            const accessToken = yield select(AuthSelectors.getAccessToken);
            const json = yield call(API.postUpdatedSetData, sets, accessToken);
            yield put(SetsActionCreators.finishedUploadingSets(json.revision));
            yield call(pullUpdates);
        } catch(error) {
            // error
            yield put(SetsActionCreators.failedUploadSets());
            if (error.type !== undefined) {
                yield put(error);
            }
            console.tron.log(JSON.stringify(error));            
        } finally {
            if (yield cancelled()) {
                console.tron.log("Push Updates cancelled");            
                yield put(SetsActionCreators.failedUploadSets());
            }
        }
    }
}

// pull updates from the server
function* pullUpdates() {
    const revision = yield select(SetsSelectors.getRevision);
    const accessToken = yield select(AuthSelectors.getAccessToken);

    try {
        // sync
        const json = yield call(API.sync, revision, accessToken);
        if (json !== undefined) {
            yield put(SetsActionCreators.updateSetDataFromServer(json.revision, json.sets));
        }
    } catch(error) {
        // error
        if (error.type !== undefined) {            
            yield put(error);
        }
        console.tron.log(JSON.stringify(error));
    }
}

export default SyncSaga;
