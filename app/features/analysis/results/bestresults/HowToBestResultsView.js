import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class HowToBestResultsView extends Component {

    render() {
        return (
            <View style={ [SETTINGS_PANEL_STYLES.panel, { marginTop: 0, borderTopWidth: 0, flexDirection: 'column', alignItems: 'center' }] }>
                <TouchableOpacity style={{alignItems: 'center', marginBottom: 15}} onPress={ () => this.props.presentBestResults() }>
                    <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >How can I get the best results?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HowToBestResultsView;
