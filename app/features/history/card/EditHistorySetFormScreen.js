import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetForm from 'app/shared_features/set_card/SetForm';
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
)(SetForm);

export default EditHistorySetFormScreen;
