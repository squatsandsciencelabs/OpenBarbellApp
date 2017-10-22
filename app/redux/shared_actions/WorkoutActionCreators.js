// This exists in shared actions because the timer can also end the workout
import { Alert } from 'react-native';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import { END_WORKOUT } from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state)
    var isLoggedIn = AuthSelectors.getIsLoggedIn(state);

    logAnalytics(true, state);

    if (!isWorkoutEmpty && isLoggedIn) {
        dispatch({ type: END_WORKOUT });
    } else if(!isLoggedIn) {
        Alert.alert(
            'Heads up!',
            "You are not logged in, the data from this workout will be lost,\nPlease sign in under settings to save your data to the cloud",
            [
              {text: 'Continue', onPress: () => dispatch({ type: END_WORKOUT })},
              {text: 'Nevermind', style: 'cancel'},,
            ],
            { cancelable: false }
          )                    
    }
};

export const autoEndWorkout = () => (dispatch, getState) => { 
    var state = getState();

    logAnalytics(false, state);

    dispatch({ type: END_WORKOUT });
};

const logAnalytics = (manuallyEnded, state) => {
    // var screenStatus = state.appState.screenStatus;
    var timeStartActive = null;
    var timeEndActive = null;
    var percentAppActive = null;
    let sets = SetsSelectors.getWorkoutSets(state);
    let num_sets = sets.length;
    let num_sets_with_fields = SetsSelectors.getNumFields(state);
    let percent_sets_fields = SetsSelectors.getPercentFields(state);
    let num_reps = SetsSelectors.getNumReps(state);    
    let num_removes = WorkoutSelectors.getRemovedCounter(state);
    let num_restores = WorkoutSelectors.getRestoredCounter(state);
    let num_screen_locks = AppStateSelectors.getNumLocks(state);
    let num_multitask = AppStateSelectors.getNumMultiTask(state);
    let num_disconnects = ConnectedDeviceStatusSelectors.getNumDisconnects(state);
    let num_auto_reconnects = ConnectedDeviceStatusSelectors.getNumReconnects(state);
    let num_history_views = HistorySelectors.getHistoryViewedCounter(state);
    let workout_duration = SetsSelectors.getWorkoutDuration(state);

    Analytics.logEventWithAppState('end_workout', {
        value: null,
        num_screen_locks: num_screen_locks,
        num_multitask: num_multitask,
        percent_app_active: null,
        num_history_views: num_history_views,
        num_disconnects: num_disconnects,
        num_auto_reconnects: num_auto_reconnects,
        num_sets: num_sets,
        num_reps: num_reps,
        num_removes: num_removes,
        num_restores: num_restores,
        num_sets_with_fields: num_sets_with_fields,
        percent_sets_fields: percent_sets_fields,
        time_since_last_workout: null,
        workout_duration: workout_duration,
        time_since_last_rep: null,
        manually_ended: manuallyEnded,
    }, state);    
}
