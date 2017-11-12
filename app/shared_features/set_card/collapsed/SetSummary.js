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
        this.props.tags.forEach((tag) => {
            pills.push(<Pill text={tag} style={styles.pill} />);
        });

        return (
            <View style={[styles.border, {flex: 1}]}>
                <ScrollView horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    style={{flex:1, backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginLeft: 20, justifyContent: 'center'}}>
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
        borderLeftWidth: 1,
        borderRightWidth: 1,
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
