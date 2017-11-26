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
                <View style={{flex: 1, flexDirection: 'column', marginTop: -2, justifyContent: 'center'}}>
                    <Text style={styles.text}>{value}</Text>
                    <Text style={styles.metric}>{description}</Text>
                </View>  
            );              
        }
    }

    render() {
        return (
            <View style={[styles.border, styles.container, {flex:1, flexDirection: 'row'}]}>
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
    container: {
        overflow: 'hidden',
        backgroundColor:'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    text: {
        marginLeft: 5,
        color: '#4d4d4d',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    metric: {
        color: '#4d4d4d',
        fontSize: 9,
        fontWeight: "500",
        textAlign: 'center',
    },
    bigMetricBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fddddd',
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        borderColor: '#fddddd',
        overflow: 'hidden',        
    },
    bigMetricText: {
        textAlign: 'center',
        color: '#f0565a',        
        fontSize: 20,
        fontWeight: 'bold',
    }, 
    bigMetric: {
        textAlign: 'center',
        color: '#f0565a',
        fontSize: 10,
        marginTop: 2,
        fontWeight: 'bold',        
    }
});

export default SetAnalysis;
