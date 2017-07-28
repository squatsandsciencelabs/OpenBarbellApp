import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ListLoadingFooter from './ListLoadingFooter';

const mapStateToProps = (state) => ({
    isLoading: state.history.isLoadingHistory,
});

const HistoryLoadingFooterScreen = connect(
    mapStateToProps,
)(ListLoadingFooter);

export default HistoryLoadingFooterScreen;
