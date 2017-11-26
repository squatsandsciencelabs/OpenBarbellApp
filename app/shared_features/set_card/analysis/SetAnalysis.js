import React, {Component} from 'react';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetAnalysis extends Component {

    _renderAnalysis(metric, metricFunction, quantifier, bigMetric) {
        if (!metricFunction || metricFunction === '0.00') {
            if (bigMetric) {
                return (
                    <View style={styles.bigMetricBackground}>
                        <Text style={styles.bigMetricText}> --- </Text>
                        <Text style={styles.bigMetric}>
                            {quantifier} {metric} 
                        </Text>
                    </View>
                );
            } else {
                return (
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> --- </Text>
                        <Text style={styles.metric}>
                            {quantifier} {metric}
                        </Text>
                    </View>
                );                
            }
        } else {
            if (bigMetric) {
                return (
                    <View style={styles.bigMetricBackground}>
                        <Text style={styles.bigMetricText}>{metricFunction}</Text>
                        <Text style={styles.bigMetric}>{quantifier} {metric}</Text>
                    </View>
                );
            } else {
                return (
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.text}>
                            {metricFunction}
                        </Text>
                        <Text style={styles.metric}>
                            {quantifier} {metric}
                        </Text>
                    </View>  
                );              
            }
        }
    }

    _renderRPE(metric, metricFunction, bigMetric) {
        if (!metricFunction || metricFunction === '0.00') {
            if (bigMetric) {
                return (
                    <View style={styles.bigMetricBackground}>
                        <Text style={styles.bigMetricText}> --- </Text>
                        <Text style={styles.bigMetric}>
                            {metric} 
                        </Text>
                    </View>
                );
            } else {
                return (
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.text}> --- </Text>
                        <Text style={styles.metric}>
                            {metric}
                        </Text>
                    </View>
                );                
            }
        } else {
            if (bigMetric) {
                return (
                    <View style={styles.bigMetricBackground}>
                        <Text style={styles.bigMetricText}>{metricFunction}</Text>
                        <Text style={styles.bigMetric}> {metric}</Text>
                    </View>
                );
            } else {
                return (
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.text}>
                            {metricFunction}
                        </Text>
                        <Text style={styles.metric}>
                            {metric}
                        </Text>
                    </View>  
                );              
            }
        }        
    };

    _renderMetric(metric, quantifier, bigMetric) {
        switch (metric) {
            case 'Velocity':
                switch(quantifier) {
                    case 'Average':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAvgOfAvgVelocities(this.props.set), quantifier, bigMetric);
                    case 'Abs Loss':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfAvgVelocities(this.props.set), quantifier, bigMetric);
                    case 'First Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getFirstAvgVelocity(this.props.set), quantifier, bigMetric);
                    case 'Last Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getLastAvgVelocity(this.props.set), quantifier, bigMetric);
                    case 'Minimum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMinAvgVelocity(this.props.set), quantifier, bigMetric);
                    case 'Maximum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMaxAvgVelocity(this.props.set), quantifier, quantifier, bigMetric);
                    case 'Best Ever':
                        return this._renderAnalysis(metric, this.props.getBestAvgVelocityEver, quantifier, bigMetric);
                    }
            case 'PKV':
                switch(quantifier) {
                    case 'Average':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAvgPKV(this.props.set), quantifier, bigMetric);
                    case 'Abs Loss':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfPKVs(this.props.set), quantifier, bigMetric);
                    case 'First Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getFirstPKV(this.props.set), quantifier, bigMetric);
                    case 'Last Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getLastPKV(this.props.set), quantifier, bigMetric);
                    case 'Minimum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMinPKV(this.props.set), quantifier, bigMetric);
                    case 'Maximum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMaxPKV(this.props.set), quantifier, bigMetric);
                    case 'Best Ever':
                        return this._renderAnalysis(metric, this.props.getBestPKVEver, quantifier, bigMetric);
                }
            case 'PKH':
                switch(quantifier) {
                    case 'First Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getFirstPKH(this.props.set), quantifier, bigMetric);
                    case 'Last Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getLastPKH(this.props.set), quantifier, bigMetric);
                    case 'Minimum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMinPKH(this.props.set), quantifier, bigMetric);
                    case 'Maximum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMaxPKH(this.props.set), quantifier, bigMetric);
                }
            case 'ROM':
                switch(quantifier) {
                    case 'Average':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAvgROM(this.props.set), quantifier, bigMetric);
                    case 'Abs Loss':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfROMs(this.props.set), quantifier, bigMetric);
                    case 'First Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getFirstROM(this.props.set), quantifier, bigMetric);
                    case 'Last Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getLastROM(this.props.set), quantifier, bigMetric);
                    case 'Minimum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMinROM(this.props.set), quantifier, bigMetric);
                    case 'Maximum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMaxROM(this.props.set), quantifier, bigMetric);
                }
            case 'Dur': 
                switch(quantifier) {
                    case 'Average':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAvgDuration(this.props.set), quantifier, bigMetric);
                    case 'Abs Loss':
                        return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfDurations(this.props.set), quantifier, bigMetric);
                    case 'First Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getFirstDuration(this.props.set), quantifier, bigMetric);
                    case 'Last Rep':
                        return this._renderAnalysis(metric, CollapsedMetrics.getLastDuration(this.props.set), quantifier, bigMetric);
                    case 'Minimum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMinDuration(this.props.set), quantifier, bigMetric);
                    case 'Maximum':
                        return this._renderAnalysis(metric, CollapsedMetrics.getMaxDuration(this.props.set), quantifier, bigMetric);
                    case 'Best Ever':
                        return this._renderAnalysis(metric, this.props.getBestDurationEver, quantifier, bigMetric);
                    }
            case 'RPE': 
                return this._renderRPE(metric, CollapsedMetrics.getRPE(this.props.set), bigMetric);
            default:
                return (
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={styles.text}>
                            -
                        </Text>
                        <Text style={styles.metric}>
                            {metric}
                        </Text>
                    </View>
                );
        }
    }

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                {this._renderMetric(this.props.metric1, this.props.quantifier1, true)}
                {this._renderMetric(this.props.metric2, this.props.quantifier2, false)}
                {this._renderMetric(this.props.metric3, this.props.quantifier3, false)}
                {this._renderMetric(this.props.metric4, this.props.quantifier4, false)}
                {this._renderMetric(this.props.metric5, this.props.quantifier5, false)}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    text: {
        marginLeft: 5,
        color: '#4d4d4d',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 35,
    },
    metric: {
        marginLeft: 5,
        color: '#4d4d4d',
        maxWidth: 50,
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 5,
        marginTop: 2
    },
    bigMetricBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 15,
        marginHorizontal: 5,
        marginRight: 10,
        backgroundColor: '#fddddd',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderColor: '#fddddd'
    },
    bigMetricText: {
        textAlign: 'center',
        color: '#f0565a',        
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 15,
    }, 
    bigMetric: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f0565a',
        fontSize: 13,
        marginBottom: 15,
        marginTop: 2        
    }
});

export default SetAnalysis;
