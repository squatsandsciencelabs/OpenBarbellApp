import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class HistoryFilterBar extends Component {

    _onPressCSV() {
        this.props.exportCSV();
    }

    _onPressSwitch(isSwitchOn) {
        if (isSwitchOn) {
            this.props.showRemoved();
        } else {
            this.props.hideRemoved();
        }
    }

    _renderExportCSV() {
        var isExportingCSV = this.props.isExportingCSV;
        if (isExportingCSV) {
            return (
                <ActivityIndicator
                    style={{marginLeft: 10}}
                    color="white"
                />
            );
        } else {
            return (
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={ () => this._onPressCSV() } >
                    <Text style={{color:'white', marginLeft: 5}}>Export CSV</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <View style={styles.bar}>
                { this._renderExportCSV() }

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{color:'white'}}>Show Deleted</Text>
                    <Switch
                        style={{backgroundColor: 'rgba(47, 128, 237, 1)', marginLeft: 3, marginRight: 5}}
                        value={this.props.shouldShowRemoved}
                        onValueChange={(isSwitchOn) => this._onPressSwitch(isSwitchOn)}
                        onTintColor='white'
                        thumbTintColor='lightgray'
                        tintColor='white'/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch', // stretch to take full height
        justifyContent: 'space-between', // center text vertically
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(47, 128, 237, 1)',
        position: 'absolute',
        height: 50,
        padding:0,
    },
});

export default HistoryFilterBar;
