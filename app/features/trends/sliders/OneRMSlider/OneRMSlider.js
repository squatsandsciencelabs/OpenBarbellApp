import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    ScrollView,
    View,
    ListView
} from 'react-native';
import { Slider } from 'react-native-elements';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';
import * as OneRepMax from 'app/utility/transforms/OneRepMax';

class OneRMSlider extends Component {
    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <Text style={[{marginBottom: 20}, styles.titleText]}>1 Rep Max Calculator</Text>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Text style={[{marginBottom: 20}, styles.titleText]}>E1RM: {OneRepMax.OneRMPrediction(this.props.data, this.props.velocity)}</Text>
                    <Slider
                    value={this.props.velocity} 
                    onValueChange={(value) => this.props.changeVelocity(value)}
                    minimumValue={.01}
                    maximumValue={.41}
                    step={.01}
                    />
                    <Text>Velocity: {this.props.velocity}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 20,
    },
    labelText: {
        fontSize: 16,
        color: 'rgba(77, 77, 77, 1)',
    },
});

export default OneRMSlider;
