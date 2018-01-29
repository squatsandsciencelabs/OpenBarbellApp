import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { 
  VictoryScatter, 
  VictoryChart, 
  VictoryTheme, 
  VictoryGroup, 
  VictoryLine 
} from "victory-native";

class OneRMChartView extends Component {
    
  _renderRegressionLine() {
      if (this.props.isR2HighEnough) {
        const lowest = this.props.regLineData[0];
        const highest = this.props.regLineData[this.props.regLineData.length - 1];
        
        return (
          <VictoryLine
            style={{
              data: { stroke: "#368fff" },
              parent: { border: "1px solid #ccc"}
            }}
            data={[
              lowest,
              highest,
            ]}
          />    
        );        
      }
    } 

    render() {
        return (
          <View style={{ alignItems: 'center' }}>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryGroup offset={0}
                colorScale={"qualitative"}
              >
                {this._renderRegressionLine()}
                <VictoryScatter
                  style={{ data: { fill: "#c43a31" } }}
                  width={400}
                  size={5}
                  events={[{
                    target: "data",
                    eventHandlers: {
                      onPressIn: (evt, clickedProps) => {
                        const setID = clickedProps.datum.setID;
                        this.props.tapPoint('dfa3113f-9cd9-48fe-bbbc-c5adc69ceac7');
                      }
                    }
                  }]}
                  data={this.props.data}
                />
              </VictoryGroup>
            </VictoryChart>
          </View>
        );
    }
}

export default OneRMChartView;
