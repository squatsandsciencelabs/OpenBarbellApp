import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsQuantifiersActions';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

const mapStateToProps = (state) => ({
    isModalShowing: SettingsSelectors.getIsEditingCollapsedMetric(state),
    items: [
        {label: 'Last Rep', value: 'Last Rep'},
        {label: 'Best Ever', value: 'Best Ever'},
    ],
    
    selectedValue: SettingsSelectors.getDefaultQuantifier(state.currentQuantifierEditing, state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaulQuantifierSetting,
        closeModal: Actions.dismissQuantifierSetter
    }, dispatch);
};

const SettingsQuantifiers = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsQuantifiers;
