import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const tappedDevice = () => {
    return AppStateActionCreators.changeTab(2);
};
