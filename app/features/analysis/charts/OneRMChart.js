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
                    options={options} 
                    xKey="weight" yKey="velocity" 
                />
            </View>
        );
    }
}

const options = {
    width: 250,
    height: 250,
    r: 2,
    margin: {
      top: 30,
      left: 30,
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

export default OneRMChartView;
