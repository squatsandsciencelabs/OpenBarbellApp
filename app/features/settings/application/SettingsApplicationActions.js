import {
    PRESENT_END_SET_TIMER,
    EDIT_DEFAULT_METRIC
} from 'app/ActionTypes';

export const presentEndSetTimer = () => ({
    type: PRESENT_END_SET_TIMER
});

export const presentSetMetric = () => ({
	type: EDIT_DEFAULT_METRIC
})