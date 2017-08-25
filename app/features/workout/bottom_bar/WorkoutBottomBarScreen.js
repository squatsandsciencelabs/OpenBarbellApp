import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WorkoutBottomBar from './WorkoutBottomBar';
import * as Actions from './WorkoutBottomBarActions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
};

const WorkoutBottomBarScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutBottomBar);

export default WorkoutBottomBarScreen;
