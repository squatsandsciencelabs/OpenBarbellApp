import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsMetricActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingDefaultMetric(state),
    items: [
        {label: 'kgs', value: 'kgs'},
        {label: 'lbs', value: 'lbs'}
    ],
    selectedValue: SettingsSelectors.getDefaultMetric(state)
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
