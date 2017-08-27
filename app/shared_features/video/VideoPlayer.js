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
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={[{flex:1, flexDirection:'column'}, styles.button, styles.blackButton]}
                    source={{uri: this.props.video}}
                    paused={false}
                    repeat={true}
                >
                        <TouchableOpacity onPress={()=>this.props.closeModal()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                </Video>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    cancelButton: {
        paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cancelText: {
        paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'black',
        fontWeight: 'bold',
        width: 50,
        height: 30
    }
});

export default VideoPlayer;
