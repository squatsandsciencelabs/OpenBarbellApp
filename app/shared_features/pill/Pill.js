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

    _renderPill() {
        if (this.props.text === 'bug') {
            // hack to get bug pill working
            // TODO: make this generic rather than specific so you can have multiple pill types
            return (
                <View style={styles.bugPill} ref='COMMON_THREAD_ROW'>
                    <Text style={styles.bugPillText}>{this.props.text}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.pill} ref='COMMON_THREAD_ROW'>
                    <Text style={styles.pillText}>{this.props.text}</Text>
                </View>                
            );
        }
    }

    render() {
        return (
            <View {...this.props}>
                {this._renderPill(this.props.text)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bugPill: {
        borderColor: 'rgba(252, 176, 176, 1)',
        backgroundColor: 'rgba(252, 176, 176, 1))',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 5,
        borderRightWidth: 5,        
        borderRadius: 15,
    },
    pill: {
        borderColor: 'rgba(176, 208, 252, 1)',
        backgroundColor: 'rgba(176, 208, 252, 1)',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 5,
        borderRightWidth: 5,        
        borderRadius: 15,
    },
    bugPillText: {
        color: 'red',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5, 
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
