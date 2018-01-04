import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { Scatterplot } from 'react-native-pathjs-charts'

class OneRMChartView extends Component {
    render() {
        const options = {
            width: 300,
            height: 300,
            r: 2,
            margin: {
              top: 20,
              left: 40,
              bottom: 30,
              right: 30
            },
            fill: "#2980B9",
            stroke: "#3E90F0",
            animate: {
              type: 'delayed',
              duration: 200
            },
            label: {
              fontFamily: 'Arial',
              fontSize: 8,
              fontWeight: true,
              fill: '#34495E'
            },
            axisX: {
              showAxis: true,
              showLines: true,
              showLabels: true,
              showTicks: true,
              zeroAxis: false,
              orient: 'bottom',
              label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
              }
            },
            axisY: {
              showAxis: true,
              showLines: true,
              showLabels: true,
              showTicks: true,
              zeroAxis: false,
              orient: 'left',
              label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
              }
            }
        }
      
        return (
            <View>
                <Scatterplot data={this.props.data} 
                    options={options} 
                    xKey="weight" yKey="velocity" 
                />
            </View>
        );
    }
}

export default OneRMChartView;
