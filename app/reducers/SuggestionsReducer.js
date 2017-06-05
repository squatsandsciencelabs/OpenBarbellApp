// app/reducers/SuggestionsReducer

import {
	UPDATE_EXERCISE_SUGGESTIONS_MODEL
} from '../ActionTypes';

// TODO: connect the update call where necessary, for example right after logging in and on startup
// maybe in more places too

// TODO: seeding

const SuggestionsReducer = (state = createDefaultState(), action) => {
    switch (action.type) {
        case UPDATE_EXERCISE_SUGGESTIONS_MODEL:
            return Object.assign({}, state, {exerciseModel: generateAutocompleteExerciseModel(action.historyData)});
        default:
            return state;
    }
};

// TODO: Remove this default and instead connect the update suggestions model
const createDefaultState = () => ({
    exerciseModel: {
        'squat' : {suggestion: 'Squat', seed: 100},
        'bench': {suggestion: 'Bench', seed: 100},
        'deadlift': {suggestion: 'Deadlift', seed: 100},
        'sumo deadlift' : {suggestion: 'Sumo Deadlift', seed: 3},
        'back squat' : {suggestion: 'Back Squat', seed: 2},
        'front squat' : {suggestion: 'Front Squat', seed: 2},
    },
});

// TODO: consider moving this to a utility class as logic is duplicated from set reducer
const dictToArray = (dictionary) => {
	var array = [];
	for (var property in dictionary) {
		if (dictionary.hasOwnProperty(property)) {
			array.push(dictionary[property]);
		}
	}
	return array;
};

// TODO: do this once on launch and store it in the reducer instead
// for now leaving it here for simplicity
const generateAutocompleteExerciseModel = (historyData) => {
	// declare vars
	let dictionary = createDefaultState().exerciseModel;
	let model = createDefaultState().exerciseModel;
	let sets = dictToArray(historyData);

	// ignore nulls
	sets = sets.filter((set) => set.exercise !== null);

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

export const generateSuggestions = (input, model) => {
    // lowercase comparisons
	var lowercaseInput = '';
	if (input !== null) {
		lowercaseInput = input.toLowerCase();
	}

	// declare variables
	let matches = [];

	// get all matches
	for (var property in model) {
		if (model.hasOwnProperty(property) && property.indexOf(lowercaseInput) !== -1) {
			matches.push(model[property]);
		}
	}

	// sort
	matches.sort((match1, match2) => match2.seed - match1.seed);

	// return top 10
	if (matches.length > 10) {
		matches.length = 10;
	}

	// just the suggestions
	matches = matches.map((match) => match.suggestion);

	// remove if it's exactly equal
	if (matches.length > 0 && matches[0] === input) {
		matches.shift();
	}

	// return
	return matches;
};

export default SuggestionsReducer;