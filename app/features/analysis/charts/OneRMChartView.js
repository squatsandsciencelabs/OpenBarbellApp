import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { Scatterplot } from 'react-native-pathjs-charts'

class OneRMChartView extends Component {
    render() {
        return (
            <View>
                <Scatterplot data={this.props.data} xKey="episode" yKey="rating" />
            </View>
        );
    }
}

export default OneRMChartView;
