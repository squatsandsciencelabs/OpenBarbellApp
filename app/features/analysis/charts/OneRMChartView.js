import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { 
  VictoryScatter, 
  VictoryChart, 
  VictoryTheme, 
  VictoryGroup, 
  VictoryLine,
} from "victory-native";
import * as Device from 'app/utility/Device';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class OneRMChartView extends Component {
    
  _renderRegressionLine() {
      if (this.props.isR2HighEnough) {
        return (
          <VictoryLine
            style={{
              data: { stroke: "#368fff" },
              parent: { border: "1px solid #ccc"}
            }}
            data={[
              this.props.regLeftPoint,
              this.props.regRightPoint,
            ]}
          />    
        );        
      }
    } 

  _renderChartArea() {
    if (this.props.isLoggedIn) {
      if (this.props.chartData && this.props.chartData.length > 3) {
        return (
          <View>
            {this._renderChart()}
          </View>
        );
      } else {
        return;
      }
    } else {
      const size = Device.isSmallDevice() ? 250 : 300;

      return <Image style={{width: size, height: size, marginTop: 20}} source={require('app/appearance/images/grayed_chart.png')} />
    }
  }

  _renderChart() {
    return (
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{x: [this.props.lowestWeight, this.props.highestWeight], y: [0, this.props.highestVel] }}
        >
          <VictoryGroup offset={0}
            colorScale={"qualitative"}
          >
            {this._renderRegressionLine()}
            <VictoryScatter
              style={{ data: { fill: "#c43a31" } }}
              width={400}
              size={5}
              // events={[{
              //   target: "data",
              //   eventHandlers: {
              //     onPressIn: (evt, clickedProps) => {
              //       const setID = clickedProps.datum.setID;
              //       this.props.tapPoint(setID);
              //     }
              //   }
              // }]}
              data={this.props.chartData}
            />
          </VictoryGroup>
        </VictoryChart>
      </View>
    );      
  }

  render() {
    return (
      <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column', borderBottomWidth: 0, alignItems: 'center' }] }>
        <Text style={[{marginBottom: 15}, styles.titleText]}>Estimated One-Rep Max</Text>
        {this._renderChartArea()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
      color: 'rgba(77, 77, 77, 1)',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
  },
  pseudoScrollView: {
    opacity: 0,
    position: 'absolute',
    top: 0,    
    left: 0,
    width:"100%",
    height:"100%",
  }
});

export default OneRMChartView;
