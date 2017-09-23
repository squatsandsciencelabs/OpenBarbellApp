import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WorkoutBottomBar from './WorkoutBottomBar';
import * as Actions from './WorkoutBottomBarActions';
import * as AuthSelectors from 'app/redux/selectors/AuthSelectors';

const mapStateToProps = (state) => ({
    isLoggedIn: AuthSelectors.getIsLoggedIn(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        endWorkout: Actions.endWorkout
    }, dispatch);
};

const WorkoutBottomBarScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutBottomBar);

export default WorkoutBottomBarScreen;
