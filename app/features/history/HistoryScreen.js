// TODO: use selectors to cache things rather than doing the manual caching by hand that I do here

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as Actions from './HistoryActions';
import HistoryList from './HistoryList';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as HistoryCollapsedSelectors from 'app/redux/selectors/HistoryCollapsedSelectors';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

// NOTE: this means that every history screen accesses previous values as singletons
var storedSections = null; // the actual data
var storedHistoryData = null; // for comparison purposes
var storedHistoryCollapsed = null;
var storedHistorySets = null; // to remove the need to fetch the sets again in chronological order
var storedShouldShowRemoved = null; // for comparison purposes

// assumes chronological sets
const createViewModels = (state, sets, shouldShowRemoved) => {
    // declare variables
    let sections = []; // the return value
    let section = null; // contains the actual data
    let lastWorkoutID = null; // to help calculate sections
    let lastExerciseName = null; // to help calculate set numbers
    let setNumber = 1; // set number to display
    let workoutStartTime = null; // to help calculate rest time and display section header
    let lastSetEndTime = null; // to help calculate rest time
    let isInitialSet = false; // to help determine when to display rest time
    let isCollapsed = false;
    let isRemoved = false;
    
    // ignore if initialStartTime is null as that was a bug, it's supposed to be undefined or an actual date
    sets = sets.filter((set) => set.initialStartTime !== null);

    // build view models
    for (let i=0; i<sets.length; i++) {
        // get set
        let set = sets[i];
        let rpe = String(sets[i].rpe);

        if (set.rpe) {
            set.rpe = rpe;
        } else {
            set.rpe = "";
        }

        // ignore completely empty set
        if (!shouldShowRemoved && SetEmptyCheck.isEmpty(set)) {
            continue;
        }

        // every workout is a section
        if (lastWorkoutID !== set.workoutID) {
            // set vars
            lastWorkoutID = set.workoutID;
            workoutStartTime = SetTimeCalculator.startTime(set);
            isInitialSet = true;

            // create section
            section = { key: new Date(workoutStartTime).toLocaleString(), data: [], position: -1 };
            sections.splice(0, 0, section); // insert at beginning
        } else {
            isInitialSet = false;
        }

        // set card data
        let array = [0, 0];

        // set state booleans
        isCollapsed = HistoryCollapsedSelectors.getIsCollapsed(state, set.setID);
        isRemoved = SetEmptyCheck.isEmpty(set);

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

        array.push(createTitleViewModel(state, set, setNumber, isRemoved, isCollapsed));
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
            Array.prototype.push.apply(array, createRowViewModels(set, shouldShowRemoved));
        }

        // rest footer
        if (isInitialSet) {
            // new set, reset the end time
            lastSetEndTime = isRemoved ? null : SetTimeCalculator.endTime(set);
            array.push(createBottomBorder(set));
        } else if (!isRemoved && set.reps.length > 0) { // ignore removed sets in rest calculations
            // add footer if valid
            if (lastSetEndTime !== null) {
                array.push(createFooterVM(set, lastSetEndTime, isCollapsed));
            } else {
                array.push(createBottomBorder(set));
            }

            // update variable for calculation purposes
            lastSetEndTime = SetTimeCalculator.endTime(set);
        } else {
            array.push(createBottomBorder(set));
        }

        // insert set card data
        Array.prototype.splice.apply(section.data, array);
    }

    // add positions
    for (var i = 0; i < sections.length; i++) {
        sections[i].position = i;
    }

    // return
    return sections;
}

const createTitleViewModel = (state, set, setNumber, isRemoved=false, isCollapsed=false) => ({
    type: 'title',
    key: set.setID+'title',
    setNumber: setNumber,
    exercise: set.exercise,
    setID: set.setID,
    isCollapsed: isCollapsed,
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

const createRowViewModels = (set, shouldShowRemoved) => {
    let array = [];

    for (let i=0, repCount=0; i<set.reps.length; i++) {
        // get rep
        let rep = set.reps[i];

        // ignore deleted rows if necessary
        if (shouldShowRemoved === false && rep.removed === true) {
            continue;
        }

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

const createFooterVM = (set, lastSetEndTime, isCollapsed) => {
    let restInMS = new Date(SetTimeCalculator.startTime(set)) - new Date(lastSetEndTime);
    let footerVM = {
        type: "footer",
        rest: DateUtils.restInSentenceFormat(restInMS),
        key: set.setID + 'rest',
        isCollapsed: isCollapsed
    };
    return footerVM;
};

const createBottomBorder = (set) => ({
    type: "bottom border",
    key: set.setID + 'bottomborder',
});

// TODO: use reselect instead perhaps?
const mapStateToProps = (state) => {
    // declare vars
    let shouldShowRemoved = SettingsSelectors.getShowRemoved(state);
    let historyData = state.sets.historyData;
    let historyCollapsed = HistoryCollapsedSelectors.getCollapsedModel(state);
    let rebuildViewModels = false;

    // determine rebuilding of viewmodels
    if (historyData !== storedHistoryData) {
        // data changed, redo it all
        storedHistoryData = historyData;
        storedHistorySets = SetsSelectors.getHistorySetsChronological(state);
        rebuildViewModels = true;
    } else if (shouldShowRemoved !== storedShouldShowRemoved) {
        // toggled with no data changed, just rebuild viewmodels
        rebuildViewModels = true;
    }
    if (historyCollapsed !== storedHistoryCollapsed) {
        // toggled with no data changed, rebuild vms and save
        storedHistoryCollapsed = historyCollapsed;
        rebuildViewModels = true;
    }

    // rebuild if needed
    if (rebuildViewModels) {
        storedSections = createViewModels(state, storedHistorySets, shouldShowRemoved);
        storedShouldShowRemoved = shouldShowRemoved;
    }

    return {
        email: state.auth.email,
        sections: storedSections,
        shouldShowRemoved: shouldShowRemoved
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        removeRep: Actions.removeRep,
        restoreRep: Actions.restoreRep,
        finishLoading: Actions.finishLoading,
        tapCard: Actions.presentExpanded
    }, dispatch);
};

const HistoryScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryList);

export default HistoryScreen;
