import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMSlider from './OneRMSlider';
import * as Actions from './OneRMSliderActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const mapStateToProps = (state, ownProps) => ({
    velocity: state.sliders.velocity,
    exercise: state.sliders.exercise,
    data: SetsSelectors.getExerciseData(state, ownProps.exercise)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeVelocity: Actions.changeSliderVelocity
    }, dispatch);
};

const OneRMSliderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMSlider);

export default OneRMSliderScreen;
