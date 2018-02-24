import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoRecorder from 'app/shared_features/camera/VideoRecorder';
import * as Actions from './OneRMEditSetVideoRecorderScreen';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => ({
    setID: AnalysisSelectors.getRecordingSetID(state),
    videoType: AnalysisSelectors.getRecordingVideoType(state),
    isModalShowing: AnalysisSelectors.getIsCameraVisible(state),
    isRecording: AnalysisSelectors.getIsRecording(state),
    isSaving: AnalysisSelectors.getIsSavingVideo(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissRecording,
        tappedStart: Actions.startRecording,
        tappedStop: Actions.stopRecording,
        saveVideo: Actions.saveVideo,
        saveVideoError: Actions.saveVideoError
    }, dispatch);
};

const OneRMEditSetVideoRecorderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoRecorder);

export default OneRMEditSetVideoRecorderScreen;
