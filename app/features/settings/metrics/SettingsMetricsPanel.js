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

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import SettingsCollapsedMetrics from './metric/SettingsCollapsedMetrics';
import SettingsCollapsedAvgMetrics from './metric/SettingsCollapsedAvgMetrics';
import SettingsCollapsedBestEverMetrics from './metric/SettingsCollapsedBestEverMetrics';
import SettingsQuantifiers from './quantifier/SettingsQuantifiers';

class SettingsMetricsPanel extends Component {

    // ACTIONS

    _tapcurrentMetricPosition(metricPosition, quantifier) {
        this.props.tapMetric(metricPosition, quantifier)
    }

    _tapcurrentQuantifierPosition(metricPosition, quantifierPosition) {
        this.props.tapQuantifier(metricPosition, quantifierPosition)
    }

    _renderMetric(metric, metricPosition, quantifier) {
        return (
            <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {width: 150, height: 30, marginLeft: 10, marginBottom: 10}]} onPress={() => this._tapcurrentMetricPosition(metricPosition, quantifier)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {metric}  <Icon name="caret-down" size={10} color='white' />
                </Text>
            </TouchableOpacity>
        );
    }

    _renderQuantifier(metricPosition, quantifier, quantifierPosition) {
        return (
            <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {width: 100, height: 30, marginLeft: 15, marginBottom: 10}]} onPress={() => this._tapcurrentQuantifierPosition(metricPosition, quantifierPosition)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {quantifier}  <Icon name="caret-down" size={10} color='white' />  
                </Text>
            </TouchableOpacity>
        );
    }

    _renderRow(metric, metricPosition, quantifier, quantifierPosition) {
        let num = metricPosition.substr(metricPosition.length - 1);
        if (num === '1') {
            return (
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.bigMetricBackground}>
                        <Text style={styles.bigMetricNumber}>{num}</Text>
                    </View>
                    {this._renderMetric(metric, metricPosition, quantifier)}
                    {this._renderQuantifier(metricPosition, quantifier, quantifierPosition)}
                </View>            
            );   
        } else {
            return (
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.numberLabel}>{num}</Text>
                    {this._renderMetric(metric, metricPosition, quantifier)}
                    {this._renderQuantifier(metricPosition, quantifier, quantifierPosition)}
                </View>            
            ); 
        }
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{marginBottom: 15}}>
                            {this._renderRow(this.props.metric1, 'metric1', this.props.quantifier1, 'quantifier1')}
                            {this._renderRow(this.props.metric2, 'metric2', this.props.quantifier2, 'quantifier2')}
                            {this._renderRow(this.props.metric3, 'metric3', this.props.quantifier3, 'quantifier3')}
                            {this._renderRow(this.props.metric4, 'metric4', this.props.quantifier4, 'quantifier4')}
                            {this._renderRow(this.props.metric5, 'metric5', this.props.quantifier5, 'quantifier5')}
                        </View>
                    <SettingsCollapsedMetrics />
                    <SettingsCollapsedAvgMetrics />
                    <SettingsCollapsedBestEverMetrics />
                    <SettingsQuantifiers />
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{marginBottom: 15}}>
                            {this._renderRow(this.props.metric1, 'metric1', this.props.quantifier1, 'quantifier1')}
                            {this._renderRow(this.props.metric2, 'metric2', this.props.quantifier2, 'quantifier2')}
                            {this._renderRow(this.props.metric3, 'metric3', this.props.quantifier3, 'quantifier3')}
                            {this._renderRow(this.props.metric4, 'metric4', this.props.quantifier4, 'quantifier4')}
                            {this._renderRow(this.props.metric5, 'metric5', this.props.quantifier5, 'quantifier5')}
                        </View>
                    <SettingsCollapsedLastRepMetrics />
                    <SettingsCollapsedBestEverMetrics />
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
