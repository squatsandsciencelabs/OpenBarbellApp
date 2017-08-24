import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoButton from 'app/shared_features/set_card/VideoButton';
import * as Actions from './EditHistorySetFormActions';

// TODO: add video here
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedRecord: Actions.presentRecordVideo,
        tappedCommentary: Actions.presentRecordVideo,
        tappedWatch: Actions.presentWatchVideo
    }, dispatch);
};

const HistoryVideoButtonScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoButton);

export default HistoryVideoButtonScreen;
