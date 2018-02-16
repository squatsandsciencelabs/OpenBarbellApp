import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { 
    VictoryScatter,
    VictoryChart,
    VictoryTheme,
    VictoryLine,
    VictoryZoomContainer,
    VictoryBar,
    VictoryAxis,
} from "victory-native";
import * as Device from 'app/utility/Device';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class OneRMChartView extends Component {

    _render1rm(r2) {
        if (this.props.chartData && this.props.chartData.length > 3 && this.props.isR2HighEnough) {
            let e1rm = this.props.e1rm ? this.props.e1rm : "---";
            let e1rmVelocity = this.props.e1rmVelocity ? this.props.e1rmVelocity : "---";

            return (
                <View>
                    <Text style={styles.oneRMText}>e1RM: <Text style={{fontWeight: 'bold'}}>{e1rm}</Text> {this.props.metric}</Text>
                    <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 20 }}>@ <Text style={{ fontWeight: 'bold' }}> {this.props.e1rmVelocity} m/s</Text></Text> 
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
        if (this.props.isR2HighEnough && this.props.e1rm) {
            return (
                <VictoryBar
                    data={[
                        { x: this.props.e1rm, y: 20, y0: 0, width: 20, fill: "#ffe5e5" },
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
        if (this.props.chartData && this.props.chartData.length > 3) {
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
                            data={this.props.chartData} />
                        {this._renderRegressionLine()}
                
                </VictoryChart>
            </View>
        );
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { borderBottomWidth: 0, flexDirection: 'column', alignItems: 'center' }] }>
                <Text style={[styles.titleText, {marginBottom: 10}]}>Results</Text>
                {this._render1rm(this.props.r2)}
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
});

export default OneRMChartView;
