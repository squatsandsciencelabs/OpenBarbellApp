import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator'

import WorkoutList from './WorkoutList';
import * as Actions from './WorkoutActions';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
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

        // set collapsed state
        isCollapsed = isLastSet ? false : WorkoutCollapsedSelectors.getIsCollapsed(state, set.setID);

        // card header
        if (isInitialSet) {
            lastExerciseName = null;
            setNumber = 1;
        } else if (!set.removed) {
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
        array.push(createTitleViewModel(state, set, setNumber, lastExerciseName, isLastSet, isCollapsed));
        if (!isCollapsed) {
            array.push(createFormViewModel(set, setNumber));
            array.push(createAnalysisViewModel(set));
            if (set.reps.length > 0) {
                array.push({type: "subheader", key: set.setID+"subheader"});
            }
        } else {
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
            lastSetEndTime = set.removed ? null : SetTimeCalculator.endTime(set);
            array.push(createBottomBorder(set));
        } else if (!set.removed && set.reps.length > 0) { // ignore removed sets in rest calculations
            // add footer if valid
            if (lastSetEndTime !== null) {
                array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
            } else {
                array.push(createBottomBorder(set));
            }

            // update variable for calculation purposes
            lastSetEndTime = SetTimeCalculator.endTime(set);
        } else if (isLastSet && lastSetEndTime !== null && set.reps.length === 0) {
            // working set, live rest mode
            array.push(createWorkingSetFooterVM(set, lastSetEndTime));
        } else {
            array.push(createBottomBorder(set));
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

const createTitleViewModel = (state, set, setNumber, bias=null, isLastSet=false, isCollapsed=false) => ({
    type: 'title',
    key: set.setID+'title',
    setNumber: setNumber,
    exercise: set.exercise,
    setID: set.setID,
    isWorkingSet: isLastSet,
    bias: bias,
    isCollapsed: isCollapsed,
    videoFileURL: set.videoFileURL,
});

const createFormViewModel = (set, setNumber) => ({
    type: 'form',
    key: set.setID+'form',
    setID: set.setID,
    removed: set.removed,
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
    const numReps = SetEmptyCheck.numValidUnremovedReps(set);
    return {
        type: 'summary',
        key: set.setID+'summary',
        weight: set.weight ? set.weight : 0,
        numReps: numReps ? numReps : '0 reps',
        metric: set.metric,
        tags: set.tags,
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
    let restInMS = new Date(SetTimeCalculator.startTime(set)) - new Date(lastSetEndTime);
    let footerVM = {
        type: "footer",
        rest: DateUtils.restInSentenceFormat(restInMS),
        key: set.setID + 'rest',
        isCollapsed: isCollapsed,
    };
    return footerVM;
};
const createBottomBorder = (set) => ({
    type: "bottom border",
    key: set.setID + 'bottomborder',
});

const mapStateToProps = (state) => {
    let sets = SetsSelectors.getWorkoutSets(state);
    if (sets.length === 0) {
        var isAddEnabled = false;
    } else {
        var isAddEnabled = !SetEmptyCheck.isUntouched(sets[sets.length-1]);
    }

    return {
        sections: createViewModels(state, sets),
        sets: sets,
        isAddEnabled: isAddEnabled
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
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
