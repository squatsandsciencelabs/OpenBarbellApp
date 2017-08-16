import BackgroundTimer from 'react-native-background-timer';
import * as SetsActionCreators from './SetsActionCreators';

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
            console.tron.log("End set timer executed with duration " + duration + "! time to end set");
            dispatch(SetsActionCreators.endSet());
        }, duration);
    }
    console.tron.log("New end set timer is now " + timer);
};
