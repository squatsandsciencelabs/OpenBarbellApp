import { take, call, select, put, fork, cancelled, cancel } from 'redux-saga/effects';

import {
    LOGOUT,
    TOKENS_READY,
    CHANGE_TAB,
    END_WORKOUT,
    SAVE_HISTORY_REP,
    SAVE_HISTORY_SET_TAGS,
    SAVE_HISTORY_SET,
    DELETE_HISTORY_SET,
    RESTORE_HISTORY_SET,
    SAVE_HISTORY_VIDEO,
    TEST_1RM,
} from 'app/configs+constants/ActionTypes';
import API from 'app/services/API';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SettingsActionCreators from 'app/redux/shared_actions/SettingsActionCreators';
import Validator from 'app/utility/Validator';
import * as Analytics from 'app/services/Analytics';

const SyncSaga = function* SyncSaga() {
    // prevent all syncing once testing 1RM mode is enabled
    const task = yield fork(syncLoop);
    yield take(TEST_1RM);
    yield cancel(task);
};

function *syncLoop() {
    while (true) {
        // sync
        const task = yield fork(executeSync);
        
        // cancel on logout
        yield take(LOGOUT);
        yield cancel(task);
    }
}

function* executeSync() {
    while (true) {
        yield take([
            TOKENS_READY,
            CHANGE_TAB,
            END_WORKOUT,
            SAVE_HISTORY_SET,
            SAVE_HISTORY_REP,
            SAVE_HISTORY_SET_TAGS,
            SAVE_HISTORY_VIDEO,
            DELETE_HISTORY_SET,
            RESTORE_HISTORY_SET,
        ]);

        // login check - do not need to check is uploading as relying on the cancel instead
        const isLoggedIn = yield select(AuthSelectors.getIsLoggedIn);    
        if (!isLoggedIn)  {
            yield call(pushAnonymousUpdates);
            // console.tron.log("Not logged in, backing out of sync");
            // const state = yield select();
            // logSyncIgnoredAnalytics(state);
        } else {
            // actions
            yield call(pushUpdates);
        }
    }
}

function *pushAnonymousUpdates() {
    const sets = yield select(SetsSelectors.getSetsToUpload);
    if (sets.length > 0) {
        yield put(SetsActionCreators.beginUploadingSets());
        try {
            // upload
            let state = yield select();
            logAttemptPushAnonymousDataAnalytics(state);
            const accessToken = yield select(AuthSelectors.getAccessToken);
            const lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
            const validator = new Validator(accessToken, lastRefreshDate);
            const json = yield call(API.postAnonymousSetData, sets, validator);

            // success
            state = yield select();
            logPushAnonymousDataSucceededAnalytics(state);
            yield put(SetsActionCreators.finishedUploadingSets());
        } catch(error) {
            // error
            let state = yield select();
            logPushAnonymousDataErrorAnalytics(state, error);
            yield put(SetsActionCreators.failedUploadSets());
            if (error.type !== undefined || typeof error === 'function') {
                yield put(error);
            }
            console.tron.log(JSON.stringify(error));            
        } finally {
            if (yield cancelled()) {
                console.tron.log("Push Anonymous Updates cancelled");            
                yield put(SetsActionCreators.failedUploadSets());
            }
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
            let state = yield select();
            logAttemptPushDataAnalytics(state);
            const initialRevision = yield select(SetsSelectors.getRevision);            
            const accessToken = yield select(AuthSelectors.getAccessToken);
            const lastRefreshDate = yield select(AuthSelectors.getLastRefreshDate);
            const validator = new Validator(accessToken, lastRefreshDate);
            const json = yield call(API.postUpdatedSetData, sets, validator);

            // success
            state = yield select();
            logPushDataSucceededAnalytics(state);
            yield put(SetsActionCreators.finishedUploadingSets(json.revision));

            // sanity check
            yield call(pullUpdates, initialRevision);
        } catch(error) {
            // error
            let state = yield select();
            logPushDataErrorAnalytics(state, error);
            yield put(SetsActionCreators.failedUploadSets());
            if (error.type !== undefined || typeof error === 'function') {
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
        let state = yield select();
        logAttemptPullDataAnalytics(state);
        const json = yield call(API.sync, revision, validator);

        // success
        state = yield select();
        logPullDataSucceededAnalytics(state);
        if (json !== undefined) {
            yield put(SetsActionCreators.updateSetDataFromServer(json.revision, json.sets));
        } else {
            yield put(SettingsActionCreators.updateSyncDate());
        }
    } catch(error) {
        // error
        let state = yield select();
        logPullDataErrorAnalytics(state, error);
        if (error.type !== undefined || typeof error === 'function') {
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

const logAttemptPullDataAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_pull_data', {
    }, state);
};

const logPullDataSucceededAnalytics = (state) => {
    Analytics.logEventWithAppState('pull_data_succeeded', {
    }, state);
};

const logPullDataErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'pull_data_error', {
        revision: SetsSelectors.getRevision(state),
    }, state);
};

const logAttemptPushDataAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_push_data', {
    }, state);
};

const logPushDataSucceededAnalytics = (state) => {
    Analytics.logEventWithAppState('push_data_succeeded', {
    }, state);
};

const logPushDataErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'push_data_error', {
        revision: SetsSelectors.getRevision(state),
        num_sets_to_push: SetsSelectors.getNumSetsBeingUploaded(state),
    }, state);
};

const logAttemptPushAnonymousDataAnalytics = (state) => {
    Analytics.logEventWithAppState('attempt_push_anonymous_data', {
    }, state);
};

const logPushAnonymousDataSucceededAnalytics = (state) => {
    Analytics.logEventWithAppState('push_anonymous_data_succeeded', {
    }, state);
};

const logPushAnonymousDataErrorAnalytics = (state, error) => {
    Analytics.logErrorWithAppState(error, 'push_anonymous_data_error', {
        num_sets_to_push: SetsSelectors.getNumSetsBeingUploaded(state),
    }, state);
}; 

export default SyncSaga;
