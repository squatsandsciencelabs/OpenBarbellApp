import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Picker,
    Platform,
    Switch,
    StyleSheet
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as DateUtils from 'app/utility/DateUtils';
import SettingsEndSetTimerScreen from './timer/SettingsEndSetTimerScreen';
import SettingsMetric from './metric/SettingsMetric';

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
            console.tron.log(this.props.velocityThresholdEnabled)
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
                        <View style={{padding: 5}}>{this._renderVelSwitch()}</View>
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
});

export default SettingsApplicationPanel;
