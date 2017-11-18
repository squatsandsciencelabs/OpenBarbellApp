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
import * as DateUtils from 'app/utility/transforms/DateUtils';
import SettingsCollapsedMetric from './metric/SettingsCollapsedMetric';
import SettingsQuantifiers from './quantifier/SettingsQuantifiers';

class SettingsMetricsPanel extends Component {

    // ACTIONS

    _tapDefaultCollapsedMetric(metricPosition) {
        this.props.tapMetric(metricPosition)
    }

    _tapDefaultQuantifier(quantifierPosition) {
        this.props.tapQuantifier(quantifierPosition)
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{marginBottom: 15}}>
                            <TouchableOpacity onPress={() => this._tapDefaultQuantifier('metric1')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.metric1}    
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultQuantifier('metric2')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.metric2}            
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultQuantifier('metric3')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.metric3}            
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultQuantifier('metric4')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.metric4}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultQuantifier('metric5')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.metric5}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    <SettingsQuantifiers />
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Quantifier</Text>
                        <View style={{marginBottom: 15}}>
                            <TouchableOpacity onPress={() => this._tapDefaultCollapsedMetric('metric1')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.quantifier1}    
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultCollapsedMetric('metric2')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.quantifier2}            
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultCollapsedMetric('metric3')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.quantifier3}            
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultCollapsedMetric('metric4')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.quantifier4}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._tapDefaultCollapsedMetric('metric5')}>
                                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                                    {this.props.quantifier5}
                                </Text>
                        </TouchableOpacity>
                    </View>
                <SettingsQuantifiers />
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
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

export default SettingsMetricsPanel;
