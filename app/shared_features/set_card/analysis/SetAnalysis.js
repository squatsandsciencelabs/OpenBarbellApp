import React, {Component} from 'react';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetAnalysis extends Component {

    _renderAnalysis(metric, metricFunction) {
        if (!metricFunction) {
            return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={styles.text}> - </Text>
                    <Text style={styles.metric}>
                        {metric}
                    </Text>
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

    _renderMetric(metric, quantifier) {
        switch (metric) {
            case 'Avg Velocity': 
                 return this._renderAnalysis(metric, CollapsedMetrics.getAvgOfAvgVelocities(this.props.set));
            case 'Avg PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getAvgPKV(this.props.set));
            case 'Avg ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getAvgROM(this.props.set));
            case 'Avg Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getAvgDuration(this.props.set));
            case 'Abs Loss of Velocity': 
                return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfAvgVelocities(this.props.set));
            case 'Abs Loss of PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfPKVs(this.props.set));
            case 'Abs Loss of ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfROMs(this.props.set));
            case 'Abs Loss of Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getAbsLossOfDurations(this.props.set));
            case 'First Rep Velocity': 
                return this._renderAnalysis(metric, CollapsedMetrics.getFirstAvgVelocity(this.props.set));
            case 'First Rep PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getFirstPKV(this.props.set));
            case 'First Rep PKH': 
                return this._renderAnalysis(metric, CollapsedMetrics.getFirstPKH(this.props.set));
            case 'First Rep ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getFirstROM(this.props.set));
            case 'First Rep Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getFirstDuration(this.props.set));
            case 'Last Rep Velocity': 
                return this._renderAnalysis(metric, CollapsedMetrics.getLastAvgVelocity(this.props.set));
            case 'Last Rep PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getLastPKV(this.props.set));
            case 'Last Rep PKH': 
                return this._renderAnalysis(metric, CollapsedMetrics.getLastPKH(this.props.set));
            case 'Last Rep ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getLastROM(this.props.set));
            case 'Last Rep Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getLastDuration(this.props.set));
            case 'Min Velocity': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMinAvgVelocity(this.props.set));
            case 'Min PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMinPKV(this.props.set));
            case 'Min PKH': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMinPKH(this.props.set));
            case 'Min ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getMinROM(this.props.set));
            case 'Min Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMinDuration(this.props.set));          
            case 'Max Velocity': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMaxAvgVelocity(this.props.set));
            case 'Max PKV': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMaxPKV(this.props.set));
            case 'Max PKH': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMaxPKH(this.props.set));
            case 'Max ROM':
                return this._renderAnalysis(metric, CollapsedMetrics.getMaxROM(this.props.set));
            case 'Max Duration': 
                return this._renderAnalysis(metric, CollapsedMetrics.getMaxDuration(this.props.set));
            case 'Best Ever Velocity':
                return this._renderAnalysis(metric, SetsSelectors.getBestAvgVelocityEver(this.props.state, this.props.set));
            case 'Best Ever PKV':
                return this._renderAnalysis(metric, SetsSelectors.getBestPKVEver(this.props.state, this.props.set));
            case 'Best Ever Duration':
                return this._renderAnalysis(metric, SetsSelectors.getBestDurationEver(this.props.state, this.props.set));
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
                {this._renderMetric(this.props.metric1, this.props.quantifier1)}
                {this._renderMetric(this.props.metric2, this.props.quantifier2)}
                {this._renderMetric(this.props.metric3, this.props.quantifier3)}
                {this._renderMetric(this.props.metric4, this.props.quantifier4)}
                {this._renderMetric(this.props.metric5, this.props.quantifier5)}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 10
    },
    metric: {
        fontSize: 12,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 2
    }
});

export default SetAnalysis;
