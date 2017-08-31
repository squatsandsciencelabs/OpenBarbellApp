import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Alert
}  from 'react-native';
import Camera from 'react-native-camera';

class VideoRecorder extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.isRecording !== this.props.isRecording) {
            if (nextProps.isRecording) {
                this._record();
            } else {
                this._stopRecording();
            }
        }
    }

    _record() {
        this.camera.capture({
            mode: Camera.constants.CaptureMode.video,
            audio: true
        }).then((data) => {
            this.props.saveVideo(this.props.setID, data.path, this.props.videoType);
            // TODO: share options can be here, but for now just finish
        }).catch((err) => {
            console.tron.log("ERROR " + err);
            Alert.alert('There was an issue saving your video. Please try again');
        });
    }

    _stopRecording() {
        this.camera.stopCapture();
    }

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
                <View style={[{flex: 1}, styles.container]}>
                    <Camera
                        ref={(cam) => {this.camera = cam}}
                        style={{flex: 1}}
                        aspect={Camera.constants.Aspect.fit}>

                        <View style={styles.cancelButton}>
                            <TouchableOpacity onPress={()=>this.props.closeModal()}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center'}}>
                            { this._renderActionButton() }
                        </View>

                    </Camera>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
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

export default VideoRecorder;
