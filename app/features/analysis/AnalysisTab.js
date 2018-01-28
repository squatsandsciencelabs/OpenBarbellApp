import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';

class AnalysisTab extends Component {

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <OneRMScreen />
                <Image style={styles.pseudoScrollView} source={require('app/appearance/images/blank.png')} />
            </ScrollView>
        );
    }
}

// Hack for svg bug with scrolling in victory charts on Android
// https://github.com/FormidableLabs/victory-native/issues/96
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
