import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'app/shared_features/date_picker/DatePicker';

import * as Actions from './EditHistoryFilterEndDateActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import * as DateUtils from 'app/utility/DateUtils';

const mapStateToProps = (state) => ({
    date: DateUtils.getDate(HistorySelectors.getEditingHistoryFilterEndingDate(state)),
    isVisible: HistorySelectors.getIsEditingHistoryFilterEndingDate(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeDate: Actions.changeDate,
        closePicker: Actions.dismissPicker,
    }, dispatch);
};

const EditHistoryFilterEndDateScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatePicker);

export default EditHistoryFilterEndDateScreen;
