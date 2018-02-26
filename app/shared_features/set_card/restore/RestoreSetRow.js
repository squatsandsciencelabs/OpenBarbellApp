import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Platform,
    TouchableOpacity
} from 'react-native';

class RestoreSetRow extends Component {

    render() {
        return (
            <View style={[styles.container, styles.border]}>
                <Text style={styles.fieldText}>Deleted Set</Text>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.props.tappedRestore(this.props.setID)}>
                    <Text style={styles.restore}>Restore</Text>
                </TouchableOpacity>
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
    buttonContainer: {
        position: 'absolute',
        right: 10,
        top: 0,
        height: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    restore: {
        color: 'rgba(47, 128, 237, 1)',
        fontSize: 13,
    },
    border: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
});

export default RestoreSetRow;
