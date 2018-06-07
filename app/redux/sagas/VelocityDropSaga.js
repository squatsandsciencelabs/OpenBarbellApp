import { takeEvery, select, put, call, all } from 'redux-saga/effects';
import { PLAY_VELOCITY_DROP_AUDIO } from 'app/configs+constants/ActionTypes';

const VelocityDropSaga = function * VelocityDropSaga() {
    yield takeEvery(PLAY_VELOCITY_DROP_AUDIO, playVelocityDropAudio);
};

function* playVelocityDropAudio() {
    console.tron.log("VELOCITY DROPPED");
};

export default VelocityDropSaga;
