import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native';

import OneRMDebugScreen from './debug/OneRMDebugScreen';
import OneRMCalculateScreen from './calculate/OneRMCalculateScreen';
import OneRMResultsScreen from './results/OneRMResultsScreen';
import OneRMLoggedOutView from './logged_out/OneRMLoggedOutView';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// Hack for svg bug with scrolling in victory charts on Android
// https://github.com/FormidableLabs/victory-native/issues/96
class AnalysisTab extends Component {
    // separated Chart and Screen to ensure android hack works along with calculate button
    render() {
        if (this.props.isLoggedIn) {
            // TODO: test the hack still works on Android
            return (
                <ScrollView style={{flex: 1}}>
                    <OneRMDebugScreen />
                    <OneRMCalculateScreen />
                    <Image style={styles.pseudoScrollView} source={require('app/appearance/images/blank.png')} />
                    <OneRMResultsScreen />
                </ScrollView>
            );
        } else {
            return <OneRMLoggedOutView />;
        }
    }
}

const styles = StyleSheet.create({
    pseudoScrollView: {
        opacity: 0,
        position: 'absolute',
        top: 0,    
        left: 0,
        width:"100%",
        height:"100%",
    },
});

export default AnalysisTab;
