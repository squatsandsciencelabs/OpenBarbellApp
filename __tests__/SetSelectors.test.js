import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';

describe('lastWorkoutRepTime', () => {
    var endTimeSpy = null;

    afterEach(() => {
        if (endTimeSpy) {
            endTimeSpy.mockReset();
        }
    });

    afterAll(() => {
        if (endTimeSpy) {            
            endTimeSpy.mockReset();
            endTimeSpy.mockRestore();
        }
    });

    test('null if no workout data', () => {
        const state = {
            sets: {
                workoutData: []
            }
        };

        const result = sut.lastWorkoutRepTime(state);

        expect(result).toBeNull();
    });

    test('null if no end time on current set and it is the only set', () => {
        endTimeSpy = jest.spyOn(SetTimeCalculator, 'endTime').mockImplementation(() => null);        
        const state = {
            sets: {
                workoutData: [{}]
            }
        };

        const result = sut.lastWorkoutRepTime(state);

        expect(result).toBeNull();
    });

    test('null if no end time on any set', () => {
        endTimeSpy = jest.spyOn(SetTimeCalculator, 'endTime').mockImplementation(() => null);
        const state = {
            sets: {
                workoutData: [{}, {}, {}, {}]
            }
        };

        const result = sut.lastWorkoutRepTime(state);

        expect(result).toBeNull();
    });

    test('end time of current set', () => {
        const expected = 3;
        endTimeSpy = jest.spyOn(SetTimeCalculator, 'endTime').mockImplementation(() => expected);
        const state = {
            sets: {
                workoutData: [{}, {}, {}, {}]
            }
        };

        const actual = sut.lastWorkoutRepTime(state);

        expect(actual).toBe(expected);
    });

    test('end time of set after current set if current set has no end time', () => {
        const expected = 3;
        let initialRun = false;
        endTimeSpy = jest.spyOn(SetTimeCalculator, 'endTime').mockImplementation(() => {
            if (!initialRun) {
                initialRun = true;
                return null;
            } else {
                return expected;
            }
        });
        const state = {
            sets: {
                workoutData: [{}, {}, {}, {}]
            }
        };

        const actual = sut.lastWorkoutRepTime(state);

        expect(actual).toBe(expected);
    });
});

describe.skip('getWorkoutSets', () => {
});

describe('getNumWorkoutSets', () => {
   test('0', () => {
        const state = {
            sets: {
                workoutData: []
            }
        };

        const result = sut.getNumWorkoutSets(state);

        expect(result).toBe(0);    
   });

   test('1', () => {
        const state = {
            sets: {
                workoutData: [{}]
            }
        };

        const result = sut.getNumWorkoutSets(state);

        expect(result).toBe(1);    
    });

    test('2', () => {
        const state = {
            sets: {
                workoutData: [{}, {}]
            }
        };

        const result = sut.getNumWorkoutSets(state);

        expect(result).toBe(2);    
    });
});

describe('getIsWorkoutEmpty', () => {
});

describe('getExpandedWorkoutSet', () => {
});

describe('getNumWorkoutReps', () => {
});

describe('getNumWorkoutSetsWithFields', () => {
});

describe('getPercentWorkoutSetsWithFields', () => {
});

describe('getWorkoutDuration', () => {
});

describe('getWorkingSet', () => {
});

describe('getIsWorkingSet', () => {
});

describe('getPreviousWorkoutSetHasEmptyReps', () => {
});

describe('getIsPreviousWorkoutSetFilled', () => {
});

describe('getHistorySetsChronological', () => {
});

describe('getNumHistorySets', () => {
    test('0', () => {
        const state = {
            sets: {
                historyData: {}
            }
        };

        const result = sut.getNumHistorySets(state);

        expect(result).toBe(0);    
   });

   test('1', () => {
        const state = {
            sets: {
                historyData: {
                    a: {}
                }
            }
        };

        const result = sut.getNumHistorySets(state);

        expect(result).toBe(1);    
    });

    test('2', () => {
        const state = {
            sets: {
                historyData: {
                    a: {},
                    b: {}                    
                }
            }
        };

        const result = sut.getNumHistorySets(state);

        expect(result).toBe(2);    
    });
});

describe('getNumHistoryReps', () => {
});

describe('getNumHistoryWorkouts', () => {
});

describe('getExpandedHistorySet', () => {
});

describe('getTimeSinceLastWorkout', () => {
});

describe('getSetsToUpload', () => {
});

describe('getIsUploading', () => {
});

describe('hasChangesToSync', () => {
});

describe('getRevision', () => {
});
