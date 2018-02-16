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
    FASTEST_EVER_QUANTIFIER,
    SLOWEST_EVER_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    PERCENT_LOSS_QUANTIFIER,
    SET_LOSS_QUANTIFIER,
    PEAK_END_QUANTIFIER,
} from 'app/configs+constants/CollapsedMetricTypes';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsEditMetricsActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as CollapsedMetricsUtility from 'app/math/CollapsedMetrics';

const pickerItem = (metric) => ({
    label: Platform.OS === 'ios' ? CollapsedMetricsUtility.metricString(metric) : CollapsedMetricsUtility.metricAbbreviation(metric),
    value: metric,
});

// NOTE: To avoid an android picker bug, the item order is explicitly set to Empty -> PKH -> ROM -> others
// Basically, if you don't do this, it's possible for the Picker to trigger each time Quantifier changes
// See https://github.com/facebook/react-native/issues/16849 for more information
// Once the bug is resolved, can redo the order into something that makes more sense
const generateItems = (quantifier) => {
    switch (quantifier) {
        case FASTEST_EVER_QUANTIFIER:
        case SLOWEST_EVER_QUANTIFIER:
            return [
                pickerItem(EMPTY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        case AVG_QUANTIFIER:
        case ABS_LOSS_QUANTIFIER:
        case PERCENT_LOSS_QUANTIFIER:
        case SET_LOSS_QUANTIFIER:
        case PEAK_END_QUANTIFIER:
            return [
                pickerItem(EMPTY_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        default:
            return [
                pickerItem(EMPTY_METRIC),
                pickerItem(PKH_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(AVG_VELOCITY_METRIC),
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

const mapDispatchToProps = (dispatch, ownProps) => {
    if (Platform.OS === 'ios') {
        return bindActionCreators({
            selectValue: Actions.saveCollapsedMetricSetting,
            closeModal: Actions.dismissCollapsedMetricSetter
        }, dispatch);
    } else {
        switch(ownProps.rank) {
            case 1:
                return bindActionCreators({
                    selectValue: Actions.saveCollapsedMetricSetting1,
                }, dispatch);
            case 2:
                return bindActionCreators({
                    selectValue: Actions.saveCollapsedMetricSetting2,
                }, dispatch);
            case 3:
                return bindActionCreators({
                    selectValue: Actions.saveCollapsedMetricSetting3,
                }, dispatch);
            case 4:
                return bindActionCreators({
                    selectValue: Actions.saveCollapsedMetricSetting4,
                }, dispatch);
            case 5:
                return bindActionCreators({
                    selectValue: Actions.saveCollapsedMetricSetting5,
                }, dispatch);
            default:
                return {};
        }
    }
};

const SettingsEditMetricsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsEditMetricsScreen;
