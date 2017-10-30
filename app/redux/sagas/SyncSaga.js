import { take, call, select, put, fork, cancelled, cancel } from 'redux-saga/effects';

import {
    LOGOUT,
    TOKENS_READY,
    CHANGE_TAB,
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
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import Validator from 'app/utility/transforms/Validator';
import * as Analytics from 'app/services/Analytics';

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
            CHANGE_TAB,
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
            const state = yield select();
            logSyncIgnoredAnalytics(state);
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
            const initialRevision = yield select(SetsSelectors.getRevision);            
            const accessToken = yield select(AuthSelectors.getAccessToken);
            const lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
            const validator = new Validator(accessToken, lastRefreshDate);
           
            const json = yield call(API.postUpdatedSetData, sets, validator);
            yield put(SetsActionCreators.finishedUploadingSets(json.revision));
            yield call(pullUpdates, initialRevision);
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
function* pullUpdates(previousRevision=null) {
    var revision = yield select(SetsSelectors.getRevision);    
    const accessToken = yield select(AuthSelectors.getAccessToken);
    const lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
    const validator = new Validator(accessToken, lastRefreshDate);

    // check how many changes occured since
    if (previousRevision !== null && revision - previousRevision > 1) {
        console.tron.log("You just synced but the revision difference is too large, enforce a new sync");
        revision = previousRevision;
    }

    try {
        // sync
        const json = yield call(API.sync, revision, validator);
        if (json !== undefined) {
            yield put(SetsActionCreators.updateSetDataFromServer(json.revision, json.sets));
        } else {
            yield put(SettingsActionCreators.updateSyncDate());
        }
    } catch(error) {
        // error
        if (error.type !== undefined) {            
            yield put(error);
        }
        console.tron.log(JSON.stringify(error));
    }
}

// ANALYTICS

const logSyncIgnoredAnalytics = (state) => {
    Analytics.logEventWithAppState('sync_ignored', {
    }, state);
};    

export default SyncSaga;
