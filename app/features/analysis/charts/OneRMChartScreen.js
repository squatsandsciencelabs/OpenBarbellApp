import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMChartView from './OneRMChartView';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const mapStateToProps = (state) => {
    const exercise = SlidersSelectors.getSliderExercise(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'scatter');

    return {
        data: data
    }
};

const OneRMChartScreen = connect(
    mapStateToProps,
    null
)(OneRMChartView);

export default OneRMChartScreen;
