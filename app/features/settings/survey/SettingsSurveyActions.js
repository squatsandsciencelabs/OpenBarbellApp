import {
    PRESENT_SURVEY,
} from 'app/ActionTypes';

import * as SurveyActionCreators from 'app/redux/shared_actions/SurveyActionCreators';

export const presentSurvey = () => (dispatch, getState) => {
    // TODO: analytics
    dispatch(SurveyActionCreators.presentSurvey());
};
