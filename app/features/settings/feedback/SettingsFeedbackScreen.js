import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingsFeedbackPanel from './SettingsFeedbackPanel';
import * as Actions from './SettingsFeedbackActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedFeedback: Actions.presentFeedback,
    }, dispatch);
};

const SettingsFeedbackScreen = connect(
    null,
    mapDispatchToProps
)(SettingsFeedbackPanel);

export default SettingsFeedbackScreen;
