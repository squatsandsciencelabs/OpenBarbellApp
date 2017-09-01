import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

class SetDataLabelRow extends PureComponent {

    render() {
        return (
            <View style={[{flexDirection: 'column', alignItems: 'stretch', paddingTop: 5}, styles.shadow]}>
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
        alignItems: 'center',
    },
    text: {
        color: 'lightgray'
    },
    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
    },
    horizontalBorder: {
        backgroundColor: 'white',
        opacity: 0.5,
        height: 1,
    },
});

export default SetDataLabelRow;
