import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

const Protocol = () => {
    return (
        <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
            <Text style={[{marginBottom: 20}, styles.titleText]}>Protocol</Text>
            <Text style={styles.descText}>
                - Log all warmups from the bar to your working weight.
            </Text>
            <Text style={styles.descText}>
                - Make sure you use the same tags and exercise name for each set.
            </Text>
            <Text style={styles.descText}>
                - Set your date range to one day.
            </Text>
            <Text style={styles.descText}>
                - Tap 'end workout' so the data can be analyzed.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    descText: {
        textAlign: 'center',
        marginBottom: 10
    }
});

export default Protocol;
