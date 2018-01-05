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
                <Scatterplot 
                    data={this.props.data} 
                    options={this.props.options} 
                    xKey="weight" yKey="velocity" 
                />
            </View>
        );
    }
}

export default OneRMChartView;
