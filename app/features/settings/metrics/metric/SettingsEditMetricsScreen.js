import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Platform } from 'react-native';

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    AVG_QUANTIFIER,
    BEST_EVER_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsEditMetricsActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as CollapsedMetricsUtility from 'app/utility/transforms/CollapsedMetrics';

const pickerItem = (metric) => ({
    label: CollapsedMetricsUtility.metricString(metric),
    value: metric,
});

const generateItems = (quantifier) => {
    switch (quantifier) {
        case BEST_EVER_QUANTIFIER:
            return [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        case AVG_QUANTIFIER:
        case ABS_LOSS_QUANTIFIER:
            return [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        default:
            return [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(PKH_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
    };
};

const mapStateToProps = (state, ownProps) => {
    if (Platform.OS === 'ios') {
        return {
            isModalShowing: CollapsedSettingsSelectors.getIsEditingMetric(state),
            items: generateItems(CollapsedSettingsSelectors.getCurrentQuantifier(state)),
            selectedValue: CollapsedSettingsSelectors.getCurrentMetric(state),
        };
    } else {
        switch (ownProps.rank) {
            case 1:
                return {
                    items: generateItems(CollapsedSettingsSelectors.getQuantifier1(state)),
                    selectedValue: CollapsedSettingsSelectors.getMetric1(state),
                };
            case 2:
                return {
                    items: generateItems(CollapsedSettingsSelectors.getQuantifier2(state)),
                    selectedValue: CollapsedSettingsSelectors.getMetric2(state),
                };
            case 3:
                return {
                    items: generateItems(CollapsedSettingsSelectors.getQuantifier3(state)),
                    selectedValue: CollapsedSettingsSelectors.getMetric3(state),
                };
            case 4:
                return {
                    items: generateItems(CollapsedSettingsSelectors.getQuantifier4(state)),
                    selectedValue: CollapsedSettingsSelectors.getMetric4(state),
                };
            case 5:
                return {
                    items: generateItems(CollapsedSettingsSelectors.getQuantifier5(state)),
                    selectedValue: CollapsedSettingsSelectors.getMetric5(state),
                };
            default:
                return {};
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsEditMetricsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsEditMetricsScreen;
