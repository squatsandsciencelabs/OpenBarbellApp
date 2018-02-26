import React, {Component} from 'react';
import {
    ScrollView,
    Image,
    View,
    Text,
    findNodeHandle,
} from 'react-native';

import OneRMDebugScreen from './debug/OneRMDebugScreen';
import OneRMCalculateScreen from './calculate/OneRMCalculateScreen';
import OneRMResultsScreen from './results/OneRMResultsScreen';
import OneRMLoggedOutView from './logged_out/OneRMLoggedOutView';
import OneRMProtocolView from './protocol/OneRMProtocolView';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

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
            if (this.results && this.results.measureLayout) {
                this.results.measureLayout(
                    findNodeHandle(this.scrollView),
                    (x, y, width, height, pageX, pageY) => {
                        this.scrollView.scrollTo({x: 0, y: y, animated: true});
                    }
                );
            }
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            // TODO: test the hack still works on Android
            return (
                <ScrollView
                    style={{flex: 1}}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='always'
                    ref={(ref) => { this.scrollView = ref}}>
                    <OneRMDebugScreen />
                    <OneRMCalculateScreen />
                    <View ref={(ref) => { this.results = ref }} onLayout={() => {}} collapsable={false} >
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

export default AnalysisTab;
