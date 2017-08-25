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

import EditWorkoutSetFormScreen from './card/EditWorkoutSetFormScreen';
import EditWorkoutExerciseScreen from './exercise_name/EditWorkoutExerciseScreen';
import EditWorkoutTagsScreen from './tags/EditWorkoutTagsScreen';
import WorkoutSetExpandedScreen from './expanded/WorkoutSetExpandedScreen';
import SetDataLabelRow from 'app/shared_features/set_card/SetDataLabelRow';
import SetDataRow from 'app/shared_features/set_card/SetDataRow';
import SetRestRow from 'app/shared_features/set_card/SetRestRow';

class WorkoutList extends Component {

    // UPDATE

    shouldComponentUpdate(nextProps) {
        const differentShowRemoved = nextProps.shouldShowRemoved !== this.props.shouldShowRemoved;
        const differentSections = nextProps.sections !== this.props.sections;
        return differentShowRemoved || differentSections;
    }

    // RENDER

    _renderSectionHeader(section) {
        if (section.key === 0) {
            // end workout
            return (
                <TouchableHighlight onPress={ () => this.props.endWorkout() }>
                    <Text style={[styles.blueButton, styles.Shadow, { textAlign: 'center'}]}>End Workout</Text>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }

    _renderSectionFooter(section) {
        if (section.key === 0) {
            return (
                <TouchableHighlight onPress={ () => this.props.endSet() }>
                    <Text style={[styles.blueButton, styles.Shadow, { textAlign: 'center'}]}>Finish Current Set</Text>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }

    _renderRow(section, index, item) {
        switch (item.type) {
            case "header":
                return (<View style={{marginTop: 15}}>
                            <EditWorkoutSetFormScreen
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
                renderItem={({section, index, item}) => this._renderRow(section, index, item)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section) }
                renderSectionFooter={({section}) => this._renderSectionFooter(section) }
                sections={this.props.sections}
                style = {{padding: 10, backgroundColor: 'white'}}
            />);
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <EditWorkoutExerciseScreen />
                <EditWorkoutTagsScreen />
                <WorkoutSetExpandedScreen />

                <View style={{ flex: 1 }}>
                    {list}
                </View>

            </View>
        );
    }
}

//NOTE: currently container names reference the React Native flexDirection which imo is confusing
const styles = StyleSheet.create({
    sectionHeaderText: {
        fontFamily: 'AvenirNext-Medium',
        fontSize: 16,
        left: 0,
    },
    blueButton: {
        backgroundColor: 'rgba(47, 128, 237, 1)',
        color: 'white',
        padding: 5
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

export default WorkoutList;
