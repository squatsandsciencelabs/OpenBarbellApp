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
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
} from 'app/constants/CollapsedMetricTypes';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import SettingsCollapsedMetrics from './metric/SettingsCollapsedMetrics';
import SettingsQuantifiers from './quantifier/SettingsQuantifiers';
import * as CollapsedMetricsUtility from 'app/utility/transforms/CollapsedMetrics';

class SettingsMetricsPanel extends Component {

    // ACTIONS

    _tapCurrentMetric(row) {
        this.props.tapMetric(row)
    }

    _tapCurrentQuantifier(row) {
        this.props.tapQuantifier(row)
    }

    // RENDER

    _renderMetric(row, metric) {
        return (
            <TouchableOpacity
                style={[SETTINGS_PANEL_STYLES.blueButton, {width: 150, height: 30, marginLeft: 10, marginBottom: 10}]}
                onPress={() => this._tapCurrentMetric(row)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {CollapsedMetricsUtility.metricToString(metric)}  <Icon name="caret-down" size={10} color='white' />
                </Text>
            </TouchableOpacity>
        );
    }

    _renderQuantifier(row, quantifier) {
        return (
            <TouchableOpacity
                style={[SETTINGS_PANEL_STYLES.blueButton, {width: 100, height: 30, marginLeft: 15, marginBottom: 10}]}
                onPress={() => this._tapCurrentQuantifier(row)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {CollapsedMetricsUtility.quantifierToString(quantifier)}  <Icon name="caret-down" size={10} color='white' />  
                </Text>
            </TouchableOpacity>
        );
    }

    _renderRow(row, quantifier, metric) {
        if (row === 1) {
            if (metric !== 'RPE') {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.bigMetricBackground}>
                            <Text style={styles.bigMetricNumber}>{row}</Text>
                        </View>
                        {this._renderQuantifier(row, quantifier)}
                        {this._renderMetric(row, metric)}
                    </View>            
                );
            } else {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.bigMetricBackground}>
                            <Text style={styles.bigMetricNumber}>{row}</Text>
                        </View>
                        {this._renderMetric(row, metric)}
                    </View>            
                );     
            }
        } else {
            if (metric === 'RPE') {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.numberLabel}>{row}</Text>
                        {this._renderMetric(row, metric)}
                    </View>            
                );
            } else {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.numberLabel}>{row}</Text>
                        {this._renderQuantifier(row, quantifier)}
                        {this._renderMetric(row, metric)}
                    </View>            
                ); 
            }
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{marginBottom: 15}}>
                            {this._renderRow(1, this.props.quantifier1, this.props.metric1)}
                            {this._renderRow(2, this.props.quantifier2, this.props.metric2)}
                            {this._renderRow(3, this.props.quantifier3, this.props.metric3)}
                            {this._renderRow(4, this.props.quantifier4, this.props.metric4)}
                            {this._renderRow(5, this.props.quantifier5, this.props.metric5)}
                        </View>
                    <SettingsCollapsedMetrics />
                    <SettingsQuantifiers />
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{marginBottom: 15}}>
                            {this._renderRow(1, this.props.quantifier1, this.props.metric1)}
                            {this._renderRow(2, this.props.quantifier2, this.props.metric2)}
                            {this._renderRow(3, this.props.quantifier3, this.props.metric3)}
                            {this._renderRow(4, this.props.quantifier4, this.props.metric4)}
                            {this._renderRow(5, this.props.quantifier5, this.props.metric5)}
                    </View>
                    <SettingsCollapsedMetrics />
                    <SettingsQuantifiers />
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
    bigMetricNumber: {
        textAlign: 'center',
        fontSize: 15,
        color: '#f0565a',
    },
    bigMetricBackground: {
        marginLeft: -5,
        backgroundColor: '#fddddd',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        borderColor: '#fddddd'
    },
    numberLabel: {
        fontSize: 15,
        marginRight: 10,
        marginTop: 5
    }
});

export default SettingsMetricsPanel;
