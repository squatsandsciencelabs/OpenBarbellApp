import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

export const tapPoint = (setID) => {
    // change tab
    console.tron.log(setID);
    return AppStateActionCreators.changeTab(1);
}
