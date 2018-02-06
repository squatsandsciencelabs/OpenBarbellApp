import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OneRMChartView from './OneRMChartView';
import * as Actions from './OneRMChartActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        tapPoint: Actions.tapPoint,
    }, dispatch);
};

const OneRMChartScreen = connect(
    null,
    mapDispatchToProps
)(OneRMChartView);

export default OneRMChartScreen;
