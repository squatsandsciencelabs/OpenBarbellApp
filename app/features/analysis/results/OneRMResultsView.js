import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
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
});

export default OneRMChartView;
