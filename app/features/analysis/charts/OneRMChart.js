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
    render() {     
      const lowest = this.props.data[0];
      const highest = this.props.data[this.props.data.length - 1];
        return (
          <View style={{ alignItems: 'center' }}>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryGroup offset={20}
                colorScale={"qualitative"}
              >
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
                <VictoryScatter
                  style={{ data: { fill: "#c43a31" } }}
                  width={400}
                  size={5}
                  data={this.props.data}
                />
              </VictoryGroup>
            </VictoryChart>
          </View>
        );
    }
}

export default OneRMChartView;
