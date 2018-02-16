import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HowToBestResultsView from './HowToBestResultsView';
import * as Actions from './HowToBestResultsActions';


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        presentBestResults: Actions.presentBestResults,
    }, dispatch);
};

const HowToBestResultsScreen = connect(
    null,
    mapDispatchToProps
)(HowToBestResultsView);

export default HowToBestResultsScreen;
