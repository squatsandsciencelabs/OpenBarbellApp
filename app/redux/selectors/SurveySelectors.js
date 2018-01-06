const stateRoot = (state) => state.survey;

export const getIsFillingOutSurvey = (state) => {
    return stateRoot(state).isFillingOutSurvey;
};

export const getURL = (state) => {
    return stateRoot(state).surveyURL;
};
