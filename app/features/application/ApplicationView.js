// TODO: NavigationConfig info should ideally be passed in from the screen rather than pulled from the view
// TODO: Fix Kill Switch bug on rotation
// TODO: move the kill switch UI (not the logic) to another file, it doesn't belong in the Application
// TODO: Kill switch should link to the app store to make it easier to update
// TODO: recommended but NOT required update

import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StatusBar,
    StyleSheet,
    View,
    ListView,
    Dimensions,
    Alert,
    Platform
} from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import * as NavigationConfig from 'app/configs/NavigationConfig';

class ApplicationView extends Component {
    state = {
        index: NavigationConfig.initialIndex,
        routes: NavigationConfig.routes,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabIndex !== this.state.index) {
            this.setState({index: nextProps.tabIndex});
        }
    }

    componentDidMount() {
        this._checkIfOutdated();
    }

    // KILL SWITCH FUNCTIONS

    _checkIfOutdated() {
        if (this.props.killSwitch.status == 'OUTDATED') {
            Alert.alert(
                "Application Outdated",
                'Update to latest?',
                [
                    {text: 'Later', onPress: () => console.tron.log('\'Later\' pressed')},
                    {text: 'Update', onPress: () => console.tron.log('\'Update\' Pressed')}
                ]
            );
        }
    }

    _renderKillSwitch() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ textAlign: 'center' }}>
                        ᕦ[ . ◕ ͜ ʖ ◕ . ]ᕤ
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>
                        Please update to the latest version! This version is no longer supported.
                    </Text>
                </View>
            </View>
        );
    }

    // TAB BAR FUNCTIONS

    _handleIndexChange(index) {
        this.props.changeTab(index);
    }

    _renderHeader = props => <TabBar
        indicatorStyle={{backgroundColor: '#eb5757', height: 2}}
        style={{backgroundColor: '#333333'}}
        labelStyle={{fontWeight: '500', fontSize: 12, padding: 0, marginLeft: 0, marginRight: 0 }}
        {...props} />;

    _renderApplication() {
        if (Platform.OS === 'ios') {
            var statusBarBG = (
                <View style={[{width: 9001}, styles.statusBar]}></View>
            );
        } else {
            var statusBarBG = null;
        }

        return (
            <View style={[{flex: 1}, styles.container]}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />
                { statusBarBG }

                <TabViewAnimated
                    style={{flex: 1}}
                    navigationState={this.state}
                    renderScene={NavigationConfig.sceneMap}
                    renderHeader={this._renderHeader}
                    onIndexChange={(index) => this.props.changeTab(index) }
                    swipeEnabled={this.props.swipeEnabled}
                />

            </View>
        );
    }

    // RENDER

    render() {
        var { height, width } = Dimensions.get('window');
        var killSwitchStatus = this.props.killSwitch.status;

        if (killSwitchStatus == 'KILLED') {
            return this._renderKillSwitch();
        } else {
            return this._renderApplication();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2'
    },
    statusBar: {
        height: 20,
        backgroundColor: 'black'
    }
});

export default ApplicationView;
