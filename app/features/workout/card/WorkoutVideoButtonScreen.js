import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoButton from 'app/shared_features/set_card/VideoButton';
import * as Actions from './EditWorkoutSetFormActions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedRecord: Actions.endWorkout
    }, dispatch);
};

const WorkoutVideoButtonScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoButton);

export default WorkoutVideoButtonScreen;
