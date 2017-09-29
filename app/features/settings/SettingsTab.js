import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    ListView
} from 'react-native';
import firebase from 'app/configs/firebase'
import SettingsDeviceScreen from './device/SettingsDeviceScreen';
import SettingsAccountScreen from './account/SettingsAccountScreen';
import SettingsApplicationScreen from './application/SettingsApplicationScreen';
import SettingsFeedbackScreen from './feedback/SettingsFeedbackPanel';

class SettingsTab extends Component {
    componentDidMount() {
        firebase.analytics().setCurrentScreen('Settings');
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent:'flex-start' }}>
                <SettingsDeviceScreen />
                <SettingsApplicationScreen />
                <SettingsAccountScreen />
                <SettingsFeedbackScreen />
            </View>
        );
    }
}

export default SettingsTab;
