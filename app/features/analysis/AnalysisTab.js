import React, {Component} from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
    SectionList,
    Dimensions,
    ListItem
} from 'react-native';

import OneRMScreen from './cards/OneRM/OneRMScreen';

import WorkoutBottomBarScreen from '../workout/bottom_bar/WorkoutBottomBarScreen';
import EditWorkoutTitleExpandedScreen from '../workout/card/expanded/title/EditWorkoutTitleExpandedScreen';
import EditWorkoutTitleCollapsedScreen from '../workout/card/collapsed/EditWorkoutTitleCollapsedScreen';
import EditWorkoutSetFormScreen from '../workout/card/expanded/form/EditWorkoutSetFormScreen';
import EditWorkoutExerciseScreen from '../workout/exercise_name/EditWorkoutExerciseScreen';
import EditWorkoutTagsScreen from '../workout/tags/EditWorkoutTagsScreen';
import SetDataLabelRow from 'app/shared_features/set_card/expanded/SetDataLabelRow';
import SetDataRow from 'app/shared_features/set_card/expanded/SetDataRow';
import SetRestRow from 'app/shared_features/set_card/SetRestRow';
import LiveRestRow from 'app/shared_features/set_card/expanded/LiveRestRow';
import WorkoutVideoButtonScreen from '../workout/card/expanded/form/WorkoutVideoButtonScreen';
import WorkoutVideoRecorderScreen from '../workout/camera/WorkoutVideoRecorderScreen';
import WorkoutVideoPlayerScreen from '../workout/video/WorkoutVideoPlayerScreen';
import ListLoadingFooter from '../history/loading/ListLoadingFooter';
import TimerProgressBarScreen from 'app/features/workout/card/expanded/TimerProgressBarScreen';
import SetSummary from 'app/shared_features/set_card/collapsed/SetSummary';
import SetAnalysisScreen from 'app/shared_features/set_card/analysis/SetAnalysisScreen';

class AnalysisTab extends Component {
    shouldComponentUpdate(nextProps) {
        const differentShowRemoved = nextProps.shouldShowRemoved !== this.props.shouldShowRemoved;
        const differentSections = nextProps.sections !== this.props.sections;
        return differentShowRemoved || differentSections;
    }

    // RENDER

    _renderSectionHeader(section) {
        let sets = this.props.sets;
        let currentSetIndex = (this.props.sets.length) - 1;
        let set = sets[currentSetIndex];
    }

    _renderSectionFooter(section) {
        if (section.key !== 0) {
            return <ListLoadingFooter isLargeFooter={section.isLast} />
        }
    }

    _renderRow(section, index, item) {
        switch (item.type) {
            case "title":
                if (!item.isCollapsed) {
                    return (<View>
                                <EditWorkoutTitleExpandedScreen
                                    setID={item.setID}
                                    exercise={item.exercise}
                                    bias={item.bias}
                                    removed={item.removed}
                                    setNumber={item.setNumber}
                                    isCollapsable={!item.isWorkingSet} />
                            </View>);
                } else {
                    return (<View>
                                <EditWorkoutTitleCollapsedScreen
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
                    <SetAnalysisScreen set={item.set}/>
                );
            case "form":
                return (<View style={{backgroundColor: 'white'}}>
                            <EditWorkoutSetFormScreen
                                setID={item.setID}
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
                                        return (<WorkoutVideoButtonScreen setID={item.setID} mode='watch' videoFileURL={item.videoFileURL} />);
                                    } else if (section.position === 0) {
                                        return (<WorkoutVideoButtonScreen setID={item.setID} mode='record' />);
                                    } else {
                                        return (<WorkoutVideoButtonScreen setID={item.setID} mode='commentary' />);
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
            case "working set header":
                return (
                    <View style={{marginTop: 15}}>
                        <TimerProgressBarScreen />
                    </View>
                );
            case "top border":
                return (<View style={{flex: 1, backgroundColor: '#e0e0e0', height: 1}} />);
            case "bottom border":
                return (<View style={{flex: 1, backgroundColor: '#e0e0e0', height: 1, marginBottom: 15}} />);
            case "working set footer":
                return (
                    <View style={{marginBottom: 15}}>
                        <LiveRestRow restStartTimeMS={item.restStartTimeMS} />
                    </View>);
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
                renderItem={({section, index, item}) => this._renderRow(section, index, item)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                renderSectionFooter={({section}) => this._renderSectionFooter(section)}
                sections={this.props.sections}
                style = {{padding: 10, backgroundColor: '#f2f2f2'}}
            />);
        }

        return (
            <ScrollView style={{flex: 1}}>
                <OneRMScreen />
                
                <View style={{ flex: 1 }}>
                    {list}
                </View>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeaderText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        left: 0,
    },
    button: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderColor: 'rgba(47, 128, 237, 1)',        
        borderWidth: 5,
        borderRadius: 15,
    },
    disabledButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        borderColor: 'rgba(47, 128, 237, 1)',        
        borderWidth: 5,
        borderRadius: 15,
        opacity: 0.3
    },
    buttonText: {
        color: 'white',
        padding: 5,
        textAlign: 'center'
    },
    Shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 0
        },
    },
    rowText: {
        fontSize:20,
        paddingTop:5,
    },
});

export default AnalysisTab;
