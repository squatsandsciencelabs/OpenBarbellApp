import { Keyboard } from 'react-native';

import {
    CHANGED_TAB
} from 'app/ActionTypes';

import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as WorkoutActionCreators from 'app/redux/shared_actions/WorkoutActionCreators';
import * as ApiActionCreators from 'app/redux/shared_actions/ApiActionCreators';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

export const changeTab = () => {
    Keyboard.dismiss();    
    return { type: CHANGED_TAB };
};

// TODO: refactor end old workout into a saga
// dispatch(endOldWorkout());

const endOldWorkout = () => (dispatch, getState) => {
    // get end time
    var state = getState();
    var endTime = SetsSelectors.lastRepTime(state.sets)
    if (endTime === null) {
        return;
    } else if (Object.prototype.toString.call(endTime) === '[object Date]') {
        var endDate = endTime;
    } else {
        var endDate = new Date(endTime);
    }

    var currentDate = new Date()
    var timeDifference = Math.abs(currentDate - endDate);
    console.tron.log("Time difference is " + timeDifference + " comparing " + endDate + " against " + currentDate + " with config timer " + OpenBarbellConfig.endWorkoutTimer);

    if (timeDifference >= OpenBarbellConfig.endWorkoutTimer) {
        alert("Ending workout! You can find your last workout on the History screen.");
        dispatch(WorkoutActionCreators.endWorkout())
    }
};
