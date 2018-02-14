import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
 }  from 'react-native';
 import * as Device from 'app/utility/Device';
 import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

 class OneRMLoggedOutView extends Component {

    render() {
        const size = Device.isSmallDevice() ? 250 : 300;

        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column', alignItems: 'center' }] }>
                <Text style={[{marginBottom: 15}, styles.titleText]}>Estimated One-Rep Max</Text>
                <Text style={styles.errorText}>
                    You must be logged in for 1rm calculation.
                </Text>
                <Image style={{width: size, height: size, marginTop: 20}} source={require('app/appearance/images/grayed_chart.png')} />
            </View>
        )
    }

 }

 const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    disabledButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderColor: 'rgba(47, 128, 237, 1)',        
        borderWidth: 5,
        borderRadius: 15,
        opacity: 0.3
    },
    buttonText: {
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
    errorText: {
        color: 'rgba(77, 77, 77, 1)',
        marginBottom: 20, 
        fontSize: 20, 
        textAlign: 'center'
    },
});

export default OneRMLoggedOutView;
