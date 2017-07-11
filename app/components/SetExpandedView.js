// app/components/SetExpandedView.js

import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    Modal
} from 'react-native';

class SetExpandedView extends PureComponent {

    _renderRow(item) {
        return (
            <View style={{flex: 1, flexDirection: 'row', width: 2000, backgroundColor: 'red'}}>
                <View>
                    <Text style={{marginHorizontal: 10}}>1{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>2{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>3{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>4{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>5{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>6{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>7{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>8{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>9{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>10{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>11{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>12{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>13{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>14{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>15{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>16{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>17{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>18{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>19{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>20{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>21{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>22{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>23{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>24{item.key}</Text>
                </View>
                <View>
                    <Text style={{marginHorizontal: 10}}>25{item.key}</Text>
                </View>
            </View>
        );
    }

    render() {
        let data = [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}, {key: 'g'}, {key: 'h'}, {key: 'i'}, {key: 'j'}];

        return (
            <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={true} >

                    <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <View>
                                <Text>THIS IS THE HEADER THIS IS THE HEADER THIS IS THE HEADER THIS IS THE HEADER </Text>
                            </View>
                            <FlatList
                                style={{width: 2000, backgroundColor: 'green'}}
                                data={data}
                                renderItem={({item}) => this._renderRow(item)}
                            />
                        </View>
                        
                    </ScrollView>

            </Modal>
        );
    }

}

export default SetExpandedView;