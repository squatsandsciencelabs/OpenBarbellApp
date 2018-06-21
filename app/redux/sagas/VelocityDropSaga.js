import { takeLatest, select } from 'redux-saga/effects';
import { 
    ADD_REP_DATA, 
} from 'app/configs+constants/ActionTypes';
import * as RepDataMap from 'app/utility/RepDataMap';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as AudioPlayer from 'app/shared_features/audio/AudioPlayer';
import vel_threshold from 'app/audio/vel_threshold.mp3';

const VelocityDropSaga = function * VelocityDropSaga() {
    yield takeLatest(ADD_REP_DATA, playVelocityDropAudio);
};

function* playVelocityDropAudio(action) {
    const velocityThreshold = yield select(SettingsSelectors.getVelocityDropThreshold);
    const currentRepVelocity = RepDataMap.averageVelocity(action.data);

    if (currentRepVelocity < velocityThreshold) {
        console.tron.log(currentRepVelocity + " less than " + velocityThreshold);
        // yield put(VelocityDropActionCreators.playVelocityDropAudio());
        AudioPlayer.audioPlayer(vel_threshold);
    }
};

export default VelocityDropSaga;
