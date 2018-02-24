import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetTitleRowExpanded from 'app/shared_features/set_card/expanded/SetTitleRowExpanded';
import * as Actions from './OneRMEditSetTitleActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSet: Actions.saveSet,
        tappedExercise: Actions.presentExercise,
    }, dispatch);
};

const OneRMEditSetTitleScreen = connect(
    null,
    mapDispatchToProps
)(SetTitleRowExpanded);

export default OneRMEditSetTitleScreen;
