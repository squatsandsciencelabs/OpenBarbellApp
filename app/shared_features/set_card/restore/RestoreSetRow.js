import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Pill from 'app/shared_features/pill/Pill';

class RestoreSetRow extends Component {

    _renderSummary() {
        let pills = [];
        if (this.props.tags) {
            let position = 0;
            this.props.tags.forEach((tag) => {
                let key = position;
                pills.push(<Pill key={position} text={tag} style={styles.pill} />);
                position++;
            });
        }

        return (
            <View style={styles.scrollContainer}>
                <ScrollView horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    style={{flex:1}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', marginLeft: 12}}>
                                <Text style={styles.text}>
                                    <Text style={{fontWeight: 'bold'}}>{this.props.exercise} </Text>
                                    {this.props.weight}{this.props.metric} x {this.props.numReps} @ {this.props.rpe}RPE
                                </Text>
                            </View>
                            
                            {pills}
                        </View>
                </ScrollView>
            </View>
        );
    }

    render() {
        return (
            <View style={[styles.container, styles.border]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.fieldText}>Deleted Set</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.props.tappedRestore(this.props.setID)}>
                        <Text style={styles.restore}>Restore</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {this._renderSummary()}
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 15,
        flex: 1,
        flexDirection: 'column',
    },
    border: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },

    fieldText: {
        paddingLeft: 12,
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
    },
    restore: {
        color: 'rgba(47, 128, 237, 1)',
        fontSize: 13,
    },

    scrollContainer: {
        flex: 1,
        height: 38,
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    text: {
        color: 'rgba(77, 77, 77, 1)',
        fontSize: 12,
    },
    pill: {
        marginLeft: 5,
        marginTop: 5,
    }
});

export default RestoreSetRow;
