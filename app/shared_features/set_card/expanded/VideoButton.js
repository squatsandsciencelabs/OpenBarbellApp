import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Alert,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Permissions from 'react-native-permissions';

class VideoButton extends Component {

    _tappedWatchVideo() {
        this.props.tappedWatch(this.props.setID, this.props.videoFileURL);
    }

    _checkPermission(tapFunction, setID) {
        Permissions.check('camera').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if (response === 'authorized') {
                return tapFunction(setID);
            } else {
                Alert.alert(
                    'Enable Camera Access',
                    'Please allow camera access',
                    [
                    {text: 'OK'},
                    ],
                    { cancelable: false }
                );
            };
        });
    };

    render() {
        switch (this.props.mode) {
            case 'record':
                return (
                    <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._checkPermission(this.props.tappedRecord, this.props.setID)}>
                        <View style={[{flex:1, flexDirection:'column'}, styles.button, styles.activeButton]}>
                            <Icon name="camera" size={20} color='rgba(47, 128, 227, 1)' style={{marginTop: 10, marginBottom: 5}} />
                            <Text style={styles.activeText}>Record</Text>
                            <Text style={styles.activeText}>Video</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'commentary':
                return (
                    <View style={{paddingLeft: 5}}>
                        <View style={[{flex:1}, styles.button, styles.grayButton]}>
                            <TouchableHighlight onPress={()=> this._checkPermission(this.props.tappedCommentary, this.props.setID)} underlayColor='#e0e0e0'>
                                <View style={[styles.buttonContent, {flex:1, flexDirection:'column'}]}>
                                    <Icon name="camera" size={20} color='gray' style={{marginTop: 10, marginBottom: 5}} />
                                    <Text style={styles.grayText}>Add</Text>
                                    <Text style={styles.grayText}>Video Log</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                );
            case 'watch':
                // TODO: see if can make this a true image preview instead of a full video
                // probably requires RCTCameraRoll
                if (Platform.OS === 'ios') {
                    return (
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._tappedWatchVideo() }>
                            <View style={[{flex: 1}, styles.button, styles.blackButton]}>
                                <Video
                                    ref={(ref) => {
                                        this.player = ref
                                    }}
                                    style={styles.button}
                                    source={{uri: this.props.videoFileURL}}
                                    paused={true}
                                    repeat={true}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._tappedWatchVideo() }>
                            <View style={[styles.button, styles.blackButton]}>
                                <Image
                                    style={[{flex:1, flexDirection:'column'}, styles.imagePreview]}
                                    source={{uri: this.props.videoFileURL}} />
                            </View>
                        </TouchableOpacity>
                    );
                }
            default:
                console.tron.log("video button props failed with mode " + this.props.mode);
                return null;
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 5,
    },
    buttonContent: {
        width: 65,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview: {
        width: 75,
        height: 75,
    },
    activeButton: {
        backgroundColor: 'rgba(176, 208, 252, 1)',
        borderColor: 'rgba(176, 208, 252, 1)',
    },
    grayButton: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
    },
    blackButton: {
        backgroundColor: 'black',
        borderColor: 'black',
    },
    activeText: {
        color: 'rgba(47, 128, 227, 1)',
        fontSize: 11,
        fontWeight: '500'
    },
    grayText: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 11
    },
});


export default VideoButton;
