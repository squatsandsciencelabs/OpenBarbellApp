import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsCollapsedMetricActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingBestEverMetric(state),
    items: [
        {label: 'Velocity', value: 'Velocity'},
        {label: 'PKV', value: 'PKV'},       
        {label: 'Dur', value: 'Dur'}
    ],
    
    selectedValue: SettingsSelectors.getCurrentMetric(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsCollapsedBestEverMetrics = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsCollapsedBestEverMetrics;
