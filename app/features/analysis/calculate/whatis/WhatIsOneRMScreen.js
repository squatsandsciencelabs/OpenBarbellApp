import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WhatIsOneRMView from './WhatIsOneRMView';
import * as Actions from './WhatIsOneRMActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: AnalysisSelectors.getShowInfoModal(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        presentAlgorithm: Actions.presentAlgorithm,
        presentBestResults: Actions.presentBestResults,
        closeModal: Actions.dismissInfoModal,
    }, dispatch);
};

const WhatIsOneRMScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(WhatIsOneRMView);

export default WhatIsOneRMScreen;
