import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

const Info = () => {
    return (
        <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
            <Text style={[{marginBottom: 20}, styles.titleText]}>Info</Text>
            <Text style={styles.descText}>
                - Estimated 1RM is based on the first rep of each set of the specified exercise, 
                within the specified date range, 
                and extrapolated to the lowest velocity at which you think you can successfully complete a 1RM attempt.
            </Text>
            <Text style={styles.descText}>
                - Input the exercise you want to estimate 1RM for. 
                Use the tag fields to indicate which tags must be included, 
                and/or which tags must be excluded from the 1RM estimation.
            </Text>
            <Text style={styles.descText}>
                ex. Exercise: Squat, Must Include: pause, Exclude: nobelt
            </Text>
            <Text style={styles.descText}>
                - Confidence - Confidence is calculated based on how much exercise data is included, 
                how well the trend fits the data, (what else?). 
                You can improve your confidence by adding RPE and cleaning up the sets recommended below.
            </Text>
            <Text style={styles.descText}>
            - Set Cleanup - These sets contain data that might be negatively impacting your 1RM estimation. 
            This can be due to an incorrect LB/KG label, erroneous string pulls from taking OpenBarbell off and on the bar, data from workout partners, etc. 
            DO NOT remove good data to improve your confidence.
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
        marginBottom: 20
    }
});

export default Info;
