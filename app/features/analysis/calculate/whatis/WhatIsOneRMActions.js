import {
    Linking,
} from 'react-native';

import {
    PRESENT_BEST_RESULTS,
    DISMISS_INFO_MODAL,
} from 'app/ActionTypes';

export const presentBestResults = () => (dispatch, getState) => {
    // TODO: analytics
    Linking.openURL("http://www.squatsandscience.com/onerepmax/");
    dispatch({ type: PRESENT_BEST_RESULTS });
};

export const dismissInfoModal = () => ({
    type: DISMISS_INFO_MODAL,
});
