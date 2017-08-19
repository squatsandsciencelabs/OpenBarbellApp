import React, {Component} from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    ListView,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import WorkoutScreen from 'app/features/workout/WorkoutScreen';
import SettingsTab from 'app/features/settings/SettingsTab';
import HistoryScreen from 'app/features/history/HistoryScreen';

class ApplicationView extends Component {

    componentDidMount() {
        this._checkIfOutdated();
    }

    render() {
        // TODO: Fix Kill Switch bug on rotation
        // TODO: move the kill switch UI (not the logic) to another file, it doesn't belong in the Application
        // TODO: Kill switch should link to the app store to make it easier to update
        // TODO: recommended but NOT required update
        var { height, width } = Dimensions.get('window');
        var killSwitchStatus = this.props.killSwitch.status;

        if (killSwitchStatus == 'KILLED') {
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
        } else {
            return (
                <ScrollableTabView
                    style={{marginTop: 20}}
                    contentProps={{ keyboardShouldPersistTaps: 'always', keyboardDismissMode: 'on-drag' }}
                    renderTabBar={() => <DefaultTabBar />}
                    initialPage={ 2 }
                    onChangeTab={ () => { this.props.changeTab() } }>
                    <View style={styles.tabView} tabLabel='WORKOUT'>
                        <WorkoutScreen />
                    </View>
                    <View style={styles.tabView} tabLabel='HISTORY'>
                        <HistoryScreen />
                    </View>
                    <ScrollView style={styles.tabView} tabLabel='SETTINGS'>
                        <SettingsTab />
                    </ScrollView>

                </ScrollableTabView>
            );
        }
    }

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

}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.01)'
    }
});

export default ApplicationView;
