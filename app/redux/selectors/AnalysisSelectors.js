import * as SetUtils from 'app/utility/SetUtils';

const stateRoot = (state) => state.analysis;

// popup state

export const getShowInfoModal = (state) => stateRoot(state).showInfoModal;

export const getIsEditingExercise = (state) => stateRoot(state).isEditingExercise;

export const getIsEditingIncludeTags = (state) => stateRoot(state).isEditingIncludeTags;

export const getIsEditingExcludeTags = (state) => stateRoot(state).isEditingExcludeTags;

// calculate

export const getExercise = (state) => stateRoot(state).exercise;

export const getTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getVelocitySlider = (state) => stateRoot(state).velocitySlider;

export const getDaysRange = (state) => stateRoot(state).daysRange;

export const get1RMAnalytics = (state) => stateRoot(state).oneRMAnalytics;

// results

export const getAnalysisDragged = (state) => stateRoot(state).dragged;

// this is the velocity last used to calculate it, not the current velocity value
export const getAnalysisVelocity = (state) => stateRoot(state).velocity;

export const getE1RM = (state) => stateRoot(state).e1RM;

export const getR2 = (state) => stateRoot(state).r2;

export const getIsR2HighEnough = (state) => getR2(state) > 90; // TODO: make 90 a config

export const getActiveChartData = (state) => stateRoot(state).activeChartData;

export const getErrorChartData = (state) => stateRoot(state).errorChartData;

export const getUnusedChartData = (state) => stateRoot(state).unusedChartData;

export const getRegressionPoints = (state) => stateRoot(state).regressionPoints;

export const getMinX = (state) => stateRoot(state).minX;

export const getMaxX = (state) => stateRoot(state).maxX;

export const getMaxY = (state) => stateRoot(state).maxY;

export const getIsRegressionNegative = (state) => stateRoot(state).isRegressionNegative;

export const getSetID = (state) => stateRoot(state).setID;

export const getWorkoutID = (state) => stateRoot(state).workoutID;

// edit

export const getEditingExerciseName = (state) => stateRoot(state).editingExerciseName;

export const getEditingExerciseSetID = (state) => stateRoot(state).editingExerciseSetID;

export const getEditingTagsSetID = (state) => stateRoot(state).editingTagsSetID;

export const getEditingTags = (state) => stateRoot(state).editingTags;

// edit video player

export const getWatchSetID = (state) => stateRoot(state).watchSetID;

export const getIsVideoPlayerVisible = (state) => stateRoot(state).watchSetID !== null;

// TODO: remove hack fix, see https://github.com/react-native-community/react-native-video/issues/1572
export const getWatchFileURL = (state) => {
    // Android
    if (Platform.OS !== 'ios') {
        return stateRoot(state).watchFileURL;
    }

    // iOS Hack Fix
    if (!stateRoot(state).watchFileURL) {
        return null;
    }
    if (!stateRoot(state).watchFileURL.startsWith('ph://')) {
        return stateRoot(state).watchFileURL;
    }
    const appleId = stateRoot(state).watchFileURL.substring(5, 41);
    const ext = 'mov';
    return `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
};

// edit video recorder

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getRecordingVideoType = (state) => stateRoot(state).recordingVideoType;

export const getCameraType = (state) => stateRoot(state).cameraType;

export const getIsCameraVisible = (state) => stateRoot(state).recordingSetID !== null;

export const getRecordingSetID = (state) => stateRoot(state).recordingSetID;

export const getIsSavingVideo = (state) => stateRoot(state).isSavingVideo;

// analytics

export const getOrigExerciseName = (state) => stateRoot(state).origExerciseName;

export const getOrigRPE = (state) => stateRoot(state).origRPE;

export const getCurrentRPE = (state) => stateRoot(state).currentRPE;

export const getOrigWeight = (state) => stateRoot(state).origWeight;

export const getCurrentWeight = (state) => stateRoot(state).currentWeight;

export const getOrigMetric = (state) => stateRoot(state).origMetric;

export const getOrigTags = (state) => stateRoot(state).origTags;

export const getOrigDeletedFlag = (state) => stateRoot(state).origDeletedFlag;

export const getWasError = (state) => stateRoot(state).wasError;

export const getDidUpdateExerciseName = (state, set) => !areEqual(set.exercise, getOrigExerciseName(state));

export const getDidUpdateRPE = (state, set) => !areEqual(getCurrentRPE(state), getOrigRPE(state));

export const getDidUpdateWeight = (state, set) => !areEqual(getCurrentWeight(state), getOrigWeight(state));

export const getDidUpdateMetric = (state, set) => !areEqual(set.metric, getOrigMetric(state));

export const getDidUpdateTags = (state, set) => !areArraysEqual(set.tags, getOrigTags(state));

export const getDidDeleteSet = (state, set) => (SetUtils.isDeleted(set) !== getOrigDeletedFlag(state)) && !getOrigDeletedFlag(state);

export const getDidRestoreSet = (state, set) => (SetUtils.isDeleted(set) !== getOrigDeletedFlag(state)) && getOrigDeletedFlag(state);

export const getDidUpdateReps = (state) => stateRoot(state).didUpdateReps;

// helpers

const isEmpty = (x) => x === null || x === '' || x === undefined;

const areEqual = (x, y) => {
    if (isEmpty(x) && isEmpty(y)) {
        return true;
    }
    return x === y;
};

const areArraysEqual = (a, b) => {
    if (isEmpty(a)) {
        a = [];
    }
    if (isEmpty(b)) {
        b = [];
    }

    if (a.length !== b.length) {
        return false;
    }

    return a.every((v, i) => v === b[i]);
};

// scroll

export const getScroll = (state) => stateRoot(state).scroll;
