// This exists in shared actions because the timer can also end the workout
import { Alert } from 'react-native';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import { END_WORKOUT } from 'app/ActionTypes';
import * as Analytics from 'app/utility/Analytics';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state)
    var isLoggedIn = AuthSelectors.getIsLoggedIn(state);
    var screenStatus = state.appState.screenStatus;
    var timeStartActive = null;
    var timeEndActive = null;
    var percentAppActive;
    var sets = state.sets.workoutData;
    var num_sets = sets.length;
    var num_sets_with_fields = 0;
    var num_reps = 0;
    var num_removes = 0;
    var num_restores = 0;

    sets.map((set) => {
        set.reps.map((rep) => {
            if (rep.removed) {
                num_removes++;
            }
        });

        num_reps += set.reps.length;

        if (SetEmptyCheck.isEmpty(set)) {
            num_sets_with_fields++;
        }
    });

    if (screenStatus === 'active') {
        timeStartActive = new Date();
    } else {
        timeEndActive = new Date();
    }
    
    console.tron.log(sets);

    Analytics.logEventWithAppState('end_workout', {
        value: percentAppActive,
        num_screen_locks: null,
        num_multitask: null,
        percent_app_active: percentAppActive,
        num_history_views: null,
        num_disconnects: null,
        num_auto_reconnects: null,
        num_sets: num_sets,
        num_reps: num_reps,
        num_removes: num_removes,
        num_restores: null,
        num_sets_with_fields: num_sets_with_fields,
        percent_sets_fields: null
    }, state);

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

export const autoEndWorkout = () => ({ type: END_WORKOUT });
