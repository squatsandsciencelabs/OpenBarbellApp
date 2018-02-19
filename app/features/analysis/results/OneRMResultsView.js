import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    processColor,
} from 'react-native';
import {
    CombinedChart,
    ScatterChart,
    BarChart,
    LineChart,
} from 'react-native-charts-wrapper';
import * as Device from 'app/utility/Device';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class OneRMChartView extends Component {

    // TODO: temp, proving that it can display something
    constructor() {
        super();
        this.state = {
            xAxis: {
                position: 'BOTTOM',
            },
            yAxis: {
                right: {
                    drawLabels: false,
                    drawAxisLine: false,
                    drawGridLines: false,
                }
            },
      
            data: {
              barData: {
                dataSets: [{
                  values: [40, 5, 50, 23, 79],
                  label: 'max bar',
                  config: {
                    drawValues: false,
                    colors: [processColor('red')],
                    highlightEnabled: false,
                  }
      
                }]
              },
              lineData: {
                dataSets: [{
                  values: [50, 100],
                  label: 'regression line',
                  config: {
                    drawValues: false,
                    colors: [processColor('green')],
                    mode: "LINEAR",
                    drawCircles: false,
                    lineWidth: 2,
                    highlightEnabled: false,
                  }
                }],
              },
              scatterData: {
                dataSets: [{
                  values: [{x: 0.5, y: 15}, {x: 2, y: 40}, {x: 3, y: 77}, 81, 43],
                  label: 'unused points',
                  config: {
                    colors: [processColor('purple')],
                    drawValues: false,
                    scatterShape: 'SQUARE',
                    highlightEnabled: false,
                  }
      
                }, {
                  values: [40, 5, 50, 23, 79],
                  label: 'error points',
                  config: {
                    drawValues: false,
                    colors: [processColor('grey')],
                    scatterShape: 'CIRCLE',
                    highlightEnabled: true,
                  }
                }, {
                  values: [10, 55, 35, 90, 82],
                  label: 'active points',
                  config: {
                    drawValues: false,
                    colors: [processColor('brown')],
                    scatterShape: 'TRIANGLE',
                    highlightEnabled: true,
                  }
                }],
              },
            }
          };
    }

    _render1RM(r2) {
        if (this.props.isR2HighEnough) {
            let e1RM = this.props.e1RM ? this.props.e1RM : "---";
            let velocity = this.props.velocity ? this.props.velocity : "---";

            return (
                <View>
                    <Text style={styles.oneRMText}>e1RM: <Text style={{fontWeight: 'bold'}}>{e1RM}</Text> {this.props.metric}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 20 }}>@ <Text style={{ fontWeight: 'bold' }}> {velocity} m/s</Text></Text> 
                    <Text style={styles.r2Text}>r² : {this.props.r2} %</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.errorText}>
                        R² is too low, please clean up or log more data
                    </Text>
                </View>
            );
        }
    }

    _render1RMBar() {
        if (this.props.isR2HighEnough && this.props.e1RM) {
            return (
                <VictoryBar
                    data={[
                        { x: this.props.e1RM, y: 20, y0: 0, width: 20, fill: "#ffe5e5" },
                    ]}
                />
            )
        }
    }
    
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
        // TODO: need to check against ALL points rather than just active points to render a chart
        // NOTE: using > 1 for now as for active chart, I need that in order to get a domain
        if (this.props.activeChartData && this.props.activeChartData.length > 1) {
            return (
                <View>
                    {this._renderChart()}
                </View>
            );
        } else {
            const size = Device.isSmallDevice() ? 250 : 300;
            return <Image style={{width: size, height: size, marginTop: 20}} source={require('app/appearance/images/grayed_chart.png')} />
        }
    }

    handleSelect(event) {
        console.tron.log("selected " + JSON.stringify(event.nativeEvent));
    }

    _renderChart() {
        return (
            <View style={{marginLeft: 25}}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    containerComponent={<VictoryZoomContainer zoomDomain={{x: [this.props.lowestWeight, this.props.highestWeight], y: [0, this.props.highestVel] }}/>}
                    domain={{x: [this.props.lowestWeight, this.props.highestWeight], y: [0, this.props.highestVel] }}>

                    {this._render1RMBar()}
                    <VictoryAxis crossAxis />
                    <VictoryAxis dependentAxis crossAxis />
                    <VictoryScatter
                        style={{ data: { fill: "rgba(47, 128, 237, 0.15)" } }}
                        width={400}
                        size={5}
                        data={this.props.unusedChartData} />
                    <VictoryScatter
                        style={{ data: { fill: "red" } }}
                        width={400}
                        size={5}
                        data={this.props.errorChartData} />
                    <VictoryScatter
                        style={{ data: { fill: "rgba(47, 128, 237, 1)" } }}
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
                        data={this.props.activeChartData} />
                    {this._renderRegressionLine()}
                
                </VictoryChart>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.chartContainer}>
                <CombinedChart
                    data={this.state.data}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yAxis}
                    legend={{enabled: false}}
                    onSelect={this.handleSelect.bind(this)}
                    chartDescription={{text: ''}}
                    onChange={(event) => console.log(event.nativeEvent)}
                    style={styles.chart}/>
            </View>
        );
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { borderBottomWidth: 0, flexDirection: 'column', alignItems: 'center' }] }>
                <Text style={[styles.titleText, {marginBottom: 10}]}>Results</Text>
                {this._render1RM(this.props.r2)}
                <Text style={{textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', color: 'rgba(77, 77, 77, 1)'}}>Tap a point to view and edit the data</Text>
                {this._renderChartArea()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    oneRMText: {
        color: 'rgba(77, 77, 77, 1)',
        marginTop: 10,
        marginBottom: 5,
        fontSize: 32, 
        textAlign: 'center'
    },
    r2Text: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20, 
        fontSize: 20, 
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
    },
    chart: {
        width: 300,
        height: 400,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'lightgray',
    },
});

export default OneRMChartView;
