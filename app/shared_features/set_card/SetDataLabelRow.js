import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetDataLabelRow extends PureComponent {

    render() {
        return (
            <View style={[{flexDirection: 'column', alignItems: 'stretch', paddingTop: 5, paddingRight: 20, paddingLeft: 3, backgroundColor: 'white'}, styles.border, styles.container]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.headerLabel}><Text style={styles.text}>REP</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>AVG</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>PKV</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>PKH</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>ROM</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>DUR</Text></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                    <View style={styles.headerLabel}><Text style={styles.text}>#</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>m/s</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>m/s</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>%</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>mm</Text></View>
                    <View style={styles.headerLabel}><Text style={styles.text}>sec</Text></View>
                </View>
                <View style={styles.horizontalBorder}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    headerLabel: {
        flex: 1,
        width: 45,
        alignItems: 'center',
    },
    text: {
        color: 'lightgray'
    },
    container: {
        backgroundColor: 'white'
    },
    border: {
        borderColor: '#e0e0e0',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    horizontalBorder: {
        backgroundColor: '#e0e0e0',
        opacity: 0.5,
        height: 1,
    },
});

export default SetDataLabelRow;
