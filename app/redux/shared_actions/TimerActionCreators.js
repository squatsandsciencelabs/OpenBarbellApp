import Reactotron from 'reactotron-react-native';
import BackgroundTimer from 'react-native-background-timer';
import * as SetActionCreators from './SetActionCreators';

var timer = null;

export const startEndSetTimer = () => (dispatch, getState) => {
    BackgroundTimer.clearTimeout(timer);

    let state = getState();
    let durationInSeconds = state.settings.endSetTimerDuration;

    if (durationInSeconds == null || durationInSeconds == 0) {
        timer = null;
    } else {
        duration = durationInSeconds * 1000;
        timer = BackgroundTimer.setTimeout(() => {
            Reactotron.log("End set timer executed with duration " + duration + "! time to end set");
            dispatch(SetActionCreators.endSet());
        }, duration);
    }
    Reactotron.log("New end set timer is now " + timer);
};
