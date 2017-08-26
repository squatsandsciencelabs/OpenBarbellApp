import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordVideo from 'app/shared_features/camera/RecordVideo';
import * as Actions from './WorkoutRecordVideoActions';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const mapStateToProps = (state) => ({
    setID: WorkoutSelectors.getRecordingSetID(state),
    videoType: WorkoutSelectors.getRecordingVideoType(state),
    isModalShowing: WorkoutSelectors.getIsCameraVisible(state),
    isRecording: WorkoutSelectors.getIsRecording(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissRecording,
        tappedStart: Actions.startRecording,
        tappedStop: Actions.stopRecording,
        saveVideo: Actions.saveVideo
    }, dispatch);
};

const WorkoutRecordVideoScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordVideo);

export default WorkoutRecordVideoScreen;
