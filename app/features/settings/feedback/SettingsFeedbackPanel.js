import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Linking
} from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class SettingsFeedbackPanel extends Component {
    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { flex: 1, flexDirection:'column', justifyContent:'space-between' }] }>
                <Text style={ SETTINGS_PANEL_STYLES.headerText }>
                    Tell us how we can improve {"\n"}
                </Text>    
                <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@squatsandscience.com?subject=A%20really%20nice%20comment%20from%20an%20app%20user&body=')}>
                    <Text style={ [SETTINGS_PANEL_STYLES.tappableText, { fontSize: 14 }]}>
                        contact@squatsandscience.com
                    </Text>
                </TouchableOpacity>         
            </View>
        );        
    }
}

export default SettingsFeedbackPanel;