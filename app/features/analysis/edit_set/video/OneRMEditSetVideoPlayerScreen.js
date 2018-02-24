import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoPlayer from 'app/shared_features/video/VideoPlayer';
import * as Actions from './OneRMEditSetVideoPlayerActions';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: AnalysisSelectors.getIsVideoPlayerVisible(state),
    setID: AnalysisSelectors.getWatchSetID(state),
    video: AnalysisSelectors.getWatchFileURL(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteVideo: Actions.deleteVideo,
        closeModal: Actions.closeModal,
    }, dispatch);
};

const OneRMEditSetVideoPlayerScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoPlayer);

export default OneRMEditSetVideoPlayerScreen;
