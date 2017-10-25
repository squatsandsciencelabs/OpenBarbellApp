// TODO: refactor so that selectors are aware of the entire state path
// reason being that, the callers shouldn't know to make this state.sets
// right now only a few of them use the stateRoot
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

const stateRoot = (state) => state.sets;

// Get revision

export const getRevision = (state) => stateRoot(state).revision;

// Get last rep time

// TODO: fix bug here because I'm no longer using set's end and start time
// apparently I used it for more than just rest timer fml

export const lastRepTime = (state) => {
    // check if there's workout data
    var workoutData = stateRoot(state).workoutData;
    if (workoutData.length <= 0) {
        return null;
    }

    // check the current set for end time
    var currentSet = workoutData[workoutData.length-1];
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

// Get Workout Sets

export const getWorkoutSets = (state) => {
    return stateRoot(state).workoutData;
};

export const getNumWorkoutSets = (state) => {
    return getWorkoutSets(state).length;
};

// Get Is Workout Empty

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

// Get Expanded Workout Set

export const getExpandedWorkoutSet = (state, setID) => {
    return state.workoutData.find( set => set.setID == setID );
};

// Get previous set

export const getPreviousSetHasEmptyReps = (state) => {
    const workoutData = stateRoot(state).workoutData;
    const prevSet = workoutData[workoutData.length - 2];
    
    if (prevSet) {
        return SetEmptyCheck.hasEmptyReps(prevSet);
    } else {
        return false;
    }
}

export const getIsPreviousSetFilled = (state) => {
    const workoutData = stateRoot(state).workoutData;    

    const prevSet = workoutData[workoutData.length - 2];

    if (prevSet) {
        if(SetEmptyCheck.isEmpty(prevSet)) {
            var is_previous_set_filled = 0;
        } else {
            var is_previous_set_filled = 1;
        }
    } else {
        var is_previous_set_filled = -1;
    }  
    
    return is_previous_set_filled;
}

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

// Get History Sets

export const getHistorySetsChronological = (state) => {
    let sets = stateRoot(state);
    var array = dictToArray(sets.historyData);
    array.sort((set1, set2) => new Date(set1.startTime) - new Date(set2.startTime));
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
}

export const getHistoryWorkoutIDs = (state) => {
    let sets = getHistorySetsChronological(state);
    
    let workoutIDs = [sets[0].workoutID];

    for (var i = 1; i < sets.length; i++) {
        if (sets[i].workoutID !== sets[i - 1].workoutID) {
            workoutIDs.push(sets[i].workoutID);
        }
    }

    return workoutIDs;
}

export const getNumHistoryWorkouts = (state) => {
    return getHistoryWorkoutIDs(state).length;
};

// Get Expanded History Set

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

// Get Sets To Upload
export const getSetsToUpload = (state) => {
    const root = stateRoot(state);
    return root.setIDsToUpload.map( setID => root.historyData[setID] );
};

// Get is uploading
export const getIsUploading = (state) => stateRoot(state).setIDsBeingUploaded.length > 0;

// Has Changes To Sync
export const hasChangesToSync = (state) => {
    const root = stateRoot(state);
    return (root.setIDsToUpload.length > 0 || root.setIDsBeingUploaded.length > 0);
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
        if (!SetEmptyCheck.hasEmptyData(set)) {
            num_sets_with_fields++;
        }
    });

    return num_sets_with_fields; 
};

export const getPercentFields = (state) => {
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
        return DurationCalculator.getDurationBetween(startDate, new Date());
    } else {
        return 0;
    }
};

export const getWorkingSet = (state) => {
    const sets = getWorkoutSets(state);
    const currentSet = sets[sets.length - 1];

    return currentSet;
};

export const getIsWorkingSet = (state, setID) => {
    const currentSet = getWorkingSet(state);
    return setID === currentSet.setID;
};

export const lastWorkoutTime = (state) => {
    let sets = getHistorySetsChronological(state);
    let startTime = Date.parse(SetTimeCalculator.startTime(sets[sets.length - 1]));

    return Date.parse(new Date()) - startTime;
};
