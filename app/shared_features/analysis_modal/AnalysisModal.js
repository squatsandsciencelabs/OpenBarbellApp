import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Platform,
    WebView,
    StyleSheet,
    Button,
 }  from 'react-native';

 class AnalysisModal extends Component {

    _close() {
        this.props.closeModal();
    }

    // RENDER

    render() {
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
                        <Text style={styles.titleText}>{this.props.title}</Text>

                            <View style={{position: 'absolute', left: 0, top: 0}}>
                                <TouchableOpacity onPress={() => this._close() }>
                                    <View style={styles.nav}>
                                        <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>X</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                    
                    <Text style={{marginBottom: 20}}>{this.props.body}</Text>

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
        height: 500,
        width: 300,
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

export default AnalysisModal;
