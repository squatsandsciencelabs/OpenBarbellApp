import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/DateUtils';
import * as RepDataMap from 'app/utility/RepDataMap';
import * as SetUtils from 'app/utility/SetUtils';
import * as DurationCalculator from 'app/utility/DurationCalculator'
import WorkoutList from './WorkoutList';
import * as Actions from './WorkoutActions';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as WorkoutCollapsedSelectors from 'app/redux/selectors/WorkoutCollapsedSelectors';

// assumes chronological sets
const createViewModels = (state, sets) => {
    // declare variables
    let section = { key: 1, data: [], isLast: true }; // contains the actual data
    let sections = [section]; // the return value
    let lastExerciseName = null; // to help calculate set numbers
    let setNumber = 1; // set number to display
    let lastSetEndTime = null; // to help calculate rest time
    let isInitialSet = true; // to help determine when to display rest time and split up the sections properly
    let count = 0;
    let isLastSet = false; // to set up the live set footer
    let isCollapsed = false;
    let isRemoved = false;

    // build view models
    sets.map((set) => {
        // last section check, splitting the "current set" out for footer purposes
        // TODO: depending on design for "finish current set", can put all the data in one section instead
        if (count === sets.length-1) {
            section = { key: 0, data: [], position: -1, isLast: false };
            sections.splice(0, 0, section); // insert at beginning
            isLastSet = true;
        }

        // set card data
        let array = [0, 0];

        // set state booleans
        isCollapsed = isLastSet ? false : WorkoutCollapsedSelectors.getIsCollapsed(state, set.setID);
        isRemoved = SetUtils.isEmpty(set);

        // card header
        if (isInitialSet) {
            lastExerciseName = null;
            setNumber = 1;
        } else if (!isRemoved) {
            if (lastExerciseName !== null && lastExerciseName === set.exercise) {
                setNumber++;
            } else {
                setNumber = 1;
            }
        }
        if (isLastSet) {
            array.push({type: 'working set header', key: set.setID+'end set timer'});
        } else {
            array.push(createTopBorder(set));
        }
        array.push(createTitleViewModel(state, set, setNumber, lastExerciseName, isLastSet, isRemoved, isCollapsed));
        if (!isCollapsed) {
            array.push(createFormViewModel(set, setNumber, isRemoved));
            if (!isRemoved) {
                array.push(createAnalysisViewModel(set));
            }
            if (set.reps.length > 0) {
                array.push({type: "subheader", key: set.setID+"subheader"});
            }
        } else if (!isRemoved) {
            array.push(createSummaryViewModel(set));
            array.push(createAnalysisViewModel(set));
        } 
        lastExerciseName = set.exercise;

        // reps
        if (!isCollapsed) {
            Array.prototype.push.apply(array, createRowViewModels(set));
        }

        // rest footer
        if (isInitialSet) {
            // new set, reset the end time
            lastSetEndTime = isRemoved ? null : SetTimeCalculator.endTime(set);

            if (isLastSet) {
                array.push(createBottomBorder(set));
            } else if (!isLastSet && !isCollapsed && !isRemoved) {
                // new set, reset the end time
                lastSetEndTime = isRemoved ? null : SetTimeCalculator.endTime(set);
                array.push(createDeleteFooter(set));
                array.push(createBottomBorder(set));
            } else if (!isLastSet && !isCollapsed && isRemoved) {
                // new set, reset the end time
                lastSetEndTime = isRemoved ? null : SetTimeCalculator.endTime(set);
                array.push(createRestoreFooter(set));
                array.push(createBottomBorder(set));                
            } else {
                array.push(createBottomBorder(set));
            }
        } else if (!isRemoved && set.reps.length > 0) { // ignore removed sets in rest calculations
            // add footer if valid
            if (lastSetEndTime !== null) {
                if (isCollapsed) {
                    array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
                } else {
                    array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
                    array.push(createDeleteFooter(set));
                }    
            } else {
                if (!isCollapsed) {
                    array.push(createDeleteFooter(set));
                    array.push(createBottomBorder(set));
                } else {
                    array.push(createBottomBorder(set));
                }
            }

            // update variable for calculation purposes
            lastSetEndTime = SetTimeCalculator.endTime(set);
        }  else if (isRemoved && !SetEmptyCheck.hasEmptyFields(set)) {
            // add footer if valid
            if (lastSetEndTime !== null) {
                if (isCollapsed) {
                    array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
                } else {
                    array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
                    array.push(createRestoreFooter(set));
                }    
            } else {
                if (!isCollapsed) {
                    array.push(createRestoreFooter(set));
                    array.push(createBottomBorder(set));
                } else {
                    array.push(createBottomBorder(set));
                }
            }            
        } else if (isLastSet && lastSetEndTime !== null && set.reps.length === 0) {
            // working set, live rest mode
            array.push(createWorkingSetFooterVM(set, lastSetEndTime));
        } else if (isLastSet && !lastSetEndTime && set.reps.length === 0) {
            array.push(createBottomBorder(set));
        } else if (!isLastSet) {
            if (!isCollapsed && !isRemoved) {
                array.push(createDeleteFooter(set));
                array.push(createBottomBorder(set));
            } else {
                array.push(createBottomBorder(set));
            }
        } 

        // insert set card data
        Array.prototype.splice.apply(section.data, array);

        // increment and reset
        isInitialSet = false;
        count++;
    });

    // add positions
    for (var i = 0; i < sections.length; i++) {
        sections[i].position = i;
    }

    // return
    return sections;
}

