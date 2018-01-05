import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SurveySelectors from 'app/redux/selectors/SurveySelectors';
import * as Actions from './SurveyModalActions';
import SurveyModalView from './SurveyModalView';

const mapStateToProps = (state) => ({
    isModalShowing: SurveySelectors.getIsFillingOutSurvey(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.closeSurvey,
        fillOutLater: Actions.fillOutLater,
    }, dispatch);
};

const SurveyModalScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyModalView);

export default SurveyModalScreen;
