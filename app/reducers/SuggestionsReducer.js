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
        'squat' : 100,
        'bench': 100,
        'deadlift': 100,
        'sumo deadlift' : 3,
        'back squat' : 30,
        'front squat' : 20,
    },
});

// TODO: do this once on launch and store it in the reducer instead
// for now leaving it here for simplicity
const generateAutocompleteExerciseModel = (historyData) => {
	// declare vars
	let dictionary = {};
	let model = {};
	let sets = dictToArray(historyData);

	// ignore nulls
	sets = sets.filter((set) => set.exercise !== null);

	// generate dictionary with counts
	sets.map((set) => {
		if (dictionary[set.exercise] === undefined) {
			dictionary[set.exercise] = 0;
		} else {
			dictionary[set.exercise] = dictionary[set.exercise] + 1;
		}
	});

	// ignore anything less than 2 count
	for (var property in dictionary) {
		if (dictionary.hasOwnProperty(property) && dictionary[property] > 2) {
			model[property] = dictionary[property];
		}
	}

	// return
	return model;
};

export const generateSuggestions = (input, model) => {
    // lowercase comparisons
    input = input.toLowerCase();

	// declare variables
	let matches = [];

	// get all matches
	for (var property in model) {
		if (model.hasOwnProperty(property) && property.indexOf(input) !== -1) {
			matches.push({suggestion: property, count: model[property]});
		}
	}

	// sort
	matches.sort((match1, match2) => match2.count - match1.count);

	// return top 10
	if (matches.length > 10) {
		matches.length = 10;
	}

	// just the suggestions
	matches = matches.map((match) => match.suggestion);

	// return
	return matches;
};

export default SuggestionsReducer;