import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const tapPoint = (setID) => {
    // change tab and set where to scroll to
    return AppStateActionCreators.changeTab(1, setID);
};
