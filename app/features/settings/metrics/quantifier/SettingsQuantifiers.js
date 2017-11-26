import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsQuantifiersActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingQuantifier(state),
    items: [
        {label: 'Average', value: 'Average'},
        {label: 'Abs Loss', value: 'Abs Loss'},
        {label: 'First Rep', value: 'First Rep'},
        {label: 'Last Rep', value: 'Last Rep'},
        {label: 'Minimum', value: 'Minimum'},
        {label: 'Maximum', value: 'Maximum'},
        {label: 'Best Ever', value: 'Best Ever'},
    ],
    
    selectedValue: SettingsSelectors.getCurrentQuantifier(state)
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
