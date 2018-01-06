import React, {Component} from 'react';
import {
    ScrollView,
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';

class AnalysisTab extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMScreen />
            </ScrollView>
        );
    }
}

export default AnalysisTab;
