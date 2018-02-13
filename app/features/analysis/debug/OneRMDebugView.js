import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class OneRMDebugView extends Component {
    render() {
        if (this.props.visible) {
            return (
                <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton]} onPress={ () => this.props.onPressButton() } >
                    <Text style={[SETTINGS_PANEL_STYLES.buttonText]}>Enable Debug Data</Text>
                </TouchableOpacity>
            );
        } else {
            return (<View></View>);
        }
    }
}

export default OneRMDebugView;
