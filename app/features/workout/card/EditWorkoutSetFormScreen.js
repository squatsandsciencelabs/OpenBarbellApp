import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetForm from 'app/shared_features/set_card/SetForm';
import * as Actions from './EditWorkoutSetFormActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSet: Actions.saveSet,
        tapExercise: Actions.presentExercise,
        tapTags: Actions.presentTags,
        tapRPE: Actions.editRPE,
        tapWeight: Actions.editWeight,
        dismissRPE: Actions.dismissRPE,
        dismissWeight: Actions.dismissWeight,
        toggleMetric: Actions.toggleMetric,
    }, dispatch);
};

const EditWorkoutSetFormScreen = connect(
    null,
    mapDispatchToProps
)(SetForm);

export default EditWorkoutSetFormScreen;
