import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { VictoryChart, VictoryScatter } from 'victory-native';

class OneRMChartView extends Component {
    render() {
        return (
            <View>
                <VictoryChart>
                    <VictoryScatter
                        style={{ data: { fill: "#c43a31" } }}
                        size={7}
                        data={this.props.data}
                    />
                </VictoryChart>
            </View>
        );
    }
}

export default OneRMChartView;
