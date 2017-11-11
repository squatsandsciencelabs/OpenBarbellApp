// TODO: refactor so that selectors are aware of the entire state path
// reason being that, the callers shouldn't know to make this state.sets
// right now only a few of them use the stateRoot
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';

const stateRoot = (state) => state.sets;

// Workout

// TODO: fix bug here because I'm no longer using set's end and start time
// apparently I used it for more than just rest timer fml

export const lastWorkoutRepTime = (state) => {
    // check if there's workout data
    var workoutData = stateRoot(state).workoutData;
    if (workoutData.length <= 0) {
        return null;
    }

    // check the current set for end time
    var currentSet = getWorkingSet(state);
    var endTime = SetTimeCalculator.endTime(currentSet);
    if (endTime !== null) {
        return endTime;
    }

    // check previous sets for end time
    if (workoutData.length > 1) {
        for (var i=workoutData.length-2; i>=0; i--) {
            var previousSet = workoutData[i];
            var endTime = SetTimeCalculator.endTime(previousSet);            
            if (endTime !== null) {
                return endTime;
            }
        }
    }

    // no end times found
    return null;
}

export const getWorkoutSets = (state) => {
    return stateRoot(state).workoutData;
};

export const getNumWorkoutSets = (state) => {
    return getWorkoutSets(state).length;
};

export const getIsWorkoutEmpty = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {
        // at least one set
        return false;
    } else if (workoutData.length === 1 && !SetEmptyCheck.isUntouched(workoutData[0])) {
        // only one set and it has data
        return false;
    }

    return true;
};

export const getExpandedWorkoutSet = (state, setID) => {
    return state.workoutData.find( set => set.setID == setID );
};

export const getNumWorkoutReps = (state) => {
    const sets = getWorkoutSets(state);
    var num_reps = 0;

    sets.forEach((set) => {
        if (set.reps) {
            num_reps += set.reps.length;
        }
    });

    return num_reps;
};

export const getNumWorkoutSetsWithFields = (state) => {
    const sets = getWorkoutSets(state);
    var num_sets_with_fields = 0;

    sets.forEach((set) => {
        if (!SetEmptyCheck.hasEmptyFields(set)) {
            num_sets_with_fields++;
        }
    });

    return num_sets_with_fields; 
};

export const getPercentWorkoutSetsWithFields = (state) => {
    const sets = getWorkoutSets(state);
    const numSetsFields = getNumWorkoutSetsWithFields(state);

    if (sets.length > 0) {
        return (numSetsFields/(sets.length)) * 100;
    } else {
        return 0;
    }
}

export const getWorkoutDuration = (state) => {
    const sets = getWorkoutSets(state);
    const startDate = SetTimeCalculator.startTime(sets[0]);

    if (startDate) {
        return DurationCalculator.getDurationBetween(startDate, Date.now());
    } else {
        return 0;
    }
};

export const getWorkingSet = (state) => {
    const sets = getWorkoutSets(state);
    if (sets && sets.length > 0) {
        return sets[sets.length - 1];
    }
    return null;
};

export const getIsWorkingSet = (state, setID) => {
    const currentSet = getWorkingSet(state);
    return setID === currentSet.setID;
};

export const getWorkoutPreviousSetHasEmptyReps = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {
        const prevSet = workoutData[workoutData.length - 2];
        if (prevSet) {
            return SetEmptyCheck.hasEmptyReps(prevSet);
        }
    }

    return false;
}

export const getIsPreviousWorkoutSetFilled = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {        
        const prevSet = workoutData[workoutData.length - 2];
        if (prevSet) {
            if(SetEmptyCheck.hasEmptyFields(prevSet)) {
                return 0;
            } else {
                return 1;
            }
        }
    }
    
    return -1;
};

// Dictionary to Array

const dictToArray = (dictionary) => {
    var array = [];
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property)) {
            array.push(dictionary[property]);
        }
    }
    return array;
};

// History

