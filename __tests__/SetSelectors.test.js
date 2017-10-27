import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';

describe('lastWorkoutRepTime', () => {
    let endTimeSpy = null;

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
    let untouchedSpy = null;

    afterEach(() => {
        if (untouchedSpy) {
            untouchedSpy.mockReset();
        }
    });

    afterAll(() => {
        if (untouchedSpy) {            
            untouchedSpy.mockReset();
            untouchedSpy.mockRestore();
        }
    });

    test('false when > 2', () => {
        const state = {
            sets: {
                workoutData: [{}, {}]
            }
        };

        const result = sut.getIsWorkoutEmpty(state);

        expect(result).toBeFalsy();
   });

   test('false when exactly 1 not untouched', () => {
        untouchedSpy = jest.spyOn(SetEmptyCheck, 'isUntouched').mockImplementation(() => false);
        const state = {
            sets: {
                workoutData: [{}]
            }
        };

        const result = sut.getIsWorkoutEmpty(state);

        expect(result).toBeFalsy();
    });

    test('true when 1 set untouched', () => {
        untouchedSpy = jest.spyOn(SetEmptyCheck, 'isUntouched').mockImplementation(() => true);        
        const state = {
            sets: {
                workoutData: [{}]
            }
        };

        const result = sut.getIsWorkoutEmpty(state);

        expect(result).toBeTruthy();
    });

    test('true when 0 sets', () => {
        const state = {
            sets: {
                workoutData: []
            }
        };

        const result = sut.getIsWorkoutEmpty(state);

        expect(result).toBeTruthy();
    });
});

describe.skip('getExpandedWorkoutSet', () => {
    // expanded isn't being used right now, so skipping
});

describe('getNumWorkoutReps', () => {
    test('0 when no sets', () => {
        const state = {
            sets: {
                workoutData: []
            }
        };

        const result = sut.getNumWorkoutReps(state);

        expect(result).toBe(0);
   });

   test('0 when sets have none', () => {
        const state = {
            sets: {
                workoutData: [{reps:[]}]
            }
        };

        const result = sut.getNumWorkoutReps(state);

        expect(result).toBe(0);
    });

    test('reps for a single set', () => {
        const state = {
            sets: {
                workoutData: [{
                    reps:[]
                },
                {
                    reps:[{}, {}, {}]
                }]
            }
        };

        const result = sut.getNumWorkoutReps(state);

        expect(result).toBe(3);
    });

    test('reps across multiple sets', () => {
        const state = {
            sets: {
                workoutData: [{
                    reps:[{}, {}]
                },
                {
                    reps:[{}, {}, {}]
                }]
            }
        };

        const result = sut.getNumWorkoutReps(state);

        expect(result).toBe(5);
    });
});

describe('getNumWorkoutSetsWithFields', () => {
    let hasEmptyFieldsSpy = null;

    afterEach(() => {
        if (hasEmptyFieldsSpy) {
            hasEmptyFieldsSpy.mockReset();
        }
    });

    afterAll(() => {
        if (hasEmptyFieldsSpy) {            
            hasEmptyFieldsSpy.mockReset();
            hasEmptyFieldsSpy.mockRestore();
        }
    });

    test('3 fields', () => {
        hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);    
        const state = {
            sets: {
                workoutData: [false, true, false, false]
            }
        };
    
        const result = sut.getNumWorkoutSetsWithFields(state);
    
        expect(result).toBe(3);
    });
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
    let hasEmptyFieldsSpy = null;
    
        afterEach(() => {
            if (hasEmptyFieldsSpy) {
                hasEmptyFieldsSpy.mockReset();
            }
        });
    
        afterAll(() => {
            if (hasEmptyFieldsSpy) {            
                hasEmptyFieldsSpy.mockReset();
                hasEmptyFieldsSpy.mockRestore();
            }
        });
        
    test('-1 if no sets', () => {
        const state = {
            sets: {
                workoutData: []
            }
        };
    
        const result = sut.getIsPreviousWorkoutSetFilled(state);
    
        expect(result).toBe(-1);
    });

    test('-1 if no previous set', () => {
        const state = {
            sets: {
                workoutData: [{}]
            }
        };
    
        const result = sut.getIsPreviousWorkoutSetFilled(state);
    
        expect(result).toBe(-1);
    });

    test('0 if not filled', () => {
        hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);    
        const state = {
            sets: {
                workoutData: [true, true, true, true]
            }
        };
    
        const result = sut.getIsPreviousWorkoutSetFilled(state);
    
        expect(result).toBe(0);
    });

    test('1 if filled', () => {
        hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set.returnVal);    
        const state = {
            sets: {
                workoutData: [{returnVal: false}, {returnVal: false}, {returnVal: false}, {returnVal: false}]
            }
        };
    
        const result = sut.getIsPreviousWorkoutSetFilled(state);
    
        expect(result).toBe(1);
    });
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
    test('0 when no sets', () => {
        const state = {
            sets: {
                historyData: {
                }
            }
        };

        const result = sut.getNumHistoryReps(state);

        expect(result).toBe(0);
   });

   test('0 when sets have none', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        reps:[]
                    }
                }
            }
        };

        const result = sut.getNumHistoryReps(state);

        expect(result).toBe(0);
    });

    test('reps for a single set', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        reps:[]
                    },
                    b: {
                        reps:[{}, {}, {}]
                    }
                }
            }
        };

        const result = sut.getNumHistoryReps(state);

        expect(result).toBe(3);
    });

    test('reps across multiple sets', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        reps:[{}, {}]
                    },
                    b: {
                        reps:[{}, {}, {}]
                    }
                }
            }
        };

        const result = sut.getNumHistoryReps(state);

        expect(result).toBe(5);
    });
});

describe('getNumHistoryWorkouts', () => {
});

describe.skip('getExpandedHistorySet', () => {
    // expanded isn't being used right now, so skipping
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
