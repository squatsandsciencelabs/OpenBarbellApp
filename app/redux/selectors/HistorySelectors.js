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

export const getWatchFileURL = (state) => stateRoot(state).watchFileURL;

// history viewed 

export const getHistoryViewedCounter = (state) => stateRoot(state).viewedCounter;

// history filters

export const getHistoryFilterExercise = (state) => stateRoot(state).exercise;

export const getHistoryFilterTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getHistoryFilterTagsToExclude = (state) => stateRoot(state).tagsToExclude;

export const getHistoryFilterStartingRPE = (state) => stateRoot(state).startingRPE;

export const getHistoryFilterEndingRPE = (state) => stateRoot(state).endingRPE;

export const getHistoryFilterStartingWeight = (state) => stateRoot(state).startingWeight;

export const getHistoryFilterStartingWeightMetric = (state) => stateRoot(state).startingWeightMetric;

export const getHistoryFilterEndingWeightMetric = (state) => stateRoot(state).endingWeightMetric;

export const getHistoryFilterEndingWeight = (state) => stateRoot(state).endingWeight;

export const getHistoryFilterStartingRepRange = (state) => stateRoot(state).startingRepRange;

export const getHistoryFilterEndingRepRange = (state) => stateRoot(state).endingRepRange;

export const getHistoryFilterStartingDate = (state) => stateRoot(state).startingDate;

export const getHistoryFilterEndingDate = (state) => stateRoot(state).endingDate;
