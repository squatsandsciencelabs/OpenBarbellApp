// TODO: refactor logic so it isn't as convoluted and repeats code less
// For example, make pause functionality part of the background timer library itself instead

import BackgroundTimer from 'react-native-background-timer';
import * as SetsActionCreators from './SetsActionCreators';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';
import {
    PAUSE_END_SET_TIMER,
    RESUME_END_SET_TIMER,
    START_END_SET_TIMER,
    STOP_END_SET_TIMER
} from 'app/ActionTypes';

var timer = null;
var startTime = null;
var timeRemaining = null;
var isPaused = false;

const runTimer = (duration, dispatch) => {
    console.tron.log("Running timer with duration " + duration);
    startTime = (new Date()).getTime();
    isPaused = false;    
    timer = BackgroundTimer.setTimeout(() => {
        console.tron.log("End set timer executed with duration " + duration + "! time to end set");
        timeRemaining = null;
        startTime = null;
        timer = null;
        isPaused = false;
        dispatch(SetsActionCreators.endSet());
    }, duration);
};

export const startEndSetTimer = () => (dispatch, getState) => {
    BackgroundTimer.clearTimeout(timer);
    timer = null;
    timeRemaining = null;
    startTime = null;
    isPaused = false;
    
    let state = getState();
    let durationInSeconds = state.settings.endSetTimerDuration;
    let isEditing = WorkoutSelectors.getIsEditing(state);

    if (durationInSeconds == null || durationInSeconds == 0) {
        timer = null;
    } else if (isEditing) {
        timeRemaining = durationInSeconds * 1000;
        isPaused = true;
        startTime = (new Date()).getTime();
        dispatch({type: START_END_SET_TIMER});
        dispatch({type: PAUSE_END_SET_TIMER});
    } else {
        timeRemaining = durationInSeconds * 1000;
        runTimer(timeRemaining, dispatch);
        dispatch({type: START_END_SET_TIMER});        
    }
    
    console.tron.log("New end set timer is now " + timer);
};

export const resumeEndSetTimer = () => (dispatch) => {
    //valid check
    if (!isPaused) {
        return;
    }

    if (timeRemaining < 10000) {
        console.tron.log("time remaining " + timeRemaining + " too small, making it 10000");
        timeRemaining = 10000;
    }
    runTimer(timeRemaining, dispatch);
    dispatch({type: RESUME_END_SET_TIMER});    
};

export const pauseEndSetTimer = () => (dispatch) => {
    //valid check
    if (timer === null) {
        return;
    }

    BackgroundTimer.clearTimeout(timer);
    timer = null;
    isPaused = true;

    let currentTime = (new Date()).getTime();
    let timeElapsed = currentTime - startTime;
    timeRemaining -= timeElapsed;
    console.tron.log("Pause timer, time elapsed " + timeElapsed + " time remaining " + timeRemaining);

    dispatch({type: PAUSE_END_SET_TIMER});
};

export const stopEndSetTimer = () =>  {
    BackgroundTimer.clearTimeout(timer);
    timer = null;
    isPaused = false;
    timeRemaining = null;

    return {
        type: STOP_END_SET_TIMER
    }
};
