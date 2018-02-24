import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import VideoButton from 'app/shared_features/set_card/expanded/VideoButton';
import * as Actions from './OneRMEditSetFormActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tappedRecord: Actions.presentRecordVideo,
        tappedCommentary: Actions.presentRecordCommentary,
        tappedWatch: Actions.presentWatchVideo
    }, dispatch);
};

const OneRMEditSetVideoButtonScreen = connect(
    null,
    mapDispatchToProps
)(VideoButton);

export default OneRMEditSetVideoButtonScreen;
