import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { Slider } from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class OneRMProtocoView extends Component {

    render() {
        const title = "How to Calculate 1RM from a Single Session";
        const body = "1. Do six of your chosen exercise, starting from the bar and ending at 90% of your previous 1RM (eg. bar, 20%, 40%, 60%, 80%, 90%)\n\n2. Log the RPE, the weight used, and the same exercise and tags for each set\n\n3. Go to the Analysis Tab, select the exercise and tags you used for the 6 sets, and set the date range to 1 day\n\n4. Set the velocity to the slowest you think can complete a 1RM and tap Calculate";
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column', alignItems: 'center', marginBottom: 20}] }>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={{marginTop: 20}}>{body}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default OneRMProtocoView;
