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

    _tappedSetMetric() {
        this.props.tapSetDefaultMetric()
    }

    // RENDER

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                        <View>
                            <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                                Time to start new set
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this._tappedSetTimer()}>
                                <Text style={SETTINGS_PANEL_STYLES.tappableText  }>
                                    { DateUtils.timerDurationDescription(this.props.endSetTimerDuration) }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <SettingsEndSetTimerScreen />
                    </View>
                    <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                        <View>
                            <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                                Set default metric
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this._tappedSetMetric()}>
                                <Text style={SETTINGS_PANEL_STYLES.tappableText  }>
                                  {this.props.defaultMetric}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <SettingsMetric />
                    </View>                    
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
                    <SettingsMetric />
                </View>
            );
        }
    }

}

export default SettingsApplicationPanel;
