import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class Pill extends PureComponent {

    setNativeProps(props: Object) {
        this.refs['COMMON_THREAD_ROW'].setNativeProps(props)
    }

    render() {
        return (
            <View {...this.props}>
                <View style={styles.pill} ref='COMMON_THREAD_ROW'>
                    <Text style={styles.pillText}>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pill: {
        borderColor: 'rgba(176, 208, 252, 1)',
        backgroundColor: 'rgba(176, 208, 252, 1)',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 5,
        borderRightWidth: 5,        
        borderRadius: 15,
    },
    pillText: {
        color: 'blue',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
    }
});

export default Pill;
