import { takeLatest, select, put, call, all } from 'redux-saga/effects';
import { 
    ADD_REP_DATA, 
} from 'app/configs+constants/ActionTypes';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as RepDataMap from 'app/utility/RepDataMap';
import * as VelocityDropActionCreators from 'app/redux/shared_actions/VelocityDropActionCreators';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const VelocityDropSaga = function * VelocityDropSaga() {
    yield takeLatest(ADD_REP_DATA, playVelocityDropAudio);
};

function* playVelocityDropAudio(action) {
    const velocityThreshold = yield select(SettingsSelectors.getVelocityDropThreshold);
    const currentRepVelocity = RepDataMap.averageVelocity(action.data);

    if (currentRepVelocity < velocityThreshold) {
        console.tron.log(currentRepVelocity + " less than " + velocityThreshold);
        yield put(VelocityDropActionCreators.playVelocityDropAudio());
    }
};

export default VelocityDropSaga;
