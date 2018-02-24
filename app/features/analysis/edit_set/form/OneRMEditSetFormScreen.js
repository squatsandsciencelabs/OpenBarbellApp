import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetForm from 'app/shared_features/set_card/expanded/SetForm';
import * as Actions from './OneRMEditSetFormActions';
import * as DateUtils from 'app/utility/DateUtils';

const mapStateToProps = (state, ownProps) => {
    const rpeDisabled = !DateUtils.checkDateWithinRange(7, ownProps.initialStartTime)
    
    return {
        rpeDisabled: rpeDisabled,
    };
}

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

const OneRMEditSetFormScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetForm);

export default OneRMEditSetFormScreen;
