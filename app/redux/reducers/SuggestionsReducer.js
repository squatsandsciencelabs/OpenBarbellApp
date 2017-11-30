import {
    UPDATE_SUGGESTIONS,
} from 'app/ActionTypes';

const SuggestionsReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case UPDATE_SUGGESTIONS:
            return Object.assign({}, state, {
                exerciseModel: generateAutocompleteExerciseModel(action.historyData),
                tagsModel: generateAutocompleteTagsModel(action.historyData),
            });
        default:
            return state;
    }
};

const createDefaultState = () => ({
    exerciseModel: {
        'squat' : {suggestion: 'Squat', seed: 10},
        'bench': {suggestion: 'Bench', seed: 10},
        'deadlift': {suggestion: 'Deadlift', seed: 10},
        'sumo deadlift' : {suggestion: 'Sumo Deadlift', seed: 10},
        'back squat' : {suggestion: 'Back Squat', seed: 10},
        'front squat' : {suggestion: 'Front Squat', seed: 10},
    },
    tagsModel: {
        'bug': {suggestion: 'Bug', seed: 10},
        'belt' : {suggestion: 'Belt', seed: 10},
        'high bar' : {suggestion: 'High Bar', seed: 10},
    }
});

const generateAutocompleteExerciseModel = (historyData) => {
    // declare vars
    let dictionary = createDefaultState().exerciseModel;
    let model = createDefaultState().exerciseModel;
    let sets = dictToArray(historyData);

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

const generateAutocompleteTagsModel = (historyData) => {
    // declare vars
    let model = createDefaultState().tagsModel;
    let sets = dictToArray(historyData);

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