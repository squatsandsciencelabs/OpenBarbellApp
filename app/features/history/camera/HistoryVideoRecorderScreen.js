import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoRecorder from 'app/shared_features/camera/VideoRecorder';
import * as Actions from './HistoryVideoRecorderActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => ({
    setID: HistorySelectors.getRecordingSetID(state),
    videoType: HistorySelectors.getRecordingVideoType(state),
    isModalShowing: HistorySelectors.getIsCameraVisible(state),
    isRecording: HistorySelectors.getIsRecording(state),
    isSaving: HistorySelectors.getIsSavingVideo(state)    
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

const HistoryVideoRecorderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoRecorder);

export default HistoryVideoRecorderScreen;
