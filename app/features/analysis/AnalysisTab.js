import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';
import OneRMChartScreen from './charts/OneRMChartScreen';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// Hack for svg bug with scrolling in victory charts on Android
// https://github.com/FormidableLabs/victory-native/issues/96
class AnalysisTab extends Component {
    // separated Chart and Screen to ensure android hack works along with calculate button
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMChartScreen />
                <Image style={styles.pseudoScrollView} source={require('app/appearance/images/blank.png')} />
                <OneRMScreen />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pseudoScrollView: {
      opacity: 0,
      position: 'absolute',
      top: 0,    
      left: 0,
      width:"100%",
      height:"100%"
    }
});
  

export default AnalysisTab;
