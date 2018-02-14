import {
    Linking,
} from 'react-native';

import {
    PRESENT_BEST_RESULTS,
} from 'app/ActionTypes';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const tapPoint = (setID) => {
    // change tab and set where to scroll to
    return AppStateActionCreators.changeTab(1, setID);
};

export const presentBestResults = () => (dispatch, getState) => {
    // TODO: analytics
    Linking.openURL("http://www.squatsandscience.com/onerepmax/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};
