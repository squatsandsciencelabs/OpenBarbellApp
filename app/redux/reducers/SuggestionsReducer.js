import {
    UPDATE_TAG_SUGGESTIONS,
    UPDATE_EXERCISE_SUGGESTIONS
} from 'app/ActionTypes';

const SuggestionsReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case UPDATE_EXERCISE_SUGGESTIONS:
            return Object.assign({}, state, {
                exerciseModel: generateAutocompleteExerciseModel(action.workoutData, action.historyData)
            });
        case UPDATE_TAG_SUGGESTIONS:
            return Object.assign({}, state, {
                tagsModel: generateAutocompleteTagsModel(action.workoutData, action.historyData)
            });
        default:
            return state;
    }
};

const createDefaultState = () => ({
    exerciseModel: {
        'belt squat': {suggestion: 'Belt Squat', seed: 5},
        'deficit deadlift': {suggestion: 'Deficit Deadlift', seed: 5},
        'close grip bench': {suggestion: 'Close Grip Bench', seed:5},
        'slingshot bench': {suggestion: 'Slingshot Bench', seed:5},
        'front squat': {suggestion: 'Front Squat', seed: 5},
        'SSB Squat': {suggestion: 'SSB Squat', seed: 5}
    },
    tagsModel: {
        'belt' : {suggestion: 'Belt', seed: 10},
        'high bar' : {suggestion: 'High Bar', seed: 10},
    }
});

const generateAutocompleteExerciseModel = (workoutData, historyData) => {
    // declare vars
    let dictionary = createDefaultState().exerciseModel;
    let model = createDefaultState().exerciseModel;
    let historySets = dictToArray(historyData);
    let workoutSets = workoutData;
    let sets = workoutSets.concat(historySets);

    // ignore nulls and empty strings
    sets = sets.filter((set) => set.exercise !== null && set.exercise !== '');

    // generate dictionary with counts
    sets.map((set) => {
        let lowercaseExercise = set.exercise.toLowerCase();
        if (dictionary[lowercaseExercise] === undefined) {
            dictionary[lowercaseExercise] = { suggestion: set.exercise, seed: 1 };
        } else {
            dictionary[lowercaseExercise] = { suggestion: set.exercise, seed: dictionary[lowercaseExercise].seed + 1};
        }
    });

    // ignore anything less than 2 count
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property) && dictionary[property].seed > 1) {
            model[property] = dictionary[property];
        }
    }

    // return
    return model;
};

const generateAutocompleteTagsModel = (workoutData, historyData) => {
    // declare vars
    let model = createDefaultState().tagsModel;
    let workoutSets = workoutData;
    let historySets = dictToArray(historyData);
    let sets = workoutSets.concat(historySets);

    // ignore undefined / nulls / empties
    sets = sets.filter((set) => set.tags !== undefined && set.tags !== null && set.tags.length > 0);

    // generate dictionary with counts
    sets.map((set) => {
        set.tags.map((tag) => {
            let lowercaseTag = tag.toLowerCase();
            if (model[lowercaseTag] === undefined) {
                model[lowercaseTag] = { suggestion: tag, seed: 1 };
            } else {
                model[lowercaseTag] = { suggestion: tag, seed: model[lowercaseTag].seed + 1};
            }
        });
    });
    
    // return
    return model;
};

// TODO: consider moving this to a utility class as logic is duplicated from Set Selectors
const dictToArray = (dictionary) => {
    var array = [];
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property)) {
            array.push(dictionary[property]);
        }
    }
    return array;
};

export default SuggestionsReducer;
