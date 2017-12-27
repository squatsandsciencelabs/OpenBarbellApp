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
                commentsModel: generateAutocompleteCommentsModel(action.workoutData, action.historyData)
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
    commentsModel: {
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

const generateAutocompleteCommentsModel = (workoutData, historyData) => {
    // declare vars
    let model = createDefaultState().commentsModel;
    let workoutSets = workoutData;
    let historySets = dictToArray(historyData);
    let sets = workoutSets.concat(historySets);

    // ignore undefined / nulls / empties
    sets = sets.filter((set) => set.comments !== undefined && set.comments !== null && set.comments.length > 0);

    // generate dictionary with counts
    sets.map((set) => {
        set.comments.map((comment) => {
            let lowercaseComment = comment.toLowerCase();
            if (model[lowercaseComment] === undefined) {
                model[lowercaseComment] = { suggestion: comment, seed: 1 };
            } else {
                model[lowercaseComment] = { suggestion: comment, seed: model[lowercaseComment].seed + 1};
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