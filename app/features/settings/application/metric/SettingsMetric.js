import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsMetricActions';

const mapStateToProps = (state) => ({
    isModalShowing: state.settings.isEditingDefaultMetric,
    items: [
        {label: 'kgs', value: 'kgs'},
        {label: 'lbs', value: 'lbs'}
    ],
    selectedValue: state.settings.defaultMetric
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultMetricSetting,
        closeModal: Actions.dismissDefaultMetricSetter
    }, dispatch);
};

const SettingsMetric = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsMetric;
