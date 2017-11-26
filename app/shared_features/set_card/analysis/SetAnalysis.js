import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

class SetAnalysis extends Component {

    _renderAnalysis(value, description, isBigMetric) {
        if (isBigMetric) {
            return (
                <View style={styles.bigMetricBackground}>
                    <Text style={styles.bigMetricText}>{value}</Text>
                    <Text style={styles.bigMetric}>{description}</Text>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={styles.text}>{value}</Text>
                    <Text style={styles.metric}>{description}</Text>
                </View>  
            );              
        }
    }

    render() {
        return (
            <View style={[styles.border, {flex:1, flexDirection: 'row', alignItems:'stretch', backgroundColor:'white'}]}>
                {this._renderAnalysis(this.props.value1, this.props.description1, true)}
                {this._renderAnalysis(this.props.value2, this.props.description2, false)}
                {this._renderAnalysis(this.props.value3, this.props.description3, false)}
                {this._renderAnalysis(this.props.value4, this.props.description4, false)}
                {this._renderAnalysis(this.props.value5, this.props.description5, false)}
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
