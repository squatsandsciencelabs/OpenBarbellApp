import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    ScrollView,
    View,
    ListView
} from 'react-native';

import OneRMSliderScreen from './sliders/OneRMSlider/OneRMSliderScreen';
import OneRMChartScreen from './charts/OneRMChartScreen';

class Analysis extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMChartScreen />
                <OneRMSliderScreen />
            </ScrollView>
        );
    }
}

export default Analysis;