export const getHistorySetsChronological = (state) => {
    let sets = stateRoot(state);
    var array = dictToArray(sets.historyData);
    array.sort((set1, set2) => SetTimeCalculator.startTime(set1) - SetTimeCalculator.startTime(set2));
    return array;
};

export const getNumHistorySets = (state) => {
    let sets = stateRoot(state);
    var array = dictToArray(sets.historyData);
    return array.length;
};

export const getNumHistoryReps = (state) => {
    let sets = getHistorySetsChronological(state);

    var num_reps = 0;
    
    sets.forEach((set) => {
        if (set.reps) {
            num_reps += set.reps.length;
        }
    });
    
    return num_reps;    
};

const getHistoryWorkoutIDs = (state) => {
    let sets = getHistorySetsChronological(state);

    if (sets.length === 0) {
        return [];
    }
    
    let workoutIDs = [sets[0].workoutID];

    for (var i = 1; i < sets.length; i++) {
        if (sets[i].workoutID !== sets[i - 1].workoutID) {
            workoutIDs.push(sets[i].workoutID);
        }
    }

    return workoutIDs;
};

export const getNumHistoryWorkouts = (state) => {
    return getHistoryWorkoutIDs(state).length;
};

export const getExpandedHistorySet = (state, setID) => {
    var dictionary = stateRoot(state).historyData;
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property)) {
            let set = dictionary[property];
            if (set.setID === setID) {
                return set;
            }
        }
    }
    return null;
};

export const getTimeSinceLastWorkout = (state) => {
    const sets = getHistorySetsChronological(state);
    if (sets.length <= 0) {
        return null;
    } else {
        const lastSet = sets[sets.length-1];
        const startTime = Date.parse(SetTimeCalculator.startTime(lastSet));
        return Date.parse(Date.now()) - startTime;
    }
};

// Syncing

export const getSetsToUpload = (state) => {
    const root = stateRoot(state);
    return root.setIDsToUpload.map( setID => root.historyData[setID] );
};

export const getIsUploading = (state) => stateRoot(state).setIDsBeingUploaded.length > 0;

export const hasChangesToSync = (state) => {
    const root = stateRoot(state);
    return (root.setIDsToUpload.length > 0 || root.setIDsBeingUploaded.length > 0);
};

// collapsed metrics

export const getBestAvgVelocityEver = (state, set) => {
    let historySets = getHistorySetsChronological(state);

    // find all instances of this exercise with weight and reps
    let matchedSets = historySets.filter(historySet => historyFilter(historySet, set));

    let avgVs = matchedSets.map((matchedSet) => {
        return CollapsedMetrics.getAvgVelocities(matchedSet);
    });

    avgVs = avgVs.reduce((a, b) => a.concat(b), []);
    
    if (avgVs.length > 0) {
        return Math.max(...avgVs);
    } else {
        return null;
    }
};

export const getBestROMEver = (state, set) => {
    let historySets = getHistorySetsChronological(state);

    // find all instances of this exercise with weight and reps
    let matchedSets = historySets.filter(historySet => historyFilter(historySet, set));

    let roms = matchedSets.map((matchedSet) => {
        return CollapsedMetrics.getROMs(matchedSet);
    });

    roms = roms.reduce((a, b) => a.concat(b), []);
    
    if (roms.length > 0) {
        return Math.max(...roms);
    } else {
        return null;
    }
};

export const getBestPKVEver = (state, set) => {
    let historySets = getHistorySetsChronological(state);

    // find all instances of this exercise with weight and reps
    let matchedSets = historySets.filter(historySet => historyFilter(historySet, set));

    let pkvs = matchedSets.map((matchedSet) => {
        return CollapsedMetrics.getPKVs(matchedSet);
    });

    pkvs = pkvs.reduce((a, b) => a.concat(b), []);
    
    if (pkvs.length > 0) {
        return Math.max(...pkvs);
    } else {
        return null;
    }
};

export const getRevision = (state) => stateRoot(state).revision;

function historyFilter(historySet, set) {
    return historySet.exercise === set.exercise && historySet.weight === set.weight &&  historySet.metric === set.metric && historySet.reps.length === set.reps.length;
};
