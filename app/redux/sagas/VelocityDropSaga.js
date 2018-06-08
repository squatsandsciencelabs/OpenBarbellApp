import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { 
    VELOCITY_DROPPED, 
    PLAY_VELOCITY_DROP_AUDIO 
} from 'app/configs+constants/ActionTypes';
import * as VelocityDropActionCreators from 'app/redux/shared_actions/VelocityDropActionCreators';

const VelocityDropSaga = function * VelocityDropSaga() {
    yield takeEvery(VELOCITY_DROPPED, playVelocityDropAudio);
};

function* playVelocityDropAudio() {
    yield put(VelocityDropActionCreators.playVelocityDropAudio());
};

export default VelocityDropSaga;
