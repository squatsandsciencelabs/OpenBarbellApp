import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

class VideoButton extends Component {

    _tappedWatchVideo() {
        this.props.tappedWatch(this.props.setID, this.props.videoFileURL);

        // TODO: make the full video mode go through actions rather than append like this
        // this.player.seek(0);
        // this.player.paused = false;
        // this.player.presentFullscreenPlayer();
    }

    render() {
        switch (this.props.mode) {
            case 'record':
                return (
                    <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this.props.tappedRecord(this.props.setID) }>
                        <View style={[{flex:1, flexDirection:'column'}, styles.button, styles.greenButton]}>
                            <Icon name="camera" size={20} color='white' style={{marginTop: 10, marginBottom: 5}} />
                            <Text style={styles.whiteText}>Record</Text>
                            <Text style={styles.whiteText}>Video</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'commentary':
                return (
                    <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this.props.tappedCommentary(this.props.setID) }>
                        <View style={[{flex:1, flexDirection:'column'}, styles.button, styles.graybutton]}>
                            <Icon name="camera" size={20} color='gray' style={{marginTop: 10, marginBottom: 5}} />
                            <Text style={styles.grayText}>Add</Text>
                            <Text style={styles.grayText}>Video Log</Text>
                        </View>
                    </TouchableOpacity>
                );
            case 'watch':
                // TODO: see if can make this a true image preview instead of a full video
                // probably requires RCTCameraRoll
                if (Platform.OS === 'ios') {
                    // return (
                        // <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._tappedWatchVideo() }>
                        //     <Video
                        //         ref={(ref) => {
                        //             this.player = ref
                        //         }}
                        //         style={[{flex:1, flexDirection:'column'}, styles.button, styles.blackButton]}
                        //         source={{uri: this.props.videoFileURL}}
                        //         paused={true}
                        //         repeat={true}
                        //     />
                        // </TouchableOpacity>
                    // );
                    return (
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._tappedWatchVideo(this.props.setID, this.props.videoFileURL) }>
                        <Video
                            ref={(ref) => {
                                this.player = ref
                            }}
                            style={[{flex:1, flexDirection:'column'}, styles.button, styles.blackButton]}
                            source={{uri: this.props.videoFileURL}}
                            paused={true}
                            repeat={true}
                        />
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity style={{paddingLeft: 5}} onPress={()=> this._tappedWatchVideo() }>                        
                            <Image
                                style={[{flex:1, flexDirection:'column'}, styles.button, styles.blackButton]}
                                source={{uri: this.props.videoFileURL}} />
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
        width: 77,
        height: 77,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 5,
    },
    greenButton: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    graybutton: {
        backgroundColor: 'rgba(239, 239, 239, 1)',
        borderColor: 'rgba(239, 239, 239, 1)',
    },
    blackbutton: {
        backgroundColor: 'black',
        borderColor: 'black',
    },
    whiteText: {
        color: 'white',
    },
    grayText: {
        color: 'gray'
    },
});


export default VideoButton;
