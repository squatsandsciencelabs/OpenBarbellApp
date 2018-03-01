import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SETTINGS_PANEL_STYLES } from 'app/appearance/styles/GlobalStyles';

class WhatIsOneRMView extends Component {

    _close() {
        this.props.closeModal();
    }

    render() {
        const body = "Estimated One-Rep Max is based on the fastest velocity of each set of a given exercise within a specified date range, extrapolated to the lowest velocity at which you think you can successfully complete a max lift attempt.\n\nThis estimate is provided with an r² based on how much exercise data is included and how well that data adheres to a general trend. While outliers sometimes occur naturally, the key to accurate estimation is recording set information as fully and carefully as possible."
        const top = Platform.OS === 'ios' ? 0 : 5;

        return (
            <View>
                <Modal
                    visible={this.props.isModalShowing}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}
                    transparent={true}
                >
                    <View style={styles.container}>
                        <View style={styles.bodyContainer}>
                            <Text style={styles.titleText}>What is e1RM?</Text>

                            <View style={{position: 'absolute', left: 0, top}}>
                                <TouchableOpacity onPress={() => this._close() }>
                                    <View style={styles.nav}>
                                        <Icon name="times-circle" size={20} color='red' />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <Text>{body}</Text>

                            <TouchableOpacity style={{alignItems: 'center', marginTop: 20}} onPress={ () => this.props.presentAlgorithm() }>
                                <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >How does the algorithm work?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignItems: 'center', marginTop: 15}} onPress={ () => this.props.presentBestResults() }>
                                <Text style= {[SETTINGS_PANEL_STYLES.tappableText]} >How can I get the best results?</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bodyContainer: {
        padding: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginLeft: 10,
        marginRight: 10,
    },
    nav: {
        paddingTop: Platform.OS === 'ios' ? 15 : 5,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    titleText: {
        color: 'rgba(77, 77, 77, 1)',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 20,
    },
});

export default WhatIsOneRMView;
