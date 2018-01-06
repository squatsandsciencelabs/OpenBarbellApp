const stateRoot = (state) => state.survey;

export const getIsFillingOutSurvey = (state) => {
    return stateRoot(state).isFillingOutSurvey;
};

export const getURL = (state) => {
    return stateRoot(state).surveyURL;
};

export const getSurveyAvailable = (state) => {
    const url = getURL(state);
    if (url && !stateRoot(state).completedSurveyURLs.includes(url)) {
        return true;
    }
    return false;
};
