import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    processColor,
    Platform,
    Dimensions,
} from 'react-native';
import {
    CombinedChart,
    ScatterChart,
    BarChart,
    LineChart,
} from 'react-native-charts-wrapper';
import * as Device from 'app/utility/Device';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import OneRMEditSetScreen from '../edit_set/OneRMEditSetScreen';

class OneRMChartView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setID: null,
            workoutID: null,
            touching: false,
        };
    }

    // TOUCHES

    _handleSelect(event) {
        const nativeEvent = event.nativeEvent;
        if (nativeEvent.hasOwnProperty('data')) {
            const data = nativeEvent.data;
            if (data.hasOwnProperty('setID') && data.hasOwnProperty('workoutID')) {
                if (Platform.OS === 'ios') {
                    if (!this.state.touching) {
                        this.props.tappedSet(data.setID, data.workoutID);
                    }
                } else {
                    this.setState({setID: data.setID, workoutID: data.workoutID});
                }
            } else if (Platform.OS !== 'ios') {
                this.setState({setID: null, workoutID: null});
            }
        }
    }

    _handleTouchStart() {
        if (Platform.OS === 'ios') {
            this.setState({touching: true});
        }
    }

    _handleTouchEndCapture() {
        if (Platform.OS === 'ios') {
            this.setState({touching: false});
        } else {
            if (this.state.setID && this.state.workoutID) {
                this.props.tappedSet(this.state.setID, this.state.workoutID);
                this.setState({setID: null, workoutID: null});
            }
        }
    };

    _handleTouchMove() {
        if (Platform.OS !== 'ios') {
            this.setState({setID: null, workoutID: null});
        }
    }

    // RENDER

    _render1RM(r2) {
        if (this.props.shouldDisplayRegression) {
            let e1RM = this.props.e1RM ? this.props.e1RM : "---";
            let velocity = this.props.velocity ? this.props.velocity : "---";

            return (
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.oneRMText}>
                                e1RM:
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.oneRMValue}>
                                    {e1RM}
                                    <Text style={styles.oneRMMetric}>{this.props.metric}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'left', fontSize: 15}}>
                                    <Text style={styles.oneRMVelocityAt}>@ </Text>
                                    <Text style={styles.oneRMVelocity}>{velocity}</Text>
                                    <Text style={styles.oneRMVelocityMetric}>m/s</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.r2Text}>r² : {this.props.r2}%</Text>
                    </View>
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
            return <Image style={{width: size, height: size, marginTop: 5}} source={require('app/appearance/images/grayed_chart.png')} />
        }
    }

    _renderChart() {
        // set the data
        // NOTE: Android crashes if the data is length 0, so ONLY add it if data exists
        let data = {
            scatterData: {
                dataSets: []
            }
        };
        const dotMultiplier = Platform.OS === 'ios' ? 1 : 4;
        if (this.props.e1RM) {
            data.scatterData.dataSets.push({
                values: [{x: this.props.e1RM, y: this.props.velocity}],
                label: '1 Rep Max',
    
                config: {
                    drawValues: false,
                    colors: [processColor('black')],
                    highlightEnabled: false,
                    normalizeSizeEnabled: false,
                    scatterShape: 'CROSS',
                    scatterShapeSize: 25 * dotMultiplier,
                }
    
            });
        }
        if (this.props.unusedChartData && this.props.unusedChartData.length > 0) {
            data.scatterData.dataSets.push({
                values: this.props.unusedChartData,
                label: 'Unused Sets',
                config: {
                    colors: [processColor('rgba(47, 128, 237, 0.2)')],
                    drawValues: false,
                    highlightEnabled: false,
                    normalizeSizeEnabled: false,
                    scatterShape: 'CIRCLE',
                    drawHighlightIndicators: false,
                    scatterShapeSize: 12 * dotMultiplier,
                }
            });
        }
        if (this.props.errorChartData && this.props.errorChartData.length > 0) {
            data.scatterData.dataSets.push({
                values: this.props.errorChartData,
                label: 'Errors',
                config: {
                    colors: [processColor('red')],
                    drawValues: false,
                    highlightEnabled: true,
                    normalizeSizeEnabled: false,
                    highlightCircleWidth: 5,
                    scatterShape: 'CIRCLE',
                    drawHighlightIndicators: false,
                    scatterShapeSize: 12 * dotMultiplier,
                }
            });
        }
        if (this.props.activeChartData && this.props.activeChartData.length > 0) {
            data.scatterData.dataSets.push({
                values: this.props.activeChartData,
                label: 'Active Sets',
                config: {
                    colors: [processColor('rgba(47, 128, 237, 1)')],
                    drawValues: false,
                    highlightEnabled: true,
                    normalizeSizeEnabled: false,
                    highlightCircleWidth: 5,
                    scatterShape: 'CIRCLE',
                    drawHighlightIndicators: false,
                    scatterShapeSize: 12 * dotMultiplier,
                }
            });
        }
        if (this.props.regLeftPoint && this.props.regRightPoint) {
            data.lineData = {
                dataSets: [{
                    values: [this.props.regLeftPoint, this.props.regRightPoint],
                    label: 'Regression',
    
                    config: {
                        drawValues: false,
                        colors: [processColor('green')],
                        drawCircles: false,
                        lineWidth: 2,
                        highlightEnabled: false,
                    }
                }]
            };
        }

        return (
            <View>
                <CombinedChart
                    data={data}
                    xAxis={{
                        position: 'BOTTOM',
                        axisMinimum: this.props.minX,
                        axisMaximum: this.props.maxX,
                        textColor: processColor('rgba(77, 77, 77, 1)'),
                    }}
                    yAxis={{
                        right: {
                            drawLabels: false,
                            drawAxisLine: false,
                            drawGridLines: false,
                        },
                        left: {
                            axisMinimum: 0,
                            axisMaximum: this.props.maxY,
                            textColor: processColor('rgba(77, 77, 77, 1)'),
                        }
                    }}
                    marker={{enabled: true,
                        markerColor: processColor('#F0C0FF8C'),
                        textColor: processColor('white'),
                        markerFontSize: 14,
                    }}
                    pinchZoom={true}
                    maxVisibleValueCount={9001} // Assuming we'll never have this many sets
                    legend={{
                        enabled: true,
                        textColor: processColor('rgba(77, 77, 77, 1)')
                    }}
                    onSelect={this._handleSelect.bind(this)}
                    onTouchStart={this._handleTouchStart.bind(this)}
                    onTouchEndCapture={this._handleTouchEndCapture.bind(this)}
                    onTouchMove={this._handleTouchMove.bind(this)}
                    chartDescription={{text: ''}}
                    onChange={(event) => console.log(event.nativeEvent)}
                    style={styles.chart}/>
                    <OneRMEditSetScreen />
            </View>
        );
    }

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { borderBottomWidth: 0, flexDirection: 'column', alignItems: 'center' }] }>
                <Text style={[styles.titleText, {marginBottom: 10}]}>Results</Text>
                {this._render1RM(this.props.r2)}
                <Text style={{textAlign: 'center', color: 'rgba(77, 77, 77, 1)', fontSize: 12}}>Tap a point to view and edit the data</Text>
                {this._renderChartArea()}
                <TouchableOpacity style={{alignItems: 'center', marginBottom: 15, marginTop: 25}} onPress={ () => this.props.presentAlgorithm() }>
                    <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >How does the algorithm work?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'center', marginBottom: 15}} onPress={ () => this.props.presentBestResults() }>
                    <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >How can I get the best results?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    oneRMText: {
        color: 'rgba(77, 77, 77, 1)',
        marginTop: 10,
        marginBottom: 0,
        fontSize: 32, 
        textAlign: 'left'
    },
    oneRMValue: {
        color: 'rgba(77, 77, 77, 1)',
        marginTop: 10,
        marginBottom: 0,
        fontSize: 32, 
        textAlign: 'left',
        fontWeight: 'bold',
    },
    oneRMMetric: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 15, 
        textAlign: 'left'
    },
    oneRMVelocityAt: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 15, 
        textAlign: 'left'
    },
    oneRMVelocity: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 15, 
        textAlign: 'left',
        fontWeight: 'bold',
    },
    oneRMVelocityMetric: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 10, 
        textAlign: 'center'
    },
    r2Text: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 25,
        marginTop: 15,
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20, 
        fontSize: 18, 
        textAlign: 'center',
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chart: {
        // NOTE: flex is weird within scrollviews and charts
        // it's easier to just get it working by manually setting its size
        width: Dimensions.get('window').width - 45,
        height: (Dimensions.get('window').width - 45) * 1.25,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
    },
});

export default OneRMChartView;
