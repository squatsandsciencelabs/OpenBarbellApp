import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMSlider from './OneRMSlider';
import * as Actions from './OneRMSliderActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SlidersSelectors from 'app/redux/selectors/SlidersSelectors';
import * as AppStateActionCreators from 'app/redux/shared_actions/AppStateActionCreators';

const mapStateToProps = (state, ownProps) => ({
    velocity: SlidersSelectors.getSliderVelocity(state),
    exercise: SlidersSelectors.getSliderExercise(state),
    data: SetsSelectors.getHistorySetsChronological(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeVelocity: Actions.changeSliderVelocity,
        enableTabSwipe: AppStateActionCreators.enableTabSwipe,
        disableTabSwipe: AppStateActionCreators.disableTabSwipe
    }, dispatch);
};

const OneRMSliderScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMSlider);

export default OneRMSliderScreen;
