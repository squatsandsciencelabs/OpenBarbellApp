import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsCollapsedMetricActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingBestEverMetric(state),
    items: [
        {label: 'Best Ever Velocity', value: 'Best Ever Velocity'},
        {label: 'Best Ever PKV', value: 'Best Ever PKV'},       
        {label: 'Best Ever Duration', value: 'Best Ever Duration'}
    ],
    
    selectedValue: SettingsSelectors.getCurrentMetric(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaulCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsCollapsedBestEverMetrics = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsCollapsedBestEverMetrics;