// TODO: use selectors to cache things rather than doing the manual caching by hand that I do here

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './OneRMEditSetActions';
import OneRMEditSetView from './OneRMEditSetView';

import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/DateUtils';
import * as RepDataMap from 'app/utility/RepDataMap';
import * as SetUtils from 'app/utility/SetUtils';
import * as DurationCalculator from 'app/utility/DurationCalculator';

// assumes chronological sets
const createViewModels = (state, sets, setID) => {
    // declare variables
    let sections = []; // the return value
    let section = null; // contains the actual data
    let lastExerciseName = null; // to help calculate set numbers
    let setNumber = 1; // set number to display
    let workoutStartTime = null; // to help calculate rest time and display section header
    let lastSetEndTime = null; // to help calculate rest time
    let isInitialSet = false; // to help determine when to display rest time
    let isRemoved = false;
    
    // ignore if initialStartTime is null as that was a bug, it's supposed to be undefined or an actual date
    sets = sets.filter((set) => set.initialStartTime !== null);

    // build view models
    for (let i=0; i<sets.length; i++) {
        // get set
        let set = sets[i];
        let rpe = String(sets[i].rpe);

        // ignore completely empty set
        if (SetUtils.isEmpty(set)) {
            continue;
        }

        // setup based on first actual set
        if (!workoutStartTime) {
            workoutStartTime = SetUtils.startTime(set);
            section = { key: new Date(workoutStartTime).toLocaleString(), data: [], position: 0 };
            sections.push(section);
            isInitialSet = true;
        } else {
            isInitialSet = false;
        }

        // set num and last exercise
        isRemoved = SetUtils.isEmpty(set);
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
        lastExerciseName = set.exercise;

        // model for actual set
        if (set.setID === setID) {
            // set card data
            let array = [0, 0];

            // rpe null check
            if (set.rpe) {
                set.rpe = String(set.rpe);
            } else {
                set.rpe = "";
            }

            // card views
            array.push(createTitleViewModel(state, set, setNumber, isRemoved, false));
            array.push(createFormViewModel(set, setNumber, isRemoved));
            array.push(createAnalysisViewModel(set));
            if (set.reps.length > 0) {
                array.push({type: "subheader", key: set.setID+"subheader"});
            }
            Array.prototype.push.apply(array, createRowViewModels(set));
            if (!isInitialSet && SetUtils.hasUnremovedRep(set) && lastSetEndTime != null) {
                array.push(createFooterVM(set, lastSetEndTime));
            } else {
                array.push(createBottomBorder(set));
            }

            // add and return
            Array.prototype.splice.apply(section.data, array);
            return sections;
        }

        // last set end time
        if (isInitialSet) {
            // new set, reset the end time
            lastSetEndTime = isRemoved ? null : SetUtils.endTime(set);
        } else if (SetUtils.hasUnremovedRep(set)) { // ignore removed sets in rest calculations
            // update variable for calculation purposes
            lastSetEndTime = SetUtils.endTime(set);
        }
    }

    // cannot find the set in question, should be impossible
    // TODO: error this
    return null;
}

const createTitleViewModel = (state, set, setNumber, isRemoved=false) => ({
    type: 'title',
    key: set.setID+'title',
    setNumber: setNumber,
    exercise: set.exercise,
    setID: set.setID,
    isCollapsed: false,
    removed: isRemoved,
    videoFileURL: set.videoFileURL,
});

const createFormViewModel = (set, setNumber, isRemoved) => ({
    type: 'form',
    key: set.setID+'form',
    setID: set.setID,
    initialStartTime: set.initialStartTime,
    removed: isRemoved,
    setNumber: setNumber,
    exercise: set.exercise,
    tags: set.tags ? set.tags.map((tag) => tag.toLowerCase()) : [],
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
        tags: set.tags ? set.tags.map((tag) => tag.toLowerCase()) : [],
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
        array.push(vm);
    }

    // return
    return array;
};

const createFooterVM = (set, lastSetEndTime) => {
    let restInMS = new Date(SetUtils.startTime(set)) - new Date(lastSetEndTime);
    let footerVM = {
        type: "footer",
        rest: DateUtils.restInSentenceFormat(restInMS),
        key: set.setID + 'rest',
        isCollapsed: false,
    };
    return footerVM;
};

const createBottomBorder = (set) => ({
    type: "bottom border",
    key: set.setID + 'bottomborder',
});

const mapStateToProps = (state) => {
    const setID = AnalysisSelectors.getSetID(state);
    const workoutID = AnalysisSelectors.getWorkoutID(state);
    if (setID && workoutID) {
        const sets = SetsSelectors.getAnalysisWorkoutSetsChronological(state, workoutID);
        const sections = createViewModels(state, sets, setID);

        return {
            setID: setID,
            sections: sections,
            isModalShowing: true,
        };
    } else {
        return {
            setID: null,
            sections: [],
            isModalShowing: false,
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeRep: Actions.removeRep,
        restoreRep: Actions.restoreRep,
        dismissModal: Actions.dismissEditSet,
    }, dispatch);
};

const OneRMEditSetScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneRMEditSetView);

export default OneRMEditSetScreen;
