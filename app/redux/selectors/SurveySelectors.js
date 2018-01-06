const stateRoot = (state) => state.survey;

export const getIsFillingOutSurvey = (state) => {
    return stateRoot(state).isFillingOutSurvey;
};

export const getURL = (state) => {
    return stateRoot(state).surveyURL;
};

export const getSurveyAvailable = (state) => {
    if (getURL(state)) {
        return true;
    }
    return false;
};