const createTopBorder = (set) => ({
    type: "top border",
    key: set.setID + 'topborder',
});

const createTitleViewModel = (state, set, setNumber, bias=null, isLastSet=false, isRemoved=false, isCollapsed=false) => ({
    type: 'title',
    key: set.setID+'title',
    setNumber: setNumber,
    exercise: set.exercise,
    setID: set.setID,
    removed: isRemoved,
    isWorkingSet: isLastSet,
    bias: bias,
    isCollapsed: isCollapsed,
    videoFileURL: set.videoFileURL,
});

const createFormViewModel = (set, setNumber, isRemoved) => ({
    type: 'form',
    key: set.setID+'form',
    setID: set.setID,
    removed: isRemoved,
    setNumber: setNumber,
    exercise: set.exercise,
    tags: set.tags,
    weight: set.weight,
    metric: set.metric,
    rpe: set.rpe,
    videoFileURL: set.videoFileURL,
    videoType: set.videoType,
});

const createSummaryViewModel = (set) => {
    const numReps = SetUtils.numValidUnremovedReps(set);
    return {
        type: 'summary',
        key: set.setID+'summary',
        weight: set.weight ? set.weight : 0,
        numReps: numReps ? numReps : '0 reps',
        metric: set.metric,
        tags: set.tags,
        removed: set.removed,
    };
};

const createAnalysisViewModel = (set) => ({
    type: 'analysis',
    key: set.setID+'analysis',
    set: set,
});

const createRowViewModels = (set) => {
    let array = [];

    for (let i=0, repCount=0; i<set.reps.length; i++) {
        // get rep
        let rep = set.reps[i];

        // increment rep count
        repCount++;

        // obv1 properties
        let vm = {
            type: "data",
            rep: i,
            repDisplay: repCount,
            setID: set.setID,
            averageVelocity: "Invalid",
            peakVelocity: "Invalid",
            peakVelocityLocation: "Invalid",
            rangeOfMotion: "Invalid",
            duration: "Invalid",
            removed: rep.removed,
            key: set.setID+i,
        };

        // update data if valid
        if (rep.isValid == true) {
            let repData = rep.data;

            let avgVel = RepDataMap.averageVelocity(repData);
            if (avgVel !== null) {
                vm.averageVelocity = avgVel;
            }

            let peakVel = RepDataMap.peakVelocity(repData);
            if (peakVel !== null) {
                vm.peakVelocity = peakVel;
            }

            let peakVelLoc = RepDataMap.peakVelocityLocation(repData);
            if (peakVelLoc !== null) {
                vm.peakVelocityLocation = peakVelLoc;
            }

            let rom = RepDataMap.rangeOfMotion(repData);
            if (rom !== null) {
                vm.rangeOfMotion = rom;
            }

            // obv2 properties
            let duration = RepDataMap.durationOfLift(repData)
            if (duration !== null) {
                vm.duration = DurationCalculator.displayDuration(duration);
            } else {
                vm.duration = "obv2 only";
            }
        }

        //add obj
        array.splice(0, 0, vm); // insert at beginning
    }

    // return
    return array;
};

const createWorkingSetFooterVM = (set, restStartTime) => {
    let footerVM = {
        type: "working set footer",
        restStartTimeMS: (new Date(restStartTime)).getTime(),
        key: set.setID + 'live rest'
    };
    return footerVM;
};

const createFooterVM = (set, lastSetEndTime, isCollapsed) => {
    let restInMS = new Date(SetUtils.startTime(set)) - new Date(lastSetEndTime);
    let footerVM = {
        type: "footer",
        rest: DateUtils.restInSentenceFormat(restInMS),
        key: set.setID + 'rest',
        isCollapsed: isCollapsed,
    };
    return footerVM;
};

const createDeleteFooter = (set) => ({
    type: "delete footer",
    key: set.setID + "deleteSet",
    setID: set.setID,
    removed: set.removed,
});

const createRestoreFooter = (set) => ({
    type: "restore footer",
    key: set.setID + "restoreSet",
    setID: set.setID,
});

const createBottomBorder = (set) => ({
    type: "bottom border",
    key: set.setID + 'bottomborder',
});

const mapStateToProps = (state) => {
    let sets = SetsSelectors.getWorkoutSets(state);
    if (sets.length === 0) {
        var isAddEnabled = false;
    } else {
        var isAddEnabled = !SetUtils.isUntouched(sets[sets.length-1]);
    }

    return {
        sections: createViewModels(state, sets),
        sets: sets,
        isAddEnabled: isAddEnabled
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteSet: Actions.deleteSet,
        restoreSet: Actions.restoreSet,
        endSet: Actions.endSet,
        removeRep: Actions.removeRep,
        restoreRep: Actions.restoreRep,
        tapCard: Actions.presentExpanded,
        getDefaultMetric: SetsActionCreators.getDefaultMetric
    }, dispatch);
};

const WorkoutScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutList);

export default WorkoutScreen;
