import React, {Component} from 'react';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetAnalysis extends Component {

    _renderAnalysis(metricFunction) {
        if (!metricFunction) {
            return '-';
        } else {
            return metricFunction;
        }
    }

    _renderMetric(metric, quantifier) {
        switch (metric) {
            case 'Avg Velocity': 
                 return this._renderAnalysis(CollapsedMetrics.getAvgOfAvgVelocities(this.props.set));
            case 'Avg PKV': 
                return this._renderAnalysis(CollapsedMetrics.getAvgPKV(this.props.set));
            case 'Avg ROM':
                return this._renderAnalysis(CollapsedMetrics.getAvgROM(this.props.set));
            case 'Avg Duration': 
                return this._renderAnalysis(CollapsedMetrics.getAvgDuration(this.props.set));
            case 'Abs Loss of Velocity': 
                return this._renderAnalysis(CollapsedMetrics.getAbsLossOfAvgVelocities(this.props.set));
            case 'Abs Loss of PKV': 
                return this._renderAnalysis(CollapsedMetrics.getAbsLossOfPKVs(this.props.set));
            case 'Abs Loss of ROM':
                return this._renderAnalysis(CollapsedMetrics.getAbsLossOfROMs(this.props.set));
            case 'Abs Loss of Duration': 
                return this._renderAnalysis(CollapsedMetrics.getAbsLossOfDurations(this.props.set));
            case 'First Rep Velocity': 
                return this._renderAnalysis(CollapsedMetrics.getFirstAvgVelocity(this.props.set));
            case 'First Rep PKV': 
                return this._renderAnalysis(CollapsedMetrics.getFirstPKV(this.props.set));
            case 'First Rep PKH': 
                return this._renderAnalysis(CollapsedMetrics.getFirstPKH(this.props.set));
            case 'First Rep ROM':
                return this._renderAnalysis(CollapsedMetrics.getFirstROM(this.props.set));
            case 'First Rep Duration': 
                return this._renderAnalysis(CollapsedMetrics.getFirstDuration(this.props.set));
            case 'Last Rep Velocity': 
                return this._renderAnalysis(CollapsedMetrics.getLastAvgVelocity(this.props.set));
            case 'Last Rep PKV': 
                return this._renderAnalysis(CollapsedMetrics.getLastPKV(this.props.set));
            case 'Last Rep PKH': 
                return this._renderAnalysis(CollapsedMetrics.getLastPKH(this.props.set));
            case 'Last Rep ROM':
                return this._renderAnalysis(CollapsedMetrics.getLastROM(this.props.set));
            case 'Last Rep Duration': 
                return this._renderAnalysis(CollapsedMetrics.getLastDuration(this.props.set));
            case 'Min Velocity': 
                return this._renderAnalysis(CollapsedMetrics.getMinAvgVelocity(this.props.set));
            case 'Min PKV': 
                return this._renderAnalysis(CollapsedMetrics.getMinPKV(this.props.set));
            case 'Min PKH': 
                return this._renderAnalysis(CollapsedMetrics.getMinPKH(this.props.set));
            case 'Min ROM':
                return this._renderAnalysis(CollapsedMetrics.getMinROM(this.props.set));
            case 'Min Duration': 
                return this._renderAnalysis(CollapsedMetrics.getMinDuration(this.props.set));          
            case 'Max Velocity': 
                return this._renderAnalysis(CollapsedMetrics.getMaxAvgVelocity(this.props.set));
            case 'Max PKV': 
                return this._renderAnalysis(CollapsedMetrics.getMaxPKV(this.props.set));
            case 'Max PKH': 
                return this._renderAnalysis(CollapsedMetrics.getMaxPKH(this.props.set));
            case 'Max ROM':
                return this._renderAnalysis(CollapsedMetrics.getMaxROM(this.props.set));
            case 'Max Duration': 
                return this._renderAnalysis(CollapsedMetrics.getMaxDuration(this.props.set));
            case 'Velocity':
                return this._renderAnalysis(SetsSelectors.getBestAvgVelocityEver(this.props.state, this.props.set));
            case 'PKV':
                return this._renderAnalysis(SetsSelectors.getBestPKVEver(this.props.state, this.props.set));
            case 'Duration':
                return this._renderAnalysis(SetsSelectors.getBestDurationEver(this.props.state, this.props.set));
            default:
                return '-'
        }
    }

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                <Text> 1. {this._renderMetric(this.props.metric1, this.props.quantifier1)}</Text>
                <Text> 2. {this._renderMetric(this.props.metric2, this.props.quantifier2)}</Text>
                <Text> 3. {this._renderMetric(this.props.metric3, this.props.quantifier3)}</Text>
                <Text> 4. {this._renderMetric(this.props.metric4, this.props.quantifier4)}</Text>
                <Text> 5. {this._renderMetric(this.props.metric5, this.props.quantifier5)}</Text>
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
});

export default SetAnalysis;
