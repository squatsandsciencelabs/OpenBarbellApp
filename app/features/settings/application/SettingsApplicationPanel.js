import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Picker,
    Platform
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

    _tappedSaveMetric() {
        this.props.tapSaveDefaultMetric()
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
                                    { DateUtils.timerDurationDescription(this.props.endSetTimerDuration) }{"\n"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <SettingsEndSetTimerScreen />
                        <View>
                            <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                                Set default metric
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this._tappedSaveMetric()}>
                                <Text style={SETTINGS_PANEL_STYLES.tappableText}>
                                  {this.props.defaultMetric}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <SettingsMetric />                        
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
                    <View>
                        <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                            Set default metric
                        </Text>
                    </View>
                    <SettingsMetric />                                            
                </View>
            );
        }
    }

}

export default SettingsApplicationPanel;
