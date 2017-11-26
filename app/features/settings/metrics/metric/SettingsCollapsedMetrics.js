import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsCollapsedMetricActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingMetric(state),
    items: [
        {label: 'Velocity', value: 'Velocity'},
        {label: 'PKV', value: 'PKV'},
        {label: 'PKH', value: 'PKH'},
        {label: 'ROM', value: 'ROM'},
        {label: 'Dur', value: 'Dur'},
        {label: 'RPE', value: 'RPE'}
    ],
    
    selectedValue: SettingsSelectors.getCurrentMetric(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsCollapsedMetrics = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsCollapsedMetrics;
