import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';

describe('SetSelectors', () => {
    let endTimeSpy = null;
    let untouchedSpy = null;
    let hasEmptyFieldsSpy = null;
    let hasEmptyRepsSpy = null;
    let startTimeSpy = null;

    afterEach(() => {
        if (endTimeSpy) {            
            endTimeSpy.mockReset();
            endTimeSpy.mockRestore();
        }
        if (untouchedSpy) {            
            untouchedSpy.mockReset();
            untouchedSpy.mockRestore();
        }
        if (hasEmptyFieldsSpy) {            
            hasEmptyFieldsSpy.mockReset();
            hasEmptyFieldsSpy.mockRestore();
        }
        if (hasEmptyRepsSpy) {
            hasEmptyRepsSpy.mockReset();
            hasEmptyRepsSpy.mockRestore();
        }
        if (startTimeSpy) {
            startTimeSpy.mockReset();
            startTimeSpy.mockRestore();
        }
    });

    describe('lastWorkoutRepTime', () => {
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
        test('0% when none', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(0);
        });

        test('0% when 1', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => true);            
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(0);
        });

        test('25%', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);
            const state = {
                sets: {
                    workoutData: [true, false, true, true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(25);
        });

        test('66.66666666666%', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);
            const state = {
                sets: {
                    workoutData: [true, false, false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(2/3*100);
        });

        test('100% when single', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);
            const state = {
                sets: {
                    workoutData: [false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(100);
        });

        test('100% when multiple', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => set);
            const state = {
                sets: {
                    workoutData: [false, false, false, false, false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(100);
        });
    });

    describe.skip('getWorkoutDuration', () => {
        // skipping, revisit later
    });

    describe.skip('getWorkingSet', () => {
        // skipping, revisit later
    });

    describe.skip('getIsWorkingSet', () => {
        // skipping, revisit later
    });

    describe('getWorkoutPreviousSetHasEmptyReps', () => {
        test('false if no sets', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBeFalsy();
        });

        test('false if only 1 set', () => {
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBeFalsy();
        });

        test('false if 2 sets and 2nd set has reps', () => {
            hasEmptyRepsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyReps').mockImplementation((set) => set);
            const state = {
                sets: {
                    workoutData: [true, false, true]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBeFalsy();
        });

        test('true if 2 sets and 2nd set does not have reps', () => {
            hasEmptyRepsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyReps').mockImplementation((set) => set);            
            const state = {
                sets: {
                    workoutData: [true, true, true]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBeTruthy();
        });
    });

    describe('getIsPreviousWorkoutSetFilled', () => {
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
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => true);
            const state = {
                sets: {
                    workoutData: [{}, {}, {}, {}]
                }
            };
        
            const result = sut.getIsPreviousWorkoutSetFilled(state);
        
            expect(result).toBe(0);
        });

        test('1 if filled', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => false);
            const state = {
                sets: {
                    workoutData: [{}, {}, {}, {}]
                }
            };
        
            const result = sut.getIsPreviousWorkoutSetFilled(state);
        
            expect(result).toBe(1);
        });
    });

    describe('getHistorySetsChronological', () => {
        test('in order', () => {
            let a = {
                initialStartTime: new Date(1000),
                reps: []
            };
            let b = {
                reps: [{
                    removed: false,
                    isValid: false,
                    time: new Date(3000)
                },
                {
                    removed: false,
                    isValid: true,
                    time: new Date(3000)
                }]
            };
            let c = {
                reps: [{
                    removed: false,
                    isValid: true,
                    time: new Date(2000)
                }]                           
            };
            const state = {
                sets: {
                    historyData: {
                        a: a,
                        b: b,
                        c: c
                    }
                }
            };

            const result = sut.getHistorySetsChronological(state);

            expect(result[0]).toBe(a);
            expect(result[1]).toBe(c);
            expect(result[2]).toBe(b);
            expect(result.length).toBe(3);
        });
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
        test('0 if no sets', () => {
            const state = {
                sets: {
                    historyData: {
                    }
                }
            };

            const result = sut.getNumHistoryWorkouts(state);

            expect(result).toBe(0);
        });

        test('1', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => false);
            const state = {
                sets: {
                    historyData: {
                        a: {
                            workoutID: 1
                        }
                    }
                }
            };

            const result = sut.getNumHistoryWorkouts(state);
            
            expect(result).toBe(1);
        });

        test('3', () => {
            hasEmptyFieldsSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyFields').mockImplementation((set) => false);
            startTimeSpy = jest.spyOn(SetTimeCalculator, 'startTime').mockImplementation((set) => 1);
            const state = {
                sets: {
                    historyData: {
                        a: {
                            workoutID: 1
                        },
                        b: {
                            workoutID: 1
                        },
                        c: {
                            workoutID: 2
                        },
                        d: {
                            workoutID: 2
                        },
                        e: {
                            workoutID: 3
                        },
                        f: {
                            workoutID: 3
                        },
                        g: {
                            workoutID: 3
                        },
                    }
                }
            };

            const result = sut.getNumHistoryWorkouts(state);
            
            expect(result).toBe(3);
        });
    });

    describe.skip('getExpandedHistorySet', () => {
        // expanded isn't being used right now, so skipping
    });

    describe('getTimeSinceLastWorkout', () => {
        test('null if no sets', () => {
            const state = {
                sets: {
                    historyData: {
                    }
                }
            };

            const result = sut.getTimeSinceLastWorkout(state);
            
            expect(result).toBeNull()            
        });

        test('time difference if sets', () => {
            const state = {
                sets: {
                    historyData: {
                        a: {
                            initialStartTime: new Date(1000),
                            reps: []
                        },
                        b: {
                            reps: [{
                                removed: false,
                                isValid: false,
                                time: new Date(3000)
                            }]
                        },
                        c: {
                            reps: [{
                                removed: false,
                                isValid: true,
                                time: new Date(2000)
                            }]                           
                        }
                    }
                }
            };

            const result = sut.getTimeSinceLastWorkout(state, new Date(6000));

            expect(result).toBe(4000);
        });
    });

    describe.skip('getSetsToUpload', () => {
        // skipping as focused on analytics, revisit later
    });

    describe.skip('getIsUploading', () => {
        // skipping as focused on analytics, revisit later
    });

    describe.skip('hasChangesToSync', () => {
        // skipping as focused on analytics, revisit later
    });

    describe.skip('getRevision', () => {
        // skipping as focused on analytics, revisit later
    });
});
