import {
    Linking,
} from 'react-native';

import {
    PRESENT_BEST_RESULTS,
} from 'app/configs+constants/ActionTypes';

export const presentBestResults = () => (dispatch, getState) => {
    // TODO: analytics
    Linking.openURL("http://www.squatsandscience.com/onerepmax/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};
