import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    BEST_EVER_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';
import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsQuantifiersActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as CollapsedMetricsUtility from 'app/utility/transforms/CollapsedMetrics';

const pickerItem = (quantifier) => ({
    label: CollapsedMetricsUtility.quantifierToString(quantifier),
    value: quantifier,
});

const mapStateToProps = (state) => ({
    isModalShowing: CollapsedSettingsSelectors.getIsEditingQuantifier(state),
    items: [
        pickerItem(AVG_QUANTIFIER),
        pickerItem(ABS_LOSS_QUANTIFIER),
        pickerItem(FIRST_REP_QUANTIFIER),
        pickerItem(LAST_REP_QUANTIFIER),
        pickerItem(MIN_QUANTIFIER),
        pickerItem(MAX_QUANTIFIER),
        pickerItem(BEST_EVER_QUANTIFIER),
    ],
    selectedValue: CollapsedSettingsSelectors.getCurrentQuantifier(state),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultQuantifierSetting,
        closeModal: Actions.dismissQuantifierSetter
    }, dispatch);
};

const SettingsQuantifiers = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsQuantifiers;
