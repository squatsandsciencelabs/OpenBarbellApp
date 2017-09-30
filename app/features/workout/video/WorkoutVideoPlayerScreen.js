import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoPlayer from 'app/shared_features/video/VideoPlayer';
import * as Actions from './WorkoutVideoPlayerActions';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: WorkoutSelectors.getIsVideoPlayerVisible(state),
    setID: WorkoutSelectors.getWatchSetID(state),
    video: WorkoutSelectors.getWatchFileURL(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteVideo: Actions.deleteVideo,
        closeModal: Actions.closeModal,
    }, dispatch);
};

const WorkoutVideoPlayerScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoPlayer);

export default WorkoutVideoPlayerScreen;
