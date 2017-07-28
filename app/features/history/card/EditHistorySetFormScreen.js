import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditSetHeader from 'app/shared_features/set_card/EditSetHeader';
import * as SetActionCreators from 'app/redux/shared_actions/SetActionCreators';
import * as HistoryActionCreators from 'app/redux/shared_actions/HistoryActionCreators';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSet: SetActionCreators.updateHistorySet,
        editExercise: HistoryActionCreators.beginEditHistoryExerciseName,
        editTags: HistoryActionCreators.beginEditHistoryTags,
    }, dispatch);
};

const EditHistorySetFormScreen = connect(
    null,
    mapDispatchToProps
)(EditSetHeader);

export default EditHistorySetFormScreen;
