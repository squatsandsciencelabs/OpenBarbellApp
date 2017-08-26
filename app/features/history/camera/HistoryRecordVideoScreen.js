import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordVideo from 'app/shared_features/camera/RecordVideo';
import * as Actions from './HistoryRecordVideoActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => ({
    setID: HistorySelectors.getRecordingSetID(state),
    videoType: HistorySelectors.getRecordingVideoType(state),
    isModalShowing: HistorySelectors.getIsCameraVisible(state),
    isRecording: HistorySelectors.getIsRecording(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissRecording,
        tappedStart: Actions.startRecording,
        tappedStop: Actions.stopRecording,
        saveVideo: Actions.saveVideo        
    }, dispatch);
};

const HistoryRecordVideoScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(RecordVideo);

export default HistoryRecordVideoScreen;
