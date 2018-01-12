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

import EditHistorySetFormScreen from './card/expanded/form/EditHistorySetFormScreen';
import EditHistoryTitleExpandedScreen from './card/expanded/title/EditHistoryTitleExpandedScreen';
import EditHistoryTitleCollapsedScreen from './card/collapsed/EditHistoryTitleCollapsedScreen';
import HistoryLoadingFooterScreen from './loading/HistoryLoadingFooterScreen';
import EditHistoryExerciseScreen from './exercise_name/EditHistoryExerciseScreen';
import EditHistoryTagsScreen from './tags/EditHistoryTagsScreen';
import UserLoggedOutPanel from './logged_out/UserLoggedOutPanel';
import ListLoadingFooter from '../history/loading/ListLoadingFooter';
import SetDataLabelRow from 'app/shared_features/set_card/expanded/SetDataLabelRow';
import SetDataRow from 'app/shared_features/set_card/expanded/SetDataRow';
import SetRestRow from 'app/shared_features/set_card/SetRestRow';
import HistoryVideoButtonScreen from './card/expanded/form/HistoryVideoButtonScreen';
import HistoryVideoRecorderScreen from './camera/HistoryVideoRecorderScreen';
import HistoryVideoPlayerScreen from './video/HistoryVideoPlayerScreen';
import SetSummary from 'app/shared_features/set_card/collapsed/SetSummary';
import SetAnalysisScreen from 'app/shared_features/set_card/analysis/SetAnalysisScreen';

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
                    <Text style={{color: 'rgba(77, 77, 77, 1)'}}>{section.key}</Text>
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
            case "title":
                if (!item.isCollapsed) {
                    return (<View style={{borderTopWidth: 1, borderColor: '#e0e0e0'}}>
                                <EditHistoryTitleExpandedScreen
                                    setID={item.setID}
                                    exercise={item.exercise}
                                    removed={item.removed}
                                    setNumber={item.setNumber}
                                    isCollapsable={true} />
                            </View>);
                } else {
                    return (<View style={{borderTopWidth: 1, borderColor: '#e0e0e0'}}>
                                <EditHistoryTitleCollapsedScreen
                                    setID={item.setID}
                                    exercise={item.exercise}
                                    removed={item.removed}
                                    setNumber={item.setNumber}
                                    videoFileURL={item.videoFileURL} />
                            </View>);
                }
            case "summary":
                return (
                    <SetSummary
                        weight={item.weight}
                        metric={item.metric}
                        numReps={item.numReps}
                        tags={item.tags}
                    />
                );
            case "analysis":
                return (
                    <SetAnalysisScreen set={item.set} />
                );
            case "form":
                // note: on focus will avoid the Redux store for simplicity and just do it through the callback function
                // technically an action to scroll should be application state and therefore should go through the global store
                return (<View style={{backgroundColor: 'white'}}>
                            <EditHistorySetFormScreen
                                setID={item.setID}
                                initialStartTime={item.initialStartTime}
                                removed={item.removed}
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
                return (
                    <View style={{marginBottom: 15}}>                    
                        <SetRestRow item={item} />
                    </View>);
            case "bottom border":
                return (<View style={{flex: 1, backgroundColor: '#e0e0e0', height: 1, marginBottom: 15}} />);
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
                    <HistoryVideoRecorderScreen />
                    <HistoryVideoPlayerScreen />

                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {list}
                    </View>
                </View>
            );
        } else {
            return (
                <ScrollView style={{flex: 1, backgroundColor: '#f2f2f2'}} contentContainerStyle={{flexGrow: 1}}>
                    <UserLoggedOutPanel />
                </ScrollView>
            );
        }
    }
}

export default HistoryList;
