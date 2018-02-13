import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AnalysisTab from './AnalysisTab';
// import * as Actions from './AnalysisActions';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

const mapStateToProps = (state) => {
    return {
        isLoggedIn: AuthSelectors.getIsLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // tapTestOneRM: Actions.presentTroubleshootingTips,
    }, dispatch);
};

const AnalysisScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalysisTab);

export default AnalysisScreen;
