// app/components/SetExpandedView.js

// TODO: variable columns, for now just hardcode them
// TODO: make the grid views float over everything instead of making it piece of piece

import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    Modal,
    TouchableHighlight
} from 'react-native';

class SetExpandedView extends PureComponent {

    _renderHeader() {
        return (
            <View style={[styles.shadow, {height: 70, paddingTop: 35, paddingLeft: 15, marginBottom: 15}]}>
                <TouchableHighlight onPress={() => this.props.closeModal()}>
                    <Text>Close</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _renderStickyHeader() {
        return (
            <View style={{flexDirection: 'column', alignItems: 'stretch'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.headerLabel}><Text>REP</Text></View>
                        <View style={styles.headerLabel}><Text>AVG</Text></View>
                        <View style={styles.headerLabel}><Text>PKV</Text></View>
                        <View style={styles.headerLabel}><Text>PKH</Text></View>
                        <View style={styles.headerLabel}><Text>ROM</Text></View>
                        <View style={styles.headerLabel}><Text>DUR</Text></View>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                        <View style={styles.headerLabel}><Text>#</Text></View>
                        <View style={styles.headerLabel}><Text>m/s</Text></View>
                        <View style={styles.headerLabel}><Text>m/s</Text></View>
                        <View style={styles.headerLabel}><Text>%</Text></View>
                        <View style={styles.headerLabel}><Text>mm</Text></View>
                        <View style={styles.headerLabel}><Text>sec</Text></View>
                    </View>
                    <View style={styles.horizontalBorder}/>
            </View>
        );
    }

    _renderRow(item) {
        var data = [];
        let count = 0;
        for (num of item.values) {
            count++;
            data.push(
                <View key={item.key+" " +count} style={{flexDirection: "row"}}>
                    <View style={styles.number}><Text>{num}</Text></View>
                    <View style={styles.verticalBorder} />
                </View>
            );
        }

        if (item.key === 'rep1') {
            var initialBorder = (<View style={[styles.horizontalBorder, {top: -1}]}/>);
        } else {
            var initialBorder = null;
        }

        return (
            <View key={item.key} style={{flex: 1, flexDirection: 'column'}}>
                {initialBorder}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.verticalBorder} />
                    {data}
                </View>
                <View style={styles.horizontalBorder}/>
            </View>
        );
    }

    render() {
        return (
            <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.props.visible} >
                    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                        {this._renderHeader()}
                        <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>

                            <View style={{flex: 1, flexDirection: 'column'}}>
                                {this._renderStickyHeader()}
                                <FlatList
                                    data={this.props.rows}
                                    renderItem={({item}) => this._renderRow(item)}
                                />
                            </View>
                            
                        </ScrollView>
                    </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    headerLabel: {
        width: 80,
        alignItems: 'center'
    },
    number: {
        height: 44,
        width: 79,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalBorder: {
        backgroundColor: 'lightgray',
        height: 1,
    },
	verticalBorder: {
        width: 1,
        backgroundColor: 'lightgray',
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
});

export default SetExpandedView;