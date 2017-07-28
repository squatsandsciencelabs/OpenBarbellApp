export const generateSuggestions = (model, input, ignore = []) => {
    // lowercase comparisons
    var lowercaseInput = '';
    if (input !== null) {
        lowercaseInput = input.toLowerCase();
    }
    ignore = ignore.map((value) => value.toLowerCase());

    // declare variables
    let matches = [];

    // get all matches
    for (var property in model) {
        if (model.hasOwnProperty(property) && !ignore.includes(property) && property.indexOf(lowercaseInput) !== -1) {
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
