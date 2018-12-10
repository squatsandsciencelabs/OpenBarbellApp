import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Picker,
    Platform,
    Switch,
    StyleSheet,
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as DateUtils from 'app/utility/DateUtils';
import SettingsEndSetTimerScreen from './timer/SettingsEndSetTimerScreen';
import SettingsMetric from './metric/SettingsMetric';
import * as Device from 'app/utility/Device';

class SettingsApplicationPanel extends Component {

    // ACTIONS

    _tappedSetTimer() {
        this.props.tapEndSetTimer()
    }

    _tapDefaultMetric() {
        this.props.tapDefaultMetric()
    }

    _renderVelSwitch() {
        if (Platform.OS === 'ios') {
            return (
                <Switch
                    style={{backgroundColor: 'white', marginRight: 5}}
                    value={this.props.velocityThresholdEnabled}
                    onValueChange={(isSwitchOn) => this.props.toggleVelocityThreshold()}
                    onTintColor='rgba(47, 128, 237, 1)'
                    thumbTintColor='#e0e0e0'
                    tintColor='rgba(47, 128, 237, 1)'/>
            );
        } else {
            return (
                <Switch
                    value={this.props.velocityThresholdEnabled}
                    onValueChange={(isSwitchOn) => this.props.toggleVelocityThreshold()}
                    onTintColor='rgba(47, 128, 237, 1)'
                    thumbTintColor='#e0e0e0'
                    tintColor='rgba(47, 128, 237, 1)'/>
            );
        }
    }

    _renderVelThreshold() {
        const width = Device.isSmallDevice() ? 50 : 75;
        const velocityThreshold = this.props.velocityThreshold ? this.props.velocityThreshold : "";
        const fieldTextColor = this.props.velocityThresholdEnabled ? 'rgba(77, 77, 77, 1)' : 'rgba(189, 189, 189, 1)';
        return (
                <View style={[styles.field, { width: width, marginLeft: 5 }]}>
                    <TextInput
                        style={[styles.fieldText, {color: fieldTextColor}]}
                        keyboardType={'numeric'}
                        underlineColorAndroid={'transparent'}
                        editable = {this.props.velocityThresholdEnabled}
                        placeholder={"VT"}
                        placeholderTextColor={'rgba(189, 189, 189, 1)'}
                        value = {velocityThreshold}
                        onChangeText={(text) => this.props.onChangeVelocityThreshold(text)}
                    />
                </View>
        );
    }

    // RENDER

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Settings</Text>
                    <View>
                        <TouchableOpacity onPress={() => this._tappedSetTimer()}>
                            <Text style={[{marginBottom: 2}, styles.labelText]}>
                                Time to start new set
                            </Text>
                            <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                { DateUtils.timerDurationDescription(this.props.endSetTimerDuration) }{"\n"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <SettingsEndSetTimerScreen />
                    <View style={{marginBottom: 15}}>
                        <TouchableOpacity onPress={() => this._tapDefaultMetric()}>
                            <Text style={[{marginBottom: 2}, styles.labelText]}>
                                Default units
                            </Text>
                            <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                {this.props.defaultMetric}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <SettingsMetric />
                    <View style={{marginBottom: 15}}>
                        <Text style={[styles.labelText, { paddingTop: 10 }]}>Velocity Threshold</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 5}}>
                            {this._renderVelSwitch()}
                            {this._renderVelThreshold()}
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Settings</Text>
                    <View>
                        <Text style={[{marginLeft: 7, marginBottom: -10}, styles.labelText]}>
                            Time to start new set
                        </Text>
                    </View>
                    <SettingsEndSetTimerScreen />
                    <View style={{marginTop: 10}}>
                        <Text style={[{marginLeft: 7, marginBottom: -10}, styles.labelText]}>
                            Set default metric
                        </Text>
                    </View>
                    <SettingsMetric />
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 20,
    },
    labelText: {
        fontSize: 16,
        color: 'rgba(77, 77, 77, 1)',
    },
    field: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
        borderWidth: 3,
        borderRadius: 3,
        marginBottom: 5,
        zIndex: 2,
        minHeight: 35,
    },
    fieldText: {
        height: 29,
        fontSize: 13,
        paddingLeft: 4,
        paddingTop: 4,
        paddingBottom: 5,
        paddingRight: 30,
    },
});

export default SettingsApplicationPanel;
