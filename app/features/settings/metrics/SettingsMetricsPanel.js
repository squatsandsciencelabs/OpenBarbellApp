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
import SettingsEditMetricsScreen from './metric/SettingsEditMetricsScreen';
import SettingsEditQuantifiersScreen from './quantifier/SettingsEditQuantifiersScreen';
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
                style={[SETTINGS_PANEL_STYLES.blueButton, {width: 90, height: 30, marginLeft: 10, marginBottom: 10}]}
                onPress={() => this._tapCurrentMetric(row)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {CollapsedMetricsUtility.metricAbbreviation(metric)}
                </Text>
                <Icon name="caret-down" size={10} color='white' style={{right: 10, position:'absolute'}} />
            </TouchableOpacity>
        );
    }

    _renderQuantifier(row, quantifier) {
        return (
            <TouchableOpacity
                style={[SETTINGS_PANEL_STYLES.blueButton, {width: 130, height: 30, marginLeft: 10, marginBottom: 10}]}
                onPress={() => this._tapCurrentQuantifier(row)}>
                <Text style={SETTINGS_PANEL_STYLES.buttonText}>
                    {CollapsedMetricsUtility.quantifierString(quantifier)}
                </Text>
                <Icon name="caret-down" size={10} color='white' style={{right: 10, position:'absolute'}} />
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
                        <View style={styles.numberBackground}>
                            <Text style={styles.numberLabel}>{row}</Text>
                        </View>
                        {this._renderMetric(row, metric)}
                    </View>            
                );
            } else {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.numberBackground}>
                            <Text style={styles.numberLabel}>{row}</Text>
                        </View>
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
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Big Metrics</Text>
                    <View style={{marginBottom: 15}}>
                        {this._renderRow(1, this.props.quantifier1, this.props.metric1)}
                        {this._renderRow(2, this.props.quantifier2, this.props.metric2)}
                        {this._renderRow(3, this.props.quantifier3, this.props.metric3)}
                        {this._renderRow(4, this.props.quantifier4, this.props.metric4)}
                        {this._renderRow(5, this.props.quantifier5, this.props.metric5)}
                    </View>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.props.tappedBigMetricsInfo() }>
                        <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >What are these metrics?</Text>
                    </TouchableOpacity>
                    <SettingsEditMetricsScreen />
                    <SettingsEditQuantifiersScreen />
                </View>
            );
        } else {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                    <View style={{marginBottom: 15}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.bigMetricBackground}><Text style={styles.bigMetricNumber}>1</Text></View>
                            <View style={[{flex: 0.63}, styles.dropdownButton]}><SettingsEditQuantifiersScreen color={'white'} rank={1} /></View>
                            <View style={[{flex: 0.37}, styles.dropdownButton]}><SettingsEditMetricsScreen color={'white'} rank={1} /></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.numberBackground}><Text style={styles.numberLabel}>2</Text></View>
                            <View style={[{flex: 0.63}, styles.dropdownButton]}><SettingsEditQuantifiersScreen color={'white'} rank={2} /></View>
                            <View style={[{flex: 0.37}, styles.dropdownButton]}><SettingsEditMetricsScreen color={'white'} rank={2} /></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.numberBackground}><Text style={styles.numberLabel}>3</Text></View>
                            <View style={[{flex: 0.63}, styles.dropdownButton]}><SettingsEditQuantifiersScreen color={'white'} rank={3} /></View>
                            <View style={[{flex: 0.37}, styles.dropdownButton]}><SettingsEditMetricsScreen color={'white'} rank={3} /></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.numberBackground}><Text style={styles.numberLabel}>4</Text></View>
                            <View style={[{flex: 0.63}, styles.dropdownButton]}><SettingsEditQuantifiersScreen color={'white'} rank={4} /></View>
                            <View style={[{flex: 0.37}, styles.dropdownButton]}><SettingsEditMetricsScreen color={'white'} rank={4} /></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.numberBackground}><Text style={styles.numberLabel}>5</Text></View>
                            <View style={[{flex: 0.63}, styles.dropdownButton]}><SettingsEditQuantifiersScreen color={'white'} rank={5} /></View>
                            <View style={[{flex: 0.37}, styles.dropdownButton]}><SettingsEditMetricsScreen color={'white'} rank={5} /></View>
                        </View>
                    </View>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.props.tappedBigMetricsInfo() }>
                        <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >What are these metrics?</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    dropdownButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderRadius: 3,
        marginLeft: 5,
        marginBottom: 5,
        height: 40,
    },
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
        backgroundColor: '#fddddd',
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        borderColor: '#fddddd',
        marginLeft: Platform.OS === 'ios' ? -5 : -10,
        marginTop: Platform.OS === 'ios' ? 2 : 11,
    },
    numberBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        marginLeft: Platform.OS === 'ios' ? -5 : -10,
        marginTop: Platform.OS === 'ios' ? 2 : 13,
    },
    numberLabel: {
        textAlign: 'center',
        fontSize: 15,
    }
});

export default SettingsMetricsPanel;
