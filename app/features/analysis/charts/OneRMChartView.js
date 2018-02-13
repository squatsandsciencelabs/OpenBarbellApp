import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { 
  VictoryScatter, 
  VictoryChart, 
  VictoryTheme, 
  VictoryGroup, 
  VictoryLine,
  VictoryZoomContainer,
} from "victory-native";
import * as Device from 'app/utility/Device';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import AnalysisModal from 'app/shared_features/analysis_modal/AnalysisModal';

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
          containerComponent={<VictoryZoomContainer zoomDomain={{x: [this.props.lowestWeight, this.props.highestWeight], y: [0, this.props.highestVel] }}/>}
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

  _infoModal() {
    const title = "What is e1RM?";
    const body = "- The estimated One-Rep Max calculation is based on the first rep of each set of a given exercise, within a specified date range, and extrapolated to the lowest velocity at which you think you can successfully complete a one rep max. \n \n - This estimate is provided with a confidence margin which is influenced by several factors explained below. While outliers sometimes occur naturally, the key to a high confidence rating is recording set information as fully and accurately as possible."
    
    return (
      <AnalysisModal 
        title={title}
        body={body}
        isModalShowing={this.props.isInfoModalShowing} 
        closeModal={this.props.dismissInfoModal}
      />
    );
  }

  _protocolModal() {
    const title = "Protocol";
    const body = "The following is a protocol to get a highly accurate 1RM assessment in one session. \n \n - Do six sets of warmups, from the bar until about 90%. eg. bar, 20%, 40%, 60%, 80%, 90% \n \n - Make sure you use the same tags and exercise name for each set. \n \n - Set your date range to one day. \n \n - Tap 'end workout' so the data can be analyzed.";
    
    return (
      <AnalysisModal 
        title={title}
        body={body}
        isModalShowing={this.props.isProtocolModalShowing} 
        closeModal={this.props.dismissProtocolModal}
      />
    );    
  }

  _info() {
    return (
      <View style={{marginBottom: 15}}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.props.showInfoModal() }>
            <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >What is e1rm?</Text>
        </TouchableOpacity>
        {this._infoModal()}
      </View>
    );
  }

  _protocol() {
    return (
      <View style={{marginBottom: 15}}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={ () => this.props.showProtocolModal() }>
            <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >Protocol</Text>
        </TouchableOpacity>
        {this._protocolModal()}
      </View>
    )
  }

  render() {
    return (
      <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column', borderBottomWidth: 0, alignItems: 'center' }] }>
        <Text style={[{marginBottom: 15}, styles.titleText]}>Estimated One-Rep Max</Text>
        {this._info()}
        {this._protocol()}
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
});

export default OneRMChartView;
