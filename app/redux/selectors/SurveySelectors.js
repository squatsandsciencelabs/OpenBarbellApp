const stateRoot = (state) => state.survey;

export const getIsFillingOutSurvey = (state) => {
    return stateRoot(state).isFillingOutSurvey;
};
