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
        // set the data
        // NOTE: Android crashes if the data is length 0, so ONLY add it if data exists
        let data = {
            bubbleData: {
                dataSets: []
            }
        };
        if (this.props.unusedChartData && this.props.unusedChartData.length > 0) {
            data.bubbleData.dataSets.push({
                values: this.props.unusedChartData,
                label: 'Unused Points',
                config: {
                    colors: [processColor('rgba(47, 128, 237, 0.2)')],
                    drawValues: false,
                    highlightEnabled: false,
                    normalizeSizeEnabled: false,
                }
            });
        }
        if (this.props.errorChartData && this.props.errorChartData.length > 0) {
            data.bubbleData.dataSets.push({
                values: this.props.errorChartData,
                label: 'Error Points',
                config: {
                    colors: [processColor('red')],
                    drawValues: false,
                    highlightEnabled: true,
                    normalizeSizeEnabled: false,
                }
            });
        }
        if (this.props.activeChartData && this.props.activeChartData.length > 0) {
            data.bubbleData.dataSets.push({
                values: this.props.activeChartData,
                label: 'Active Points',
                config: {
                    colors: [processColor('rgba(47, 128, 237, 1)')],
                    drawValues: false,
                    highlightEnabled: true,
                    normalizeSizeEnabled: false,
                }
            });
        }

        return (
            <View style={styles.chartContainer}>
                <CombinedChart
                    data={data}
                    xAxis={{position: 'BOTTOM'}}
                    yAxis={{
                        right: {
                            drawLabels: false,
                            drawAxisLine: false,
                            drawGridLines: false,
                        }
                    }}
                    legend={{enabled: false}}
                    onSelect={this.handleSelect.bind(this)}
                    chartDescription={{text: ''}}
                    onChange={(event) => console.log(event.nativeEvent)}
                    style={styles.chart}/>
            </View>
        );
    }

    render() {
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
