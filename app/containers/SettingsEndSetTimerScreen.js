// app/containers/SettingsEndSetTimerScreen.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PickerModal from '../components/PickerModal';
import * as DateUtils from '../utility/DateUtils';
import * as SettingsActionCreators from '../actions/SettingsActionCreators';

const itemForDuration = (duration) => {
    return {
        label: DateUtils.timerDurationDescription(duration),
        value: duration
    };
};

const mapStateToProps = (state) => ({
	modalShowing: state.settings.editingEndSetTimer,
    items: [
        itemForDuration(0),
        itemForDuration(30),
        itemForDuration(60),
        itemForDuration(120),
        itemForDuration(300)
    ],
    selectedValue: state.settings.endSetTimerDuration
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		selectValue: SettingsActionCreators.updateSetTimer,
        closeModal: SettingsActionCreators.endEditSetTimer
	}, dispatch);
};

const SettingsEndSetTimerScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(PickerModal);

export default SettingsEndSetTimerScreen;
