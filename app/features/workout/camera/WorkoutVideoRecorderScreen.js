import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoRecorder from 'app/shared_features/camera/VideoRecorder';
import * as Actions from './WorkoutVideoRecorderActions';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const mapStateToProps = (state) => ({
    setID: WorkoutSelectors.getRecordingSetID(state),
    videoType: WorkoutSelectors.getRecordingVideoType(state),
    isModalShowing: WorkoutSelectors.getIsCameraVisible(state),
    isRecording: WorkoutSelectors.getIsRecording(state),
    isSaving: WorkoutSelectors.getIsSavingVideo(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissRecording,
        tappedStart: Actions.startRecording,
        tappedStop: Actions.stopRecording,
        saveVideo: Actions.saveVideo
    }, dispatch);
};

const WorkoutVideoRecorderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoRecorder);

export default WorkoutVideoRecorderScreen;
