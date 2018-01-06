import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';
import SettingsSurveyPanel from './SettingsSurveyPanel';
import * as Actions from './SettingsSurveyActions';

const mapStateToProps = (state) => ({
    isVisible: SurveySelectors.getSurveyAvailable(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        presentSurvey: Actions.presentSurvey,
    }, dispatch);
};

const SettingsSurveyScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsSurveyPanel);

export default SettingsSurveyScreen;
