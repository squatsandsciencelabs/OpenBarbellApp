import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
 }  from 'react-native';
 import * as Device from 'app/utility/Device';

 class OneRMLoggedOutView extends Component {

    render() {
        const size = Device.isSmallDevice() ? 250 : 300;

        return (
            <View>
                <Text style={styles.errorText}>
                    You must be logged in for 1rm calculation.
                </Text>
                <Image style={{width: size, height: size, marginTop: 20}} source={require('app/appearance/images/grayed_chart.png')} />
                <View style={[styles.disabledButton, {marginTop: 20}]}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </View>
            </View>
        )
    }

 }

 const styles = StyleSheet.create({
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
});

export default OneRMLoggedOutView;
