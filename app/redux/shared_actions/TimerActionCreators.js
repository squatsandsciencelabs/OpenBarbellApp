// TODO: refactor this into a saga

import BackgroundTimer from 'react-native-background-timer';
import * as SetsActionCreators from './SetsActionCreators';
import {
    PAUSE_END_SET_TIMER,
    RESUME_END_SET_TIMER,
    START_END_SET_TIMER
} from 'app/ActionTypes';

var timer = null;
var startTime = null;
var timeRemaining = null;

const runTimer = (duration, dispatch) => {
    console.tron.log("Running timer with duration " + duration);
    startTime = (new Date()).getTime();    
    timer = BackgroundTimer.setTimeout(() => {
        console.tron.log("End set timer executed with duration " + duration + "! time to end set");
        dispatch(SetsActionCreators.endSet());
    }, duration);
};

export const startEndSetTimer = () => (dispatch, getState) => {
    BackgroundTimer.clearTimeout(timer);
    
    let state = getState();
    let durationInSeconds = state.settings.endSetTimerDuration;

    if (durationInSeconds == null || durationInSeconds == 0) {
        timer = null;
    } else {
        timeRemaining = durationInSeconds * 1000;
        runTimer(timeRemaining, dispatch);
        dispatch({type: START_END_SET_TIMER});        
    }
    
    console.tron.log("New end set timer is now " + timer);
};

export const resumeEndSetTimer = () => (dispatch) => {
    if (timeRemaining < 10000) {
        console.tron.log("time remaining " + timeRemaining + " too small, making it 10000");
       timeRemaining = 10000;
    }
    runTimer(timeRemaining, dispatch);
    dispatch({type: RESUME_END_SET_TIMER});    
};

export const pauseEndSetTimer = () => {
    BackgroundTimer.clearTimeout(timer);  

    let currentTime = (new Date()).getTime();
    let timeElapsed = currentTime - startTime;
    timeRemaining -= timeElapsed;
    console.tron.log("Pause timer, time elapsed " + timeElapsed + " time remaining " + timeRemaining);

    return { type: PAUSE_END_SET_TIMER };
};
