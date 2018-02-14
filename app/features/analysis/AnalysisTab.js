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
import OneRMProtocolView from './protocol/OneRMProtocolView';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

// Hack for svg bug with scrolling in victory charts on Android
// https://github.com/FormidableLabs/victory-native/issues/96
class AnalysisTab extends Component {
    // separated Chart and Screen to ensure android hack works along with calculate button
    constructor(props) {
        super(props);

        this.state = { lastScroll: false };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.scroll !== this.state.lastScroll) {
            // save new props
            this.setState({
                lastScroll: nextProps.scroll
            });

            // scroll
            if (this.results && this.results.measure) {
                this.results.measure( (fx, fy, width, height, px, py) => {
                    this.scrollView.scrollTo({x: 0, y: fy, animated: true});
                });
            }
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            // TODO: test the hack still works on Android
            return (
                <ScrollView style={{flex: 1}} ref={(ref) => { this.scrollView = ref}}>
                    <OneRMDebugScreen />
                    <OneRMCalculateScreen />
                    <Image style={styles.pseudoScrollView} source={require('app/appearance/images/blank.png')} />
                    <View ref={(ref) => { this.results = ref }}>
                    <OneRMResultsScreen />
                    </View>
                    <OneRMProtocolView />
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
