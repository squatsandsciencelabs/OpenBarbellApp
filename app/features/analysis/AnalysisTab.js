import React, {Component} from 'react';
import {
    ScrollView,
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';
import Info from './cards/Info';
import Protocol from './cards/Protocol';

class AnalysisTab extends Component {
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMScreen />
                <Info />
                <Protocol />  
            </ScrollView>
        );
    }
}

export default AnalysisTab;
