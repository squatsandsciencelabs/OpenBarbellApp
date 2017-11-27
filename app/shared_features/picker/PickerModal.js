import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    Picker,
    TouchableOpacity,
    Platform
 }  from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles'; // TODO: shouldn't use settings panel styles, make a generic stylesheet instead

class PickerModal extends Component {

    // ACTIONS

    _onValueChange(value) {
        this.props.selectValue(value);
    }

    _close() {
        this.props.closeModal();
    }

    // RENDER

    render() {
         if (this.props.items.length <= 0) {
            return;
        }

        if (Platform.OS === 'ios') {
            return (
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.isModalShowing} >

                    <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{flex:1}} onPress={() => this._close()}>
                        </TouchableOpacity>

                        <Picker
                            style={{backgroundColor: 'white'}}
                            selectedValue={this.props.selectedValue}
                            onValueChange={(value) => this._onValueChange(value)}>
                            { this._renderItems() }
                        </Picker>
                    </View>

                </Modal>
            );
        } else {
            if (!this.props.color) {
                var color = 'rgba(47, 128, 237, 1)';
            } else {
                var color = this.props.color;
            }
            return (
                <Picker
                    style={{color: color}}
                    selectedValue={this.props.selectedValue}
                    onValueChange={(value) => this._onValueChange(value)}>
                    { this._renderItems() }
                </Picker>
            );
        }
    }

    _renderItems() {
        var count = 0;
        return this.props.items.map(function (item) {
            return (<Picker.Item key={count++} label={item.label} value={item.value} />);
        });
    }
}

export default PickerModal;
