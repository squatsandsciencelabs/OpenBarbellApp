import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnalysisTab from './AnalysisTab';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
    };
};

const AnalysisScreen = connect(
    mapStateToProps,
    null
)(AnalysisTab);

export default AnalysisScreen;
