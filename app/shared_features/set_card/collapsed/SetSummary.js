import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import Pill from 'app/shared_features/pill/Pill';

class SetSummary extends Component {

    render() {
        let pills = [];
        if (this.props.comments) {
            let position = 0;
            this.props.comments.forEach((comment) => {
                let key = position;
                pills.push(<Pill key={position} text={comment} style={styles.pill} />);
                position++;
            });
        }

        return (
            <View style={[styles.border, {flex: 1, height: 38}]}>
                <ScrollView horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    style={{flex:1}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginLeft: 12, justifyContent: 'center'}}>
                                <Text style={styles.text}>{this.props.weight} {this.props.metric} x {this.props.numReps}</Text>
                            </View>
                            
                            {pills}
                        </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    border: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white'
    },
    text: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 12,
        fontWeight: 'bold',
    },
    pill: {
        marginLeft: 5
    }
});

export default SetSummary;
