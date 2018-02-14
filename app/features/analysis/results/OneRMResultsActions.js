import {
    SHOW_INFO_MODAL,
    DISMISS_INFO_MODAL,
} from 'app/ActionTypes';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const tapPoint = (setID) => {
    // change tab and set where to scroll to
    return AppStateActionCreators.changeTab(1, setID);
};

export const showInfoModal = () => ({
    type: SHOW_INFO_MODAL,
});

export const dismissInfoModal = () => ({
    type: DISMISS_INFO_MODAL,
});
