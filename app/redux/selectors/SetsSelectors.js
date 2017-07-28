// Get last rep time

export const lastRepTime = (state) => {
    var workoutData = state.workoutData;
    if (workoutData.length <= 0) {
        return null;
    }

    // check the current set for end time
    var currentSet = workoutData[workoutData.length-1];
    if (currentSet.endTime !== null) {
        return currentSet.endTime;
    }

    // check the previous set for end time
    if (state.workoutData.length > 1) {
        var previousSet = workoutData[workoutData.length-2];
        if (previousSet.endTime !== null) {
            return previousSet.endTime;
        }
    }

    // no end times found
    return null;
}

// Get Workout Sets

export const getWorkoutSets = (state) => {
    return state.workoutData;
};

// Get Expanded Workout Set

export const getExpandedWorkoutSet = (state, setID) => {
    return state.workoutData.find( set => set.setID == setID );
};

// Dictionary to Aarry

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
    var array = dictToArray(state.historyData);
    array.sort((set1, set2) => new Date(set1.startTime) - new Date(set2.startTime));
    return array;
};

// Get Expanded History Set

export const getExpandedHistorySet = (state, setID) => {
    var dictionary = state.historyData;
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
    return state.setIDsToUpload.map( setID => state.historyData[setID] );
};

// Has Changes To Sync
export const hasChangesToSync = (state) => {
    return (state.setIDsToUpload.length > 0 || state.setIDsBeingUploaded.length > 0);
};
