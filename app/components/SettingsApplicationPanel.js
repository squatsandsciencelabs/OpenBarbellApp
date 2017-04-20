import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Picker,
    Platform
} from 'react-native'

import { SETTINGS_PANEL_STYLES } from '../styles/GlobalStyles';
import { timerDurationDescription } from '../utility/TimerDurationsMap';
import SettingsEndSetTimerScreen from '../containers/SettingsEndSetTimerScreen';

class SettingsApplicationPanel extends Component {

    // ACTIONS

    _tappedSetTimer() {
        this.props.editSetTimer()
    }

    // RENDER

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <View>
                        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                            Time to start new set
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this._tappedSetTimer()}>
                            <Text style={SETTINGS_PANEL_STYLES.tappableText  }>
                                { timerDurationDescription(this.props.endSetTimerDuration) }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <SettingsEndSetTimerScreen />
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <View>
                        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                            Time to start new set
                        </Text>
                    </View>
                    <SettingsEndSetTimerScreen />
                </View>
            );
        }
    }

}

export default SettingsApplicationPanel
