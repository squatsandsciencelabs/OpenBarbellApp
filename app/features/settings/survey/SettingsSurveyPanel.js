import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class SettingsSurveyPanel extends Component {

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                <Text style={[{marginBottom: 20}, styles.titleText]}>Survey</Text>

                <TouchableOpacity style={[SETTINGS_PANEL_STYLES.blueButton, {height: 50}]}
                    disabled={ false }
                    onPress={ () => this.props.presentSurvey() }>
                        <Text style={SETTINGS_PANEL_STYLES.buttonText}>TAKE SURVEY</Text>
                </TouchableOpacity>

            </View>
        );

    }

}

const styles = StyleSheet.create({
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default SettingsSurveyPanel;
