// TODO: consider using react native video controls, which is already installed
// doing custom for now as some of the controls aren't working, specifically pause / play and I can't hide the full screen button

import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
}  from 'react-native';
import Video from 'react-native-video';
import KeepAwake from 'react-native-keep-awake';

class VideoPlayer extends Component {

    _renderVideo() {
        if (this.props.isModalShowing) {
            return (
                <View style={[{flex: 1}, styles.container]}>                
                    <Video
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={[{flex:1}, styles.button, styles.blackButton]}
                        source={{uri: this.props.video}}
                        paused={false}
                        resizeMode="contain"
                        repeat={true}
                    />

                    <View style={styles.cancelButton}>
                        <TouchableOpacity onPress={()=>this.props.closeModal(this.props.setID)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.deleteButton}>
                        <TouchableOpacity onPress={()=>this.props.deleteVideo(this.props.setID)}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
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
                { this._renderVideo() }
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    },
    cancelButton: {
        position: 'absolute',
        left: 20,
        top: 30,
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
    deleteButton: {
        position: 'absolute',
        right: 20,
        top: 30,
        width: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        width: 50,
        height: 30,
        paddingTop: 5,
        textAlign: 'center'
    },
});

export default VideoPlayer;
