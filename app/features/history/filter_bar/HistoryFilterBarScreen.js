import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HistoryFilterBar from './HistoryFilterBar';
import * as Actions from './HistoryFilterBarActions';

const mapStateToProps = (state) => ({
    shouldShowRemoved: state.history.showRemoved,
    isExportingCSV: state.history.isExportingCSV
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showRemoved: Actions.showRemovedData,
        hideRemoved: Actions.hideRemovedData,
        exportCSV: Actions.exportCSV,
    }, dispatch);
};

const HistoryFilterBarScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryFilterBar);

export default HistoryFilterBarScreen;
