import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StatusBar,
    StyleSheet,
    View,
    ListView,
    ScrollView,
    Dimensions,
    Alert,
    Platform
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import WorkoutScreen from 'app/features/workout/WorkoutScreen';
import SettingsTab from 'app/features/settings/SettingsTab';
import HistoryScreen from 'app/features/history/HistoryScreen';

class ApplicationView extends Component {
    state = {
        index: 2,
        routes: [
            { key: 'workout', title: 'WORKOUT' },
            { key: 'history', title: 'HISTORY' },
            { key: 'settings', title: 'SETTINGS' },            
        ],
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
    
    _renderScene = SceneMap({
        'workout': () => <WorkoutScreen />,
        'history': () => <HistoryScreen />,
        'settings': () => <SettingsTab />
    });

    _renderHeader = props => <TabBar indicatorStyle={{backgroundColor: '#e76161'}} style={{backgroundColor: '#333333'}} {...props} />;

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
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={(index) => this.props.changeTab(index) }
                />

            </View>
        );
    }

    // RENDER

    render() {
        // TODO: Fix Kill Switch bug on rotation
        // TODO: move the kill switch UI (not the logic) to another file, it doesn't belong in the Application
        // TODO: Kill switch should link to the app store to make it easier to update
        // TODO: recommended but NOT required update
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
