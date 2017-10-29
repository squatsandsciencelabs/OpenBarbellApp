import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const changeTab = (tabIndex) => {
    return AppStateActionCreators.changeTab(tabIndex);
};
