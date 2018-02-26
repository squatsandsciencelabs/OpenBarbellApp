import React, {Component} from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    Platform,
} from 'react-native';

import OneRMEditSetFormScreen from './form/OneRMEditSetFormScreen';
import OneRMEditSetTitleScreen from './form/OneRMEditSetTitleScreen';
import OneRMEditSetExerciseScreen from './exercise_name/OneRMEditSetExerciseScreen';
import OneRMEditSetTagsScreen from './tags/OneRMEditSetTagsScreen';
import OneRMEditSetVideoButtonScreen from './form/OneRMEditSetVideoButtonScreen';
import OneRMEditSetVideoRecorderScreen from './camera/OneRMEditSetVideoRecorderScreen';
import OneRMEditSetVideoPlayerScreen from './video/OneRMEditSetVideoPlayerScreen';

import SetDataLabelRow from 'app/shared_features/set_card/expanded/SetDataLabelRow';
import SetDataRow from 'app/shared_features/set_card/expanded/SetDataRow';
import SetRestRow from 'app/shared_features/set_card/SetRestRow';
import SetAnalysisScreen from 'app/shared_features/set_card/analysis/SetAnalysisScreen';
import DeleteSetRow from 'app/shared_features/set_card/expanded/DeleteSetRow';
import RestoreSetRow from 'app/shared_features/set_card/restore/RestoreSetRow';

// TODO: add a close button on this shit
class OneRMEditSetView extends Component {

    // UPDATE

    shouldComponentUpdate(nextProps) {
        const differentSections = nextProps.sections !== this.props.sections;
        return differentSections;
    }

    // RENDER

    _renderNavigation() {
        if (Platform.OS === 'ios') {
            var statusBar = (<View style={{height: 20, width: 9001, backgroundColor: 'black'}}></View>);
        } else {
            var statusBar = null;
        }

        return (
            <View style={styles.container}>
                { statusBar }

                <View style={styles.navTitle}>
                    <Text style={{color: 'rgba(77, 77, 77, 1)', fontWeight: 'bold'}}>{this.props.title}</Text>
                </View>

                <View style={{position: 'absolute', left: 0, top: 0}}>
                    <TouchableOpacity onPress={() => this.props.dismissModal()}>
                        <View style={styles.nav}>
                            <Text style={[{color: 'rgba(47, 128, 237, 1)'}]}>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    _renderSectionHeader(section) {
        return (
            <View>
                <View style={{height:35, justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Text style={{color: 'rgba(77, 77, 77, 1)'}}>{section.key}</Text>
                </View>
            </View>
        );
    }

    _renderRow(section, index, item) {
        switch (item.type) {
            case 'restore':
                return (
                    <RestoreSetRow
                        tappedRestore={() => this.props.restoreSet(item.setID)}
                        exercise={item.exercise}
                        weight={item.weight}
                        metric={item.metric}
                        rpe={item.rpe}
                        numReps={item.numReps}
                        tags={item.tags}
                    />
                );
            case "title":
                return (<View style={{borderTopWidth: 1, borderColor: '#e0e0e0'}}>
                            <OneRMEditSetTitleScreen
                                setID={item.setID}
                                exercise={item.exercise}
                                removed={item.removed}
                                setNumber={item.setNumber}
                                isCollapsable={false} />
                        </View>);
            case "analysis":
                return (
                    <SetAnalysisScreen set={item.set} />
                );
            case "form":
                // note: on focus will avoid the Redux store for simplicity and just do it through the callback function
                // technically an action to scroll should be application state and therefore should go through the global store
                return (<View style={{backgroundColor: 'white'}}>
                            <OneRMEditSetFormScreen
                                setID={item.setID}
                                initialStartTime={item.initialStartTime}
                                removed={item.removed}
                                tags={item.tags}
                                weight={item.weight}
                                metric={item.metric}
                                rpe={item.rpe}
                                renderDetailComponent={()=> {
                                    if (item.videoFileURL !== null && item.videoFileURL !== undefined) {
                                        return (<OneRMEditSetVideoButtonScreen setID={item.setID} mode='watch' videoFileURL={item.videoFileURL} />);
                                    } else {
                                        return (<OneRMEditSetVideoButtonScreen setID={item.setID} mode='commentary' />);
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
                        />);
            case "rest":
                return (<SetRestRow item={item} />);
            case "delete":
                return (
                    <DeleteSetRow onPressDelete={() => this.props.deleteSet(item.setID)} />
                );
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
                renderItem={({item, index, section}) => this._renderRow(section, index, item)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section) }
                sections={this.props.sections}
                getItemLayout={(data, index) => {
                    return { length: 500, offset: 53 * index, index: index };
                }}
                style = {{padding: 10, backgroundColor: '#f2f2f2'}}
            />);
        }
        return (
            <Modal visible={this.props.isModalShowing} animationType='fade'>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                    <OneRMEditSetExerciseScreen />
                    <OneRMEditSetTagsScreen />
                    <OneRMEditSetVideoRecorderScreen />
                    <OneRMEditSetVideoPlayerScreen />

                    {this._renderNavigation()}
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {list}
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 70 : 50,
        alignItems: 'center',
        borderColor: '#e0e0e0',
        borderBottomWidth: 1,
    },
    nav: {
        paddingTop: Platform.OS === 'ios' ? 35 : 15,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10
    },
    navTitle: {
        paddingTop: 15,
    },
});

export default OneRMEditSetView;
