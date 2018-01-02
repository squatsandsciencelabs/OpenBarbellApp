import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMSlider from './OneRMSlider';
import * as Actions from './OneRMSliderActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SlidersSelectors from 'app/redux/selectors/SlidersSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';
import * as OneRepMax from 'app/utility/transforms/OneRepMax';

const mapStateToProps = (state) => {
    const exercise = SlidersSelectors.getSliderExercise(state);
    const velocity = SlidersSelectors.getSliderVelocity(state);
    const days = SlidersSelectors.getSliderDays(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'regression');
    const confidence = OneRepMax.getConfidenceInterval(data);
    const e1rm = OneRepMax.OneRMPrediction(data, velocity);

    return {
        velocity: velocity,
        exercise: exercise,
        days: days,
        confidence: confidence,
        e1rm: e1rm
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeVelocity: Actions.changeSliderVelocity,
        changeDays: Actions.changeSliderDays,
        enableTabSwipe: AppStateActionCreators.enableTabSwipe,
        disableTabSwipe: AppStateActionCreators.disableTabSwipe
    }, dispatch);
};

const OneRMSliderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMSlider);

export default OneRMSliderScreen;
