import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetTitleRowExpanded from 'app/shared_features/set_card/expanded/SetTitleRowExpanded';
import * as Actions from './EditHistoryTitleExpandedActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSet: Actions.saveSet,
        tapExercise: Actions.presentExercise,
        tapCollapse: Actions.tapCollapse,
    }, dispatch);
};

const EditHistoryTitleExpandedScreen = connect(
    null,
    mapDispatchToProps
)(SetTitleRowExpanded);

export default EditHistoryTitleExpandedScreen;
