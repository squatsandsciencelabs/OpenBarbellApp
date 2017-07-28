import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HistoryFilterBar from './HistoryFilterBar';
import * as HistoryActionCreators from 'app/redux/shared_actions/HistoryActionCreators';

const mapStateToProps = (state) => ({
    shouldShowRemoved: state.history.showRemoved,
    isExportingCSV: state.history.isExportingCSV
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showRemoved: HistoryActionCreators.showRemovedData,
        hideRemoved: HistoryActionCreators.hideRemovedData,
        exportCSV: HistoryActionCreators.exportHistoryCSV,
    }, dispatch);
};

const HistoryFilterBarScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryFilterBar);

export default HistoryFilterBarScreen;
