import { take, put, select, fork } from 'redux-saga/effects';
import {
    SAVE_WORKOUT_SET,
    SAVE_WORKOUT_SET_TAGS,
    DELETE_WORKOUT_VIDEO,
    SAVE_WORKOUT_REP,
    SAVE_HISTORY_SET,
    SAVE_HISTORY_SET_TAGS,
    DELETE_HISTORY_VIDEO,
    SAVE_HISTORY_REP,
} from 'app/ActionTypes';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as CollapseExpandWorkoutActions from 'app/redux/shared_actions/CollapseExpandWorkoutActions';
import * as CollapseExpandHistoryActions from 'app/redux/shared_actions/CollapseExpandHistoryActions';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';

const CollapseRemovedSetSaga = function * SuggestionsSaga() {
    yield fork(collapseWorkoutSet);
    yield fork(collapseHistorySet);
};

function* collapseWorkoutSet() {
    while (true) {        
        const action = yield take([SAVE_WORKOUT_SET, SAVE_WORKOUT_SET_TAGS, DELETE_WORKOUT_VIDEO, SAVE_WORKOUT_REP]);
        const setID = action.setID;
        const set = yield select(SetsSelectors.getWorkoutSet, setID);
        if (SetEmptyCheck.isEmpty(set)) {
            yield put(CollapseExpandWorkoutActions.collapseCard(setID));
        }
    }
}

function* collapseHistorySet() {
    while (true) {        
        const action = yield take([SAVE_HISTORY_SET, SAVE_HISTORY_SET_TAGS, DELETE_HISTORY_VIDEO, SAVE_HISTORY_REP]);
        const setID = action.setID;
        const set = yield select(SetsSelectors.getHistorySet, setID);
        if (SetEmptyCheck.isEmpty(set)) {
            yield put(CollapseExpandHistoryActions.collapseCard(setID));
        }
    }
}

export default CollapseRemovedSetSaga;
