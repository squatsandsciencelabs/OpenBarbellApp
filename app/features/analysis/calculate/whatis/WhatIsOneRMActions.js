import {
    DISMISS_INFO_MODAL,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

export const presentBestResults = () => AnalysisActionCreators.presentBestResults();

export const dismissInfoModal = () => (dispatch, getState) => {
    const state = getState();

    dispatch({ type: DISMISS_INFO_MODAL });
};

// ANALYTICS


