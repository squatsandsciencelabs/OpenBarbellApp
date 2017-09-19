// This exists in shared actions because the timer can also end the workout
import { Alert } from 'react-native';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import { END_WORKOUT } from 'app/ActionTypes';

export const endWorkout = () => (dispatch, getState) => {
    var state = getState();
    var isWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty(state)
    var isLoggedIn = AuthSelectors.getIsLoggedIn(state);

    if (!getIsWorkoutEmpty && isLoggedIn) {
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
