import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMChartView from './OneRMChartView';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const options = {
    width: 300,
    height: 300,
    r: 2,
    margin: {
      top: 20,
      left: 40,
      bottom: 30,
      right: 30
    },
    fill: "#2980B9",
    stroke: "#3E90F0",
    animate: {
      type: 'delayed',
      duration: 200
    },
    label: {
      fontFamily: 'Arial',
      fontSize: 8,
      fontWeight: true,
      fill: '#34495E'
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        fill: '#34495E'
      }
    }
}

const mapStateToProps = (state) => {
    const exercise = AnalysisSelectors.getAnalysisExercise(state);
    const data = SetsSelectors.getExerciseData(state, exercise, 'scatter');

    return {
        options: options,
        data: data
    }
};

const OneRMChartScreen = connect(
    mapStateToProps,
    null
)(OneRMChartView);

export default OneRMChartScreen;
