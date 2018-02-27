import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class SettingsSurveyPanel extends Component {

    render() {
        if (this.props.isVisible) {
            return (
                <View style={ [SETTINGS_PANEL_STYLES.panel, { flexDirection: 'column' }] }>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.avatar} source={require('app/appearance/images/adam.png')} />
                        <View style={{flex: 1, marginLeft: 20}}>
                            <Text style={[styles.titleText]}>This is Adam, he does our data science.</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        disabled={ false }
                        onPress={ () => this.props.presentSurvey() }>
                            <Text style={[SETTINGS_PANEL_STYLES.tappableText, {marginTop: 15}]}>Take a quick survey so he can help us understand your data.</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return null;
        }

    }
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 4,
        borderWidth: 0,
        height: 80,
        width: 80,
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'left',
        fontSize: 17,
        fontWeight: '700',
    },
});

export default SettingsSurveyPanel;
