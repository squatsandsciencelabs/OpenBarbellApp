import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Alert,
    Platform
}  from 'react-native';
import Camera from 'react-native-camera';
import KeepAwake from 'react-native-keep-awake';
import * as Device from 'app/utility/Device';
import Icon from 'react-native-vector-icons/FontAwesome';

class VideoRecorder extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.isRecording !== this.props.isRecording) {
            if (this.props.isRecording) {
                this._record();
            } else {
                this._stopRecording();
            }
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    // actions

    _closeModal() {
        if (!this.timer) {
            this.props.closeModal(this.props.setID);
        }
    }

    // toggle
    _toggleCameraType() {
        this.props.toggleCameraType();
    }

    // record

    _record() {
        this.camera.capture({
            mode: Camera.constants.CaptureMode.video,
            audio: true
        }).then((data) => {
            if (this.props.setID) {
                this.props.saveVideo(this.props.setID, data.path, this.props.videoType);
            }
            // TODO: share options can be here, but for now just finish
        }).catch((err) => {
            console.tron.log("ERROR " + err);
            this.props.saveVideoError(this.props.setID, err);
            Alert.alert('There was an issue saving your video. Please try again');
        });
    }

    _stopRecording() {
        // cancelled a recording
        if (!this.props.isModalShowing) {
            return;
        }

        if (Platform.OS === 'ios') {
            // TODO: remove timer hack, this was necessary to prevent weird behavior when ending too quickly
            this.timer = setTimeout(() => {
                this.camera.stopCapture();
                clearTimeout(this.timer);
                this.timer = null;    
            }, 1000);
        } else {
            this.camera.stopCapture();
        }
    }

    // render

    _renderActionButton() {
        if (this.props.isSaving) {
            return (
                <View style={[styles.actionButton, styles.savingButton]}>
                    <Text style={styles.buttonText}>SAVING</Text>
                </View>
            );
        } else if (this.props.isRecording) {
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

    _renderToggleCameraTypeButton() {
        // need to return empty view as button remains but is not clickable if not returning anything
        if (this.props.isRecording) {
            return <View></View>
        } else {
            return (
                <View style={styles.flipButton}>
                    <TouchableOpacity onPress={()=>this._toggleCameraType()}>
                        <View>
                            <Icon name="repeat" size={30} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 22.5, overflow: 'hidden' }} color='white' />
                        </View>
                    </TouchableOpacity>    
                </View>
            );
        }
    }

    _renderCamera() {
        if (this.props.isModalShowing) {
            return (
                <View style={[{flex: 1}, styles.container]}>                
                    <Camera
                        ref={(cam) => {this.camera = cam}}
                        style={{flex: 1}}
                        type={this.props.cameraType}
                        aspect={Camera.constants.Aspect.fit}
                    >
                        <View style={styles.cancelButton}>
                            <View>
                            <TouchableOpacity onPress={()=>this._closeModal()}>
                                <View><Text style={styles.cancelText}>Cancel</Text></View>
                            </TouchableOpacity>
                            </View>
                        </View>

                        {this._renderToggleCameraTypeButton()}

                        <View style={{position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center'}}>
                            { this._renderActionButton() }
                        </View>

                    </Camera>
                    <KeepAwake />
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
                { this._renderCamera() }
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
    savingButton: {
        backgroundColor: 'darkgray'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: Device.isiPhoneX() ? 50 : 30,
        marginLeft: 20,
        width: 100,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    cancelText: {
        color: 'white',
        fontWeight: 'bold',
        width: 50,
        height: 30,
        paddingTop: 5,
        textAlign: 'center'
    },
    flipButton: {
        alignItems: 'flex-end', 
        marginRight: 20, 
        backgroundColor: '#00000000' 
    },
    flipIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        padding: 10, 
        borderRadius: 22.5, 
        overflow: 'hidden',
    },
});

export default VideoRecorder;
