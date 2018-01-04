import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    ScrollView,
    View,
    ListView
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';

class Analysis extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMScreen />
            </ScrollView>
        );
    }
}

export default Analysis;
