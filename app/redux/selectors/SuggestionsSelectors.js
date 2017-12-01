const stateRoot = (state) => state.suggestions;

const exerciseNameModel = (state) => stateRoot(state).exerciseModel;

const tagsModel = (state) => stateRoot(state).tagsModel;

export const generateExerciseNameSuggestions = (state, input, bias = null) => {
    return generateSuggestions(exerciseNameModel(state), input, bias);
};

export const generateTagsSuggestions = (state, input, ignore = []) => {
    return generateSuggestions(tagsModel(state), input, null, ignore);
};

const generateSuggestions = (model, input, bias, ignore = []) => {
    // lowercase comparisons
    var lowercaseInput = '';
    if (input !== null) {
        lowercaseInput = input.toLowerCase();
    }
    ignore = ignore.map((value) => value.toLowerCase());
    if (bias !== null) {
        bias = bias.toLowerCase();
    }

    // declare variables
    let matches = [];

    // get all matches
    for (var property in model) {
        if (model.hasOwnProperty(property) && !ignore.includes(property) && property.indexOf(lowercaseInput) !== -1) {
            if (property === bias) {
                //bias
                var suggestion = Object.assign({}, model[property]);
                suggestion.seed = 99999999999;
            } else {
                // non bias
                var suggestion = model[property];
            }
            matches.push(suggestion);
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

    // hack - ensure bug is last
    // TODO: if we do more than just the special bug tag, make this a generic system instead so you can add more types
    if (bias === null && ignore.filter((e) => e === 'bug').length <= 0) {
        if (matches.length === 10) {
            matches[9] = 'Bug';
        } else {
            matches[matches.length] = 'Bug';
        }
    }

    // remove if it's exactly equal
    if (matches.length > 0 && matches[0] === input) {
        matches.shift();
    }

    // return
    return matches;
};
