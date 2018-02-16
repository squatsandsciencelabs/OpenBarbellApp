import {
    DISMISS_SELECT_EXERCISE,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

export const dismissSelectExercise = () => ({
    type: DISMISS_SELECT_EXERCISE 
});

export const saveSelected1RMExercise = (exercise = 'Squat') => (dispatch, getState) => {
    const state = getState();

    dispatch(AnalysisActionCreators.saveSelected1RMExercise(exercise));
};
