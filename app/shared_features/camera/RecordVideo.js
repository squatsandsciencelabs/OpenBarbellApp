import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet
}  from 'react-native';
import Camera from 'react-native-camera';

class RecordVideo extends Component {
    _renderActionButton() {
        if (this.props.isRecording) {
            return (
                <TouchableOpacity onPress={()=>this.props.tappedStop()}>
                    <View style={[styles.actionButton, styles.stopButton]}>
                        <Text style={styles.buttonText}>END</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={()=>this.props.tappedStart(this.props.setID)}>
                    <View style={[styles.actionButton, styles.startButton]}>
                        <Text style={styles.buttonText}>START</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
                <Camera
                    ref={(cam) => {this.camera = cam}}
                    style={{flex: 1}}
                    aspect={Camera.constants.Aspect.fill}
                    captureMode={Camera.constants.CaptureMode.video}>
                    <View style={styles.cancelButton}>
                        <TouchableOpacity onPress={()=>this.props.closeModal()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center'}}>
                        { this._renderActionButton() }
                    </View>
                </Camera>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    actionButton: {
        width: 70,
        height: 70,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startButton: {
        backgroundColor: 'green',
    },
    stopButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cancelText: {
        color: 'black',
        fontWeight: 'bold',
        width: 50,
        height: 30
    }
});

export default RecordVideo;