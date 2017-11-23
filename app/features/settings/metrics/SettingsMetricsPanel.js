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
import SettingsCollapsedLastRepMetrics from './metric/SettingsCollapsedLastRepMetrics';
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
        let num = metricPosition.substr(metricPosition.length - 1);
        return (
            <TouchableOpacity onPress={() => this._tapcurrentMetricPosition(metricPosition, quantifier)}>
                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                    {num}. {metric}  
                </Text>
            </TouchableOpacity>
        );
    }

    _renderQuantifier(metricPosition, quantifier, quantifierPosition) {
        return (
            <TouchableOpacity onPress={() => this._tapcurrentQuantifierPosition(metricPosition, quantifierPosition)}>
                <Text style={{fontSize: 16, color: 'rgba(47, 128, 237, 1)'}}>
                    {quantifier}    
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>Metrics</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginBottom: 15}}>
                                {this._renderMetric(this.props.metric1, 'metric1', this.props.quantifier1)}
                                {this._renderMetric(this.props.metric2, 'metric2', this.props.quantifier2)}
                                {this._renderMetric(this.props.metric3, 'metric3', this.props.quantifier3)}
                                {this._renderMetric(this.props.metric4, 'metric4', this.props.quantifier4)}
                                {this._renderMetric(this.props.metric5, 'metric5', this.props.quantifier5)}
                            </View>
                            <SettingsCollapsedLastRepMetrics />
                            <SettingsCollapsedBestEverMetrics />
                            <View style={{marginBottom: 15, marginLeft: 50}}>
                                {this._renderQuantifier('metric1', this.props.quantifier1, 'quantifier1')}
                                {this._renderQuantifier('metric2', this.props.quantifier2, 'quantifier2')}
                                {this._renderQuantifier('metric3', this.props.quantifier3, 'quantifier3')}
                                {this._renderQuantifier('metric4', this.props.quantifier4, 'quantifier4')}
                                {this._renderQuantifier('metric5', this.props.quantifier5, 'quantifier5')}
                            </View>
                            <SettingsQuantifiers />
                    </View>
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
