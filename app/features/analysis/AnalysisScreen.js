import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnalysisTab from './AnalysisTab';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
        scroll: AnalysisSelectors.getScroll(state),
    };
};

const AnalysisScreen = connect(
    mapStateToProps,
    null
)(AnalysisTab);

export default AnalysisScreen;
