import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Picker,
    Platform,
    Switch
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as DateUtils from 'app/utility/transforms/DateUtils';
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

    _tappedSwitch(isSwitchOn) {
        if (isSwitchOn) {
            this.props.showRemoved();
        } else {
            this.props.hideRemoved();
        }
    }

    // RENDER

    _renderShowDeleted() {
        if (Platform.OS === 'ios') {
            return (
                <View>            
                    <Text style={{fontSize: 16}}>Show deleted reps</Text>
                    <Switch
                        style={{backgroundColor: 'white', marginLeft: 3, marginRight: 5}}
                        value={this.props.shouldShowRemoved}
                        onValueChange={(isSwitchOn) => this._tappedSwitch(isSwitchOn)}
                        onTintColor='rgba(47, 128, 237, 1)'
                        thumbTintColor='lightgray'
                        tintColor='rgba(47, 128, 237, 1)'/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'column'}}>            
                    <Text style={{fontSize: 16, marginLeft: 7}}>Show deleted reps</Text>
                    <View style={{width: 55, marginTop: 10}}>
                        <Switch
                            value={this.props.shouldShowRemoved}
                            onValueChange={(isSwitchOn) => this._tappedSwitch(isSwitchOn)}
                            onTintColor='rgba(47, 128, 237, 1)'
                            thumbTintColor='lightgray'
                            tintColor='rgba(47, 128, 237, 1)'/>
                    </View>
                </View>
            );
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>Settings</Text>
                    <View>
                        <TouchableOpacity onPress={() => this._tappedSetTimer()}>
                            <Text style={{fontSize: 16}}>
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
                            <Text style={{fontSize: 16}}>
                                Default units
                            </Text>
                            <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                {this.props.defaultMetric}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <SettingsMetric />
                    {this._renderShowDeleted()}
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 13}}>Settings</Text>
                    <View>
                        <Text style={{fontSize: 16, marginLeft: 7}}>
                            Time to start new set
                        </Text>
                    </View>
                    <SettingsEndSetTimerScreen />
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 16, marginLeft: 7}}>
                            Set default metric
                        </Text>
                    </View>
                    <SettingsMetric />
                    {this._renderShowDeleted()}
                </View>
            );
        }
    }

}

export default SettingsApplicationPanel;
