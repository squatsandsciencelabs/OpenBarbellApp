import React, { Component } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    View,
    SectionList,
    ScrollView,
    Dimensions,
    ListItem
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import EditHistorySetFormScreen from './card/EditHistorySetFormScreen';
import HistoryLoadingFooterScreen from './loading/HistoryLoadingFooterScreen';
import EditHistoryExerciseScreen from './exercise_name/EditHistoryExerciseScreen';
import EditHistoryTagsScreen from './tags/EditHistoryTagsScreen';
import UserLoggedOutPanel from './logged_out/UserLoggedOutPanel';
import HistorySetExpandedScreen from './expanded/HistorySetExpandedScreen';
import ListLoadingFooter from '../history/loading/ListLoadingFooter';

import SetDataLabelRow from 'app/shared_features/set_card/SetDataLabelRow';
import SetDataRow from 'app/shared_features/set_card/SetDataRow';
import SetRestRow from 'app/shared_features/set_card/SetRestRow';
import HistoryVideoButtonScreen from './card/HistoryVideoButtonScreen';
import HistoryVideoRecorderScreen from './camera/HistoryVideoRecorderScreen';
import HistoryVideoPlayerScreen from './video/HistoryVideoPlayerScreen';

class HistoryList extends Component {

    // UPDATE

    shouldComponentUpdate(nextProps) {
        const differentShowRemoved = nextProps.shouldShowRemoved !== this.props.shouldShowRemoved;
        const differentSections = nextProps.sections !== this.props.sections;
        return differentShowRemoved || differentSections;
    }

    // RENDER

    _renderSectionHeader(section) {
        return (
            <View>
                <View style={{height:40, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text>{section.key}</Text>
                </View>
            </View>
        );
    }

    _renderSectionFooter(section) {
        if (section.key !== 0) {
            return <ListLoadingFooter />
        }
    }

    _renderRow(section, index, item) {
        switch (item.type) {
            case "header":
                // note: on focus will avoid the Redux store for simplicity and just do it through the callback function
                // technically an action to scroll should be application state and therefore should go through the global store
                return (<View style={{marginTop: 15, backgroundColor: 'white'}}>
                            <EditHistorySetFormScreen
                                setNumber={item.setNumber}
                                setID={item.setID}
                                removed={item.removed}
                                exercise={item.exercise}
                                tags={item.tags}
                                weight={item.weight}
                                metric={item.metric}
                                rpe={item.rpe}
                                onFocus={() => {
                                    this.sectionList.scrollToLocation({sectionIndex: section.position, itemIndex: index});
                                }}
                                renderDetailComponent={()=> {
                                    if (item.videoFileURL !== null && item.videoFileURL !== undefined) {
                                        return (<HistoryVideoButtonScreen setID={item.setID} mode='watch' videoFileURL={item.videoFileURL} />);
                                    } else {
                                        return (<HistoryVideoButtonScreen setID={item.setID} mode='commentary' />);
                                    }
                                }}
                            />
                        </View>);
            case "subheader":
                return (
                    <SetDataLabelRow />
                );
            case "data":
                return (<SetDataRow item={item}
                            onPressRemove={() =>this.props.removeRep(item.setID, item.rep) }
                            onPressRestore={() => this.props.restoreRep(item.setID, item.rep) }
                            onPressRow={() => this.props.tapCard(item.setID) }
                        />);
            case "footer":
                return (<SetRestRow item={item} />);
            default:
                break;
        }
    }

    render() {
        var list = null;
        if (this.props.sections.length > 0) {
            list = (<SectionList
                ref={(ref) => { this.sectionList = ref; }}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='always'
                initialNumToRender={13}
                stickySectionHeadersEnabled={false}
                ListFooterComponent={HistoryLoadingFooterScreen}
                renderItem={({item, index, section}) => this._renderRow(section, index, item)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section) }
                renderSectionFooter={({section}) => this._renderSectionFooter(section)}                
                sections={this.props.sections}
                onEndReached={() => this.props.finishLoading() }
                style = {{padding: 10, backgroundColor: '#f2f2f2'}}
            />);
        }
        if (this.props.email !== undefined && this.props.email !== null) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <EditHistoryExerciseScreen />
                    <EditHistoryTagsScreen />
                    <HistorySetExpandedScreen />
                    <HistoryVideoRecorderScreen />
                    <HistoryVideoPlayerScreen />

                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {list}
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f2f2f2' }}>
                    <ScrollView>
                        <UserLoggedOutPanel subtitle='The access the history screen, go to settings and log in with a Google account.'/>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default HistoryList;
