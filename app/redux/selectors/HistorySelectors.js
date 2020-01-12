import * as DateUtils from 'app/utility/DateUtils';
import * as SetUtils from 'app/utility/SetUtils';
import * as WeightConversion from 'app/utility/WeightConversion';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

const stateRoot = (state) => state.history;

// video recorder / camera

export const getIsRecording = (state) => stateRoot(state).isRecording;

export const getRecordingVideoType = (state) => stateRoot(state).recordingVideoType;

export const getCameraType = (state) => stateRoot(state).cameraType;

export const getIsCameraVisible = (state) => stateRoot(state).recordingSetID !== null;

export const getRecordingSetID = (state) => stateRoot(state).recordingSetID;

export const getIsSavingVideo = (state) => stateRoot(state).isSavingVideo;

// video player

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

// history viewed 

export const getHistoryViewedCounter = (state) => stateRoot(state).viewedCounter;

// history filters

// NOTE: this does not check metrics because weight without metrics isn't actually filtering
export const getIsFiltering = (state) =>
    stateRoot(state).exercise
    || stateRoot(state).tagsToInclude.length > 0
    || stateRoot(state).tagsToExclude.length > 0
    || stateRoot(state).startingDate
    || stateRoot(state).endingDate
    || stateRoot(state).startingWeight
    || stateRoot(state).endingWeight
    || stateRoot(state).startingRPE
    || stateRoot(state).endingRPE
    || stateRoot(state).startingRepRange
    || stateRoot(state).endingRepRange
    || stateRoot(state).showRemoved;

export const getShowHistoryFilter = (state) => stateRoot(state).showHistoryFilter;

export const getHistoryFilterExercise = (state) => stateRoot(state).exercise;

export const getIsEditingHistoryFilterExercise = (state) => stateRoot(state).isEditingFilterExerciseName;

export const getEditingFilterExerciseName = (state) => stateRoot(state).editingFilterExerciseName;

export const getHistoryFilterTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getIsEditingHistoryFilterTagsToInclude = (state) => stateRoot(state).isEditingFilterTagsToInclude;

export const getEditingFilterTagsToInclude = (state) => stateRoot(state).editingFilterTagsToInclude;

export const getHistoryFilterTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getIsEditingHistoryFilterTagsToExclude = (state) => stateRoot(state).isEditingFilterTagsToExclude;

export const getEditingFilterTagsToExclude = (state) => stateRoot(state).editingFilterTagsToExclude;

export const getHistoryFilterStartingRPE = (state) => stateRoot(state).startingRPE;

export const getIsEditingHistoryFilterStartingRPE = (state) => stateRoot(state).isEditingStartingRPE;

export const getEditingHistoryFilterStartingRPE = (state) => stateRoot(state).editingStartingRPE;

export const getHistoryFilterEndingRPE = (state) => stateRoot(state).endingRPE;

export const getIsEditingHistoryFilterEndingingRPE = (state) => stateRoot(state).isEditingEndingRPE;

export const getEditingHistoryFilterEndingRPE = (state) => stateRoot(state).editingEndingRPE;

export const getHistoryFilterStartingWeight = (state) => stateRoot(state).startingWeight;

export const getIsEditingHistoryFilterStartingWeight = (state) => stateRoot(state).isEditingStartingWeight;

export const getEditingHistoryFilterStartingWeight = (state) => stateRoot(state).editingStartingWeight;

export const getEditingHistoryFilterStartingWeightMetric = (state) => stateRoot(state).editingStartingWeightMetric;

export const getEditingHistoryFilterEndingWeightMetric = (state) => stateRoot(state).editingEndingWeightMetric;

export const getHistoryFilterStartingWeightMetric = (state) => stateRoot(state).startingWeightMetric;

export const getHistoryFilterEndingWeightMetric = (state) => stateRoot(state).endingWeightMetric;

export const getHistoryFilterEndingWeight = (state) => stateRoot(state).endingWeight;

export const getIsEditingHistoryFilterEndingWeight = (state) => stateRoot(state).isEditingEndingWeight;

export const getEditingHistoryFilterEndingWeight = (state) => stateRoot(state).editingEndingWeight;

export const getHistoryFilterStartingRepRange = (state) => stateRoot(state).startingRepRange;

export const getIsEditingHistoryFilterStartingRepRange = (state) => stateRoot(state).isEditingStartingRepRange;

export const getEditingHistoryFilterStartingRepRange = (state) => stateRoot(state).editingStartingRepRange;

export const getHistoryFilterEndingRepRange = (state) => stateRoot(state).endingRepRange;

export const getIsEditingHistoryFilterEndingRepRange = (state) => stateRoot(state).isEditingEndingRepRange;

export const getEditingHistoryFilterEndingRepRange = (state) => stateRoot(state).editingEndingRepRange;

export const getHistoryFilterStartingDate = (state) => stateRoot(state).startingDate;

export const getIsEditingHistoryFilterStartingDate = (state) => stateRoot(state).isEditingStartingDate;

export const getEditingHistoryFilterStartingDate = (state) => stateRoot(state).editingStartingDate;

export const getHistoryFilterEndingDate = (state) => stateRoot(state).endingDate;

export const getIsEditingHistoryFilterEndingDate = (state) => stateRoot(state).isEditingEndingDate;

export const getEditingHistoryFilterEndingDate = (state) => stateRoot(state).editingEndingDate;

export const getEditingShowRemoved = (state) => stateRoot(state).editingShowRemoved;

export const getShowRemoved = (state) => stateRoot(state).showRemoved;
