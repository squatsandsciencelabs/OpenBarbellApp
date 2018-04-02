import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DatePickerModal from 'app/shared_features/date_picker/DatePickerModal';
import * as Actions from './EditHistoryFilterStartDateActions';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';

const mapStateToProps = (state) => ({
    isModalShowing: HistorySelectors.getIsEditingHistoryFilterStartingDate(state),
    date: HistorySelectors.getEditingHistoryFilterStartingDate(state),
    placeholder: 'from',
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeDate: Actions.changeDate,
    }, dispatch);
};

const EditHistoryFilterStartDateScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatePickerModal);

export default EditHistoryFilterStartDateScreen;
