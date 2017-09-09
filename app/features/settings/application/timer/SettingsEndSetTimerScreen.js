import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import * as Actions from './SettingsEndSetTimerActions';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const itemForDuration = (duration) => {
    return {
        label: DateUtils.timerDurationDescription(duration),
        value: duration
    };
};

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingEndSetTimer(state),
    items: [
        itemForDuration(0),
        itemForDuration(30),
        itemForDuration(60),
        itemForDuration(120),
        itemForDuration(300)
    ],
    selectedValue: SettingsSelectors.getEndSetTimerDuration(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveEndSetTimer,
        closeModal: Actions.dismissEndSetTimer
    }, dispatch);
};

const SettingsEndSetTimerScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsEndSetTimerScreen;
