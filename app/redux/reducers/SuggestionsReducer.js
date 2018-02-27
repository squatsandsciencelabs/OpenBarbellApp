import {
    UPDATE_TAG_SUGGESTIONS,
    UPDATE_EXERCISE_SUGGESTIONS
} from 'app/configs+constants/ActionTypes';

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
        'belt squat': {suggestion: 'belt squat', seed: 5},
        'deficit deadlift': {suggestion: 'deficit deadlift', seed: 5},
        'close grip bench': {suggestion: 'close grip bench', seed:5},
        'slingshot bench': {suggestion: 'slingshot bench', seed:5},
        'front squat': {suggestion: 'front squat', seed: 5},
        'ssb squat': {suggestion: 'ssb squat', seed: 5}
    },
    tagsModel: {
        'warmup': {suggestion: 'warmup', seed: 5}
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
    sets.forEach((set) => {
        if (set.exercise) {
            let lowercaseExercise = set.exercise.toLowerCase();
            if (dictionary[lowercaseExercise] === undefined) {
                dictionary[lowercaseExercise] = { suggestion: lowercaseExercise, seed: 1 };
            } else {
                dictionary[lowercaseExercise] = { suggestion: lowercaseExercise, seed: dictionary[lowercaseExercise].seed + 1};
            }
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
                model[lowercaseTag] = { suggestion: lowercaseTag, seed: 1 };
            } else {
                model[lowercaseTag] = { suggestion: lowercaseTag, seed: model[lowercaseTag].seed + 1};
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
