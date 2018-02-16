// This exists in shared actions because the timer can also end the workout
import { Alert } from 'react-native';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import { END_WORKOUT } from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetUtils from 'app/utility/SetUtils';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state)
    var isLoggedIn = AuthSelectors.getIsLoggedIn(state);

    logEndWorkoutAnalytics(true, state);

    if (!isWorkoutEmpty && isLoggedIn) {
        dispatch({ type: END_WORKOUT, manual: true });
    } else if(!isLoggedIn) {
        Alert.alert(
            'Heads up!',
            "You are not logged in, the data from this workout will be lost,\nPlease sign in under settings to save your data to the cloud",
            [
              {text: 'Delete Workout', style: 'destructive', onPress: () => dispatch({ type: END_WORKOUT, manual: true })},
              {text: 'Cancel', style: 'cancel'},,
            ],
            { cancelable: false }
        )
    }
};

export const autoEndWorkout = () => (dispatch, getState) => { 
    var state = getState();

    logEndWorkoutAnalytics(false, state);

    dispatch({ type: END_WORKOUT, manual: false });
};

const logEndWorkoutAnalytics = (manuallyEnded, state) => {    
    var timeStartActive = null;
    var timeEndActive = null;
    var percentAppActive = null;
    let num_sets = SetsSelectors.getNumWorkoutSets(state);
    let num_sets_with_fields = SetsSelectors.getNumWorkoutSetsWithFields(state);
    let percent_sets_fields = SetsSelectors.getPercentWorkoutSetsWithFields(state);
    let num_reps = SetsSelectors.getNumWorkoutReps(state);    
    let num_removes = WorkoutSelectors.getRemovedCounter(state);
    let num_restores = WorkoutSelectors.getRestoredCounter(state);
    let num_disconnects = ConnectedDeviceStatusSelectors.getNumDisconnects(state);
    let num_auto_reconnects = ConnectedDeviceStatusSelectors.getNumReconnects(state);
    let num_history_views = HistorySelectors.getHistoryViewedCounter(state);
    let workout_duration = SetsSelectors.getWorkoutDuration(state);
    let num_sets_with_all_fields = SetsSelectors.getNumWorkoutSetsWithAllFields(state);
    let percent_sets_with_all_fields = SetsSelectors.getPercentWorkoutSetsWithAllFields(state);
    let num_sets_with_rpe = SetsSelectors.getNumWorkoutSetsWithRPE(state);
    let percent_sets_with_rpe = SetsSelectors.getPercentWorkoutSetsWithRPE(state);

    Analytics.logEventWithAppState('end_workout', {
        num_history_views: num_history_views,
        num_disconnects: num_disconnects,
        num_auto_reconnects: num_auto_reconnects,
        num_sets: num_sets,
        num_reps: num_reps,
        num_removes: num_removes,
        num_restores: num_restores,
        num_sets_with_fields: num_sets_with_fields,
        percent_sets_fields: percent_sets_fields,
        num_sets_with_all_fields: num_sets_with_all_fields,
        percent_sets_with_all_fields: percent_sets_with_all_fields,
        num_sets_with_rpe: num_sets_with_rpe,
        percent_sets_with_rpe: percent_sets_with_rpe,
        workout_duration: workout_duration,
        manually_ended: manuallyEnded,
    }, state);    
};
