import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';

class SetTitleRowCollapsed extends Component {

    _renderExercise() {
        if (this.props.exercise === null || this.props.exercise === '') {
            return (<Text style={[styles.fieldText, styles.placeholderText]}>Exercise</Text>);
        }
        return (<Text style={styles.fieldText}>{this.props.exercise}</Text>);
    }

    _renderSetNumber() {
        if (this.props.removed) {
            return null;
        }
        if (this.props.setNumber === null || this.props.setNumber === undefined) {
            var text = '#1';
        } else {
            var text = '#' + this.props.setNumber;
        }
        return (<Text style={styles.detailText}> {text}</Text>);
    }

    // TODO: make this into its own component
    _renderVideo() {
        if (this.props.videoFileURL === null || this.props.videoFileURL === undefined) {
            return null;
        }

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={styles.videoButton} onPress={()=> this.props.tappedWatch(this.props.setID, this.props.videoFileURL) }>
                    <View style={[{flex: 1}, styles.button, styles.blackButton]}>
                        <Video
                            ref={(ref) => {
                                this.player = ref
                            }}
                            style={styles.videoPlayer}
                            source={{uri: this.props.videoFileURL}}
                            paused={true}
                            repeat={true}
                        />
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.videoButton} onPress={()=> this.props.tappedWatch(this.props.setID, this.props.videoFileURL) }>
                    <View style={[styles.button, styles.blackButton]}>
                        <Image
                            style={[{flex:1, flexDirection:'column'}, styles.imagePreview]}
                            source={{uri: this.props.videoFileURL}} />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}>
                <Text>Video Goes Here</Text>
            </TouchableOpacity>
        );
    }

    _renderChevron() {
        return (
            <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                onPress={() => this.props.tapExpand(this.props.setID)}>            
                    <View>
                        <Icon name="chevron-with-circle-up" size={20} color='rgba(170, 170, 170, 1)' />
                    </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.border]}>
                {this._renderExercise()}
                {this._renderSetNumber()}
                {this._renderVideo()}
                {this._renderChevron()}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 12,
        paddingRight: 10,        
        paddingTop: 15,
        paddingBottom: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldText: {
        fontSize: 17,
        color: 'rgba(77, 77, 77, 1)',
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 17,
        color: 'gray',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontWeight: 'bold',
    },
    placeholderText: {
        color: 'rgba(189, 189, 189, 1)'
    },
    videoButton: {
        position: 'absolute',
        right: 40,
        top: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    videoPlayer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SetTitleRowCollapsed;
