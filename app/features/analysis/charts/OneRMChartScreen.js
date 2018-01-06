import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMChartView from './OneRMChartView';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getAnalysisE1RMVelocity(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'scatter');

    return {
        options: options,
        data: data,
    }
};

const OneRMChartScreen = connect(
    mapStateToProps,
    null
)(OneRMChartView);

export default OneRMChartScreen;
