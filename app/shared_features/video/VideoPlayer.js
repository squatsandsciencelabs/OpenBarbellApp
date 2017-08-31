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

class VideoPlayer extends Component {

    render() {

        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
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
                        <TouchableOpacity onPress={()=>this.props.closeModal()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.deleteButton}>
                        <TouchableOpacity onPress={()=>this.props.deleteVideo(this.props.setID)}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'rgba(0,0,0,0)'
    },
    cancelText: {
        color: 'black',
        fontWeight: 'bold',
        width: 50,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0)'        
    },
    deleteButton: {
        position: 'absolute',
        right: 20,
        top: 30,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
        width: 50,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0)'        
    },
});

export default VideoPlayer;
