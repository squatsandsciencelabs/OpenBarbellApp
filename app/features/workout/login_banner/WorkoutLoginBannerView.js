import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class WorkoutLoginBannerView extends Component {
    render() {
        if (this.props.isLoggingIn) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Logging in...</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={ () => this.props.tappedBanner() } >
                    <Text style={styles.text}>Don't lose all your data - tap to sign in and save it!</Text>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
    },
    text: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    }
});


export default WorkoutLoginBannerView;
