import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsCollapsedMetricActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingCollapsedMetric(state),
    items: [
        {label: 'Avg Velocities', value: 'Avg Velocities'},
        {label: 'Avg PKV', value: 'Avg PKV'},
        {label: 'Avg PKH', value: 'Avg PKH'},        
        {label: 'Avg ROM', value: 'Avg ROM'},
        {label: 'Avg Duration', value: 'Avg Duration'},
        {label: 'Abs Loss of Velocities', value: 'Abs Loss Velocities'},
        {label: 'Abs Loss of PKV', value: 'Abs Loss of PKV'},
        {label: 'Abs Loss of PKH', value: 'Abs Loss of PKH'},
        {label: 'Abs Loss of ROM', value: 'Abs Loss of ROM'},
        {label: 'Abs Loss of Duration', value: 'Abs Loss of Duration'},
        {label: 'First Rep Velocity', value: 'First Rep Velocity'},
        {label: 'First Rep PKV', value: 'First Rep PKV'},
        {label: 'First Rep PKH', value: 'First Rep PKH'},
        {label: 'First Rep ROM', value: 'First Rep ROM'},
        {label: 'First Rep Duration', value: 'First Rep Duration'},
        {label: 'Last Rep Velocity', value: 'Last Rep Velocity'},
        {label: 'Last Rep PKV', value: 'Last Rep PKV'},
        {label: 'Last Rep PKH', value: 'Last Rep PKH'},
        {label: 'Last Rep ROM', value: 'Last Rep ROM'},
        {label: 'Last Rep Duration', value: 'Last Rep Duration'},
        {label: 'Min Velocity', value: 'Min Velocity'},
        {label: 'Min PKV', value: 'Min PKV'},
        {label: 'Min PKH', value: 'Min PKH'},
        {label: 'Min ROM', value: 'Min ROM'},
        {label: 'Min Duration', value: 'Min Duration'},
        {label: 'Max Velocity', value: 'Max Velocity'},
        {label: 'Max PKV', value: 'Max PKV'},
        {label: 'Max PKH', value: 'Max PKH'},
        {label: 'Max ROM', value: 'Max ROM'},
        {label: 'Max Duration', value: 'Max Duration'}
    ],
    
    selectedValue: SettingsSelectors.getDefaultCollapsedMetric(state.currentMetricEditing, state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaulCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsCollapsedMetric = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsCollapsedMetric;
