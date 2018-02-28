import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnalysisTab from './AnalysisTab';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as AnalysisActionCreators from 'app/redux/shared_actions/AnalysisActionCreators';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
        scroll: AnalysisSelectors.getScroll(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dragged: AnalysisActionCreators.analysisDragged,
    }, dispatch);
};

const AnalysisScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalysisTab);

export default AnalysisScreen;
