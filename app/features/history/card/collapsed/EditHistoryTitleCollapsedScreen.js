import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetTitleRowCollapsed from 'app/shared_features/set_card/collapsed/SetTitleRowCollapsed';
import * as Actions from './EditHistoryTitleCollapsedActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSet: Actions.saveSet,
        tapExercise: Actions.presentExercise,
        tapExpand: Actions.tapExpand,
    }, dispatch);
};

const EditHistoryTitleExpandedScreen = connect(
    null,
    mapDispatchToProps
)(SetTitleRowCollapsed);

export default EditHistoryTitleExpandedScreen;
