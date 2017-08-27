import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoPlayer from 'app/shared_features/video/VideoPlayer';
import * as Actions from './HistoryVideoPlayerActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => ({
    isModalShowing: HistorySelectors.getIsVideoPlayerVisible(state),
    setID: HistorySelectors.getWatchSetID(state),
    video: HistorySelectors.getWatchFileURL(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteVideo: Actions.deleteVideo,
        closeModal: Actions.closeModal,
    }, dispatch);
};

const HistoryVideoPlayerScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoPlayer);

export default HistoryVideoPlayerScreen;
