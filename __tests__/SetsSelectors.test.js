import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetUtils from 'app/utility/SetUtils';
import * as CollapsedMetrics from 'app/math/CollapsedMetrics';

describe('SetsSelectors', () => {
    describe('lastWorkoutRepTime', () => {
        const realEndTime = SetUtils.endTime;

        afterEach(() => {
            SetUtils.endTime = realEndTime;
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
            SetUtils.endTime = () => null;
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.lastWorkoutRepTime(state);

            expect(result).toBeNull();
        });

        test('null if no end time on any set', () => {
            SetUtils.endTime = () => null;
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
            SetUtils.endTime = () => expected;
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
            SetUtils.endTime = () => {
                if (!initialRun) {
                        initialRun = true;
                        return null;
                    } else {
                        return expected;
                    }
            };
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
        const realIsUntouched = SetUtils.isUntouched;

        afterEach(() => {
            SetUtils.isUntouched = realIsUntouched; 
        });

        test('false when > 2', () => {
            const state = {
                sets: {
                    workoutData: [{}, {}]
                }
            };

            const result = sut.getIsWorkoutEmpty(state);

            expect(result).toBe(false);
        });

        test('false when exactly 1 not untouched', () => {
            SetUtils.isUntouched = () => false;
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.getIsWorkoutEmpty(state);

            expect(result).toBe(false);
        });

        test('true when 1 set untouched', () => {
            SetUtils.isUntouched = () => true;
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.getIsWorkoutEmpty(state);

            expect(result).toBe(true);;
        });

        test('true when 0 sets', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };

            const result = sut.getIsWorkoutEmpty(state);

            expect(result).toBe(true);;
        });
    });

    describe.skip('getWorkoutSet', () => {
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
        const realHasEmptyFields = SetUtils.hasEmptyFields;
        
        afterEach(() => {
            SetUtils.hasEmptyFields = realHasEmptyFields;
        });

        test('3 fields', () => {
            SetUtils.hasEmptyFields = (set) => set;
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
        const realHasEmptyFields = SetUtils.hasEmptyFields;

        beforeAll(() => {
            SetUtils.hasEmptyFields = (set) => set;            
        });
        
        afterAll(() => {
            SetUtils.hasEmptyFields = realHasEmptyFields;
        });

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
            const state = {
                sets: {
                    workoutData: [true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(0);
        });

        test('25%', () => {
            const state = {
                sets: {
                    workoutData: [true, false, true, true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(25);
        });

        test('66.66666666666%', () => {
            const state = {
                sets: {
                    workoutData: [true, false, false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(2/3*100);
        });

        test('100% when single', () => {
            const state = {
                sets: {
                    workoutData: [false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(100);
        });

        test('100% when multiple', () => {
            const state = {
                sets: {
                    workoutData: [false, false, false, false, false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithFields(state);
        
            expect(result).toBe(100);
        });
    });

    describe('getNumWorkoutSetsWithAllFields', () => {
        const realHasAllFields = SetUtils.hasAllFields;
        
        afterEach(() => {
            SetUtils.hasAllFields = realHasAllFields;
        });

        test('3 fields', () => {
            SetUtils.hasAllFields = (set) => set;
            const state = {
                sets: {
                    workoutData: [true, false, true, true]
                }
            };
        
            const result = sut.getNumWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(3);
        });
    });

    describe('getPercentWorkoutSetsWithAllFields', () => {
        const realHasAllFields = SetUtils.hasAllFields;

        beforeAll(() => {
            SetUtils.hasAllFields = (set) => set;            
        });
        
        afterAll(() => {
            SetUtils.hasAllFields = realHasAllFields;
        });

        test('0% when none', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(0);
        });

        test('0% when 1', () => {
            const state = {
                sets: {
                    workoutData: [false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(0);
        });

        test('25%', () => {
            const state = {
                sets: {
                    workoutData: [false, true, false, false]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(25);
        });

        test('66.66666666666%', () => {
            const state = {
                sets: {
                    workoutData: [false, true, true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(2/3*100);
        });

        test('100% when single', () => {
            const state = {
                sets: {
                    workoutData: [true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(100);
        });

        test('100% when multiple', () => {
            const state = {
                sets: {
                    workoutData: [true, true, true, true, true]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithAllFields(state);
        
            expect(result).toBe(100);
        });
    });

    describe('getNumWorkoutSetsWithRPE', () => {

        test('with rpe', () => {
            SetUtils.hasAllFields = (set) => set;
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {rpe: '5,5'}, {rpe: '5.5'}]
                }
            };
        
            const result = sut.getNumWorkoutSetsWithRPE(state);
        
            expect(result).toBe(3);
        });

        test('with empty string rpe', () => {
            SetUtils.hasAllFields = (set) => set;
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {rpe: ''}, {rpe: '5.5'}]
                }
            };
        
            const result = sut.getNumWorkoutSetsWithRPE(state);
        
            expect(result).toBe(2);
        });

        test('with null rpe', () => {
            SetUtils.hasAllFields = (set) => set;
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {rpe: null}, {rpe: '5.5'}]
                }
            };
        
            const result = sut.getNumWorkoutSetsWithRPE(state);
        
            expect(result).toBe(2);
        });

        test('with undefined rpe', () => {
            SetUtils.hasAllFields = (set) => set;
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {}, {rpe: '5.5'}]
                }
            };
        
            const result = sut.getNumWorkoutSetsWithRPE(state);
        
            expect(result).toBe(2);
        });

    });

    describe('getPercentWorkoutSetsWithRPE', () => {

        test('0% when none', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(0);
        });

        test('0% when 1', () => {
            const state = {
                sets: {
                    workoutData: [{rpe: null}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(0);
        });

        test('25%', () => {
            const state = {
                sets: {
                    workoutData: [{rpe: ''}, {rpe: ''}, {rpe: '5'}, {rpe: ''}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(25);
        });

        test('66.66666666666%', () => {
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {}, {rpe: '5'}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(2/3*100);
        });

        test('100% when single', () => {
            const state = {
                sets: {
                    workoutData: [{rpe: '5,5'}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(100);
        });

        test('100% when multiple', () => {
            const state = {
                sets: {
                    workoutData: [{rpe: '5'}, {rpe: '5,5'}, {rpe: '5.5'}, {rpe: '7'}, {rpe: '10'}]
                }
            };
        
            const result = sut.getPercentWorkoutSetsWithRPE(state);
        
            expect(result).toBe(100);
        });
    });

    describe('getWorkoutDuration', () => {
        const realNow = Date.now;
        const realStartTime = SetUtils.startTime;

        afterAll(() => {
            Date.now = realNow;
            SetUtils.startTime = realStartTime;
        });

        test('0', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
            SetUtils.startTime = () => new Date(0);
            Date.now = () => 0;

            const result = sut.getWorkoutDuration(state);

            expect(result).toBe(0);
        });

        test('1000', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
            SetUtils.startTime = () => new Date(5000);
            Date.now = () => 6000;

            const result = sut.getWorkoutDuration(state);

            expect(result).toBe(1000);
        });

        test('5000', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
            SetUtils.startTime = () => new Date(3000);
            Date.now = () => 8000;

            const result = sut.getWorkoutDuration(state);

            expect(result).toBe(5000);
        });
    });

    describe.skip('getWorkingSet', () => {
        // skipping, revisit later
    });

    describe.skip('getIsWorkingSet', () => {
        // skipping, revisit later
    });

    describe('getWorkoutPreviousSetHasEmptyReps', () => {
        const realHasEmptyReps = SetUtils.hasEmptyReps;

        beforeAll(() => {
            SetUtils.hasEmptyReps = (set) => set;            
        });

        afterAll(() => {
            SetUtils.hasEmptyReps = realHasEmptyReps;
        });
        
        test('false if no sets', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBe(false);
        });

        test('false if only 1 set', () => {
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBe(false);
        });

        test('false if 2 sets and 2nd set has reps', () => {
            const state = {
                sets: {
                    workoutData: [true, false, true]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBe(false);
        });

        test('true if 2 sets and 2nd set does not have reps', () => {
            const state = {
                sets: {
                    workoutData: [true, true, true]
                }
            };

            const result = sut.getWorkoutPreviousSetHasEmptyReps(state);
            
            expect(result).toBe(true);;
        });
    });

    describe('getIsPreviousWorkoutSetFilled', () => {
        const realHasEmptyFields = SetUtils.hasEmptyFields;

        afterEach(() => {
            SetUtils.hasEmptyFields = realHasEmptyFields;
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
            SetUtils.hasEmptyFields = (set) => true;
            const state = {
                sets: {
                    workoutData: [{}, {}, {}, {}]
                }
            };
        
            const result = sut.getIsPreviousWorkoutSetFilled(state);
        
            expect(result).toBe(0);
        });

        test('1 if filled', () => {
            SetUtils.hasEmptyFields = (set) => false;
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

        test('string initialStartTime dates', () => {
            let a = {
                setID: 'a',
                initialStartTime: '2017-11-14T04:06:12.640Z',
                reps: []
            };
            let b = {
                setID: 'b',
                initialStartTime: '2017-11-14T04:06:27.169Z',
                reps: []
            };
            let c = {
                setID: 'c',
                initialStartTime: '2017-11-14T04:06:23.367Z',
                reps: []
            };
            let d = {
                setID: 'd',
                initialStartTime: '2017-11-13T09:24:52.812Z',
                reps: []
            }
            const state = {
                sets: {
                    historyData: {
                        a: a,
                        b: b,
                        c: c,
                        d: d,
                    }
                }
            };

            const result = sut.getHistorySetsChronological(state);

            expect(result[0]).toBe(d);
            expect(result[1]).toBe(a);
            expect(result[2]).toBe(c);
            expect(result[3]).toBe(b);
            expect(result.length).toBe(4);
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
        const realHasEmptyFields = SetUtils.hasEmptyFields;
        const realStartTime = SetUtils.startTime;
        
        afterEach(() => {
            SetUtils.hasEmptyFields = realHasEmptyFields;
            SetUtils.startTime = realStartTime;
        });

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
            SetUtils.hasEmptyFields = (set) => false;
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
            SetUtils.hasEmptyFields = (set) => false;
            SetUtils.startTime = (set) => 1;            
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

    describe.skip('getHistorySet', () => {
        // expanded isn't being used right now, so skipping
    });

    describe('getTimeSinceLastWorkout', () => {
        const realNow = Date.now;

        afterAll(() => {
            Date.now = realNow;
        });

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
            Date.now = () => 6000;
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

            const result = sut.getTimeSinceLastWorkout(state);

            expect(result).toBe(4000);
        });
    });

    describe('getBestOfMetrics', () => {
        var state = {
            sets: {
                workoutData: [{
                    setID: 'q',
                    exercise: 'Squat',
                    weight: 100,
                    metric: 'lbs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.333368, 388, 65, 24, 9, 12]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.033368, 378, 43, 69, 13, 8]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    tags: ['D', 'A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }, {
                    setID: 'r',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }, {
                    setID: 's',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 3.933368, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }, {
                    setID: 't',
                    exercise: 'Bench',
                    weight: 100,
                    metric: 'lbs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.433368, 288, 34, 14, 2, 7]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.234368, 178, 26, 11, 4, 9]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 0.483368, 28, 48, 13, 3, 5]
                    }],
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }, {
                    setID: 'u',
                    exercise: 'Deadlift',
                    weight: 100,
                    metric: 'lbs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.333368, 388, 38, 18, 1, 8]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.033368, 378, 37, 17, 1, 7]
                    }, {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 32, 22, 1, 12]
                    }],
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                {
                    setID: 'v',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 4.034, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    deleted: true,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }, 
                {
                    setID: 'w',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 5.034, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    deleted: true,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                {
                    setID: 'x',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 6.034, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    deleted: false,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                {
                    setID: 'y',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 4.034, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    deleted: false,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                {
                    setID: 'z',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [],
                    tags: ['A', 'B', 'C'],
                    deleted: false,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                {
                    setID: 'aa',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: false,
                        removed: true,
                        data: [-3456, 37, 6.034, 312, 34, 35, 1, 36]
                    }],
                    tags: ['A', 'B', 'C'],
                    deleted: false,
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                }],
                historyData: {
                    a: {
                        setID: 'a',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 200, 19, 10, 1, 4]
                        }, {
                            isValid: false,
                            removed: false,
                            data: [-3456, 37, 10.533368, 500, 70, 80, 1, 70]
                        }, {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.433368, 250, 25, 15, 1, 10]
                        }, {
                            isValid: true,
                            removed: true,
                            data: [-3456, 37, 0.533368, 50, 10, 20, 1, 2]
                        }, {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 0.233368, 400, 40, 30, 1, 20]
                        }],
                        tags: ['A', 'B', 'C', 'F'],
                        initialStartTime: '1-2-18'
                    },
                    b: {
                        setID: 'b',
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.943368, 388, 38, 28, 1, 18]
                        }],
                        tags: ['A', 'B', 'C'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    c: {
                        setID: 'c',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: false,
                            removed: false,
                            data: [-3456, 37, 1.733368, 288, 28, 18, 1, 8]
                        }],
                        tags: ['A', 'B', 'C'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    d: {
                        setID: 'd',
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 188, 18, 8, 1, 4]
                        }],
                        tags: ['A', 'B', 'C'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    e: {
                        setID: 'e',
                        exercise: 'Squat',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100, 10, 5, 1, 3]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300, 30, 20, 1, 10]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230, 23, 13, 1, 3]
                        }],
                        tags: ['A', 'B', 'C'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    f: {
                        setID: 'f',
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'kgs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100, 10, 5, 1, 3]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300, 30, 20, 1, 10]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230, 23, 13, 1, 3]
                        }],
                        tags: ['A', 'E', 'J', 'C', 'B'],
                        initialStartTime: '2018-01-03T04:06:12.640Z',
                    },
                    g: {
                        setID: 'g',
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'kgs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.933368, 288, 28, 28, 1, 28]
                        }],
                        tags: ['F'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    h: {
                        setID: 'h',
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'kgs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.933368, 288, 28, 28, 1, 28]
                        }],
                        tags: ['F'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    i: {
                        setID: 'i',
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'kgs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.933368, 288, 28, 28, 1, 28]
                        }],
                        tags: ['F'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    j: {
                        setID: 'j',
                        exercise: 'Squat',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100, 10, 5, 1, 3]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300, 30, 20, 1, 10]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230, 23, 13, 1, 3]
                        }],
                        tags: ['F'],
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    k: {
                        setID: 'm',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 3.034, 312, 34, 35, 1, 36]
                        }],
                        tags: ['A', 'B', 'C'],
                        deleted: true,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    }, 
                    l: {
                        setID: 'n',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 4.034, 312, 34, 35, 1, 36]
                        }],
                        tags: ['A', 'B', 'C'],
                        deleted: true,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    m: {
                        setID: 'o',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: true,
                            data: [-3456, 37, 5.034, 312, 34, 35, 1, 36]
                        }],
                        tags: ['A', 'B', 'C'],
                        deleted: false,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    n: {
                        setID: 'p',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: false,
                            removed: false,
                            data: [-3456, 37, 6.034, 312, 34, 35, 1, 36]
                        }],
                        tags: ['A', 'B', 'C'],
                        deleted: false,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    o: {
                        setID: 'q',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [],
                        tags: ['A', 'B', 'C'],
                        deleted: false,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    },
                    p: {
                        setID: 'r',
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: false,
                            removed: true,
                            data: [-3456, 37, 6.034, 312, 34, 35, 1, 36]
                        }],
                        tags: ['A', 'B', 'C'],
                        deleted: false,
                        initialStartTime: '2018-01-03T04:06:12.640Z'
                    }
                }
            },
            analysis: {
                e1RMDaysRange: 7,
                tagsToInclude: ['A', 'B', 'C'],
                tagsToExclude: ['F', 'G'],
            }
        };

        var setAnswerHistory = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
            }, {
                isValid: true,
                removed: false,
            }, {
                isValid: true,
                removed: false,
            }, {
                isValid: true,
                removed: true,
            }, {
                isValid: false,
                removed: true,
            }, {
                isValid: false,
                removed: false,
            }],
        };

        var setAnswerWorkout = {
            exercise: 'Squat',
            weight: 200,
            metric: 'kgs',
            reps: [{
                isValid: false,
                removed: true,
            }, {
                isValid: true,
                removed: true,
            }, {
                isValid: true,
                removed: false,
            }, {
                isValid: false,
                removed: false,
            }],
        };

        var deletedSet = {
            exercise: 'Squat',
            weight: 200,
            metric: 'kgs',
            reps: [{
                isValid: false,
                removed: true,
            }, {
                isValid: true,
                removed: true,
            }, {
                isValid: true,
                removed: false,
            }, {
                isValid: false,
                removed: false,
            }],
            deleted: true,
        };

        describe('getFastestAvgVelocityEver', () => {

            test('fastest avg vel found in history', () => {
                const result = sut.getFastestAvgVelocityEver(state, setAnswerHistory);
        
                expect(result).toBe(2.43);
            });

            test('fastest avg vel found in workout', () => {
                const result = sut.getFastestAvgVelocityEver(state, setAnswerWorkout);
        
                expect(result).toBe(3.93);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getFastestAvgVelocityEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getFastestAvgVelocityEver(state, set);
        
                expect(result).toBe(null);
            });

        });

        describe('getSlowestAvgVelocityEver', () => {
            
            test('slowest avg vel found in history', () => {
                const result = sut.getSlowestAvgVelocityEver(state, setAnswerHistory);
        
                expect(result).toBe(0.23);
            });

            test('slowest avg vel found in workout', () => {
                const result = sut.getSlowestAvgVelocityEver(state, setAnswerWorkout);
        
                expect(result).toBe(1.3);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getSlowestAvgVelocityEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getSlowestAvgVelocityEver(state, set);
        
                expect(result).toBe(null);
            });

            test('return null if set is deleted', () => {

                const result = sut.getFastestAvgVelocityEver(state, deletedSet);

                expect(result).toBe(null);
            });

            test('return null if set is deleted with same exercise/tags', () => {
                const deletedSet = {
                    setID: 'i',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    deleted: true,
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                };

                const result = sut.getFastestAvgVelocityEver(state, deletedSet);

                expect(result).toBe(null);
            });

        });
        
        describe('getFastestPKVEver', () => {

            test('fastest pkv found in history', () => {
                const result = sut.getFastestPKVEver(state, setAnswerHistory);
        
                expect(result).toBe(48);
            });

            test('fastest pkv found in workout', () => {
                const result = sut.getFastestPKVEver(state, setAnswerWorkout);
        
                expect(result).toBe(34);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getFastestPKVEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getFastestPKVEver(state, set);
        
                expect(result).toBe(null);
            });


            test('return null if set is deleted', () => {

                const result = sut.getFastestPKVEver(state, deletedSet);

                expect(result).toBe(null);
            });

            test('return null if set is deleted with same exercise/tags', () => {
                const deletedSet = {
                    setID: 'i',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    deleted: true,
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                };

                const result = sut.getFastestPKVEver(state, deletedSet);

                expect(result).toBe(null);
            });

        });

        describe('getSlowestPKVEver', () => {
            
            test('slowest pkv found in history', () => {
                const result = sut.getSlowestPKVEver(state, setAnswerHistory);
        
                expect(result).toBe(19);
            });

            test('slowest pkv found in workout', () => {
                const result = sut.getSlowestPKVEver(state, setAnswerWorkout);
        
                expect(result).toBe(10);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getSlowestPKVEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getSlowestPKVEver(state, set);
        
                expect(result).toBe(null);
            });


            test('return null if set is deleted', () => {

                const result = sut.getSlowestPKVEver(state, deletedSet);

                expect(result).toBe(null);
            });

            test('return null if set is deleted with same exercise/tags', () => {
                const deletedSet = {
                    setID: 'i',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    deleted: true,
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                };

                const result = sut.getSlowestPKVEver(state, deletedSet);

                expect(result).toBe(null);
            });

        });
        
        describe('getFastestDurationEver', () => {

            test('fastest duration found in history', () => {
                const result = sut.getFastestDurationEver(state, setAnswerHistory);
        
                expect(result).toBe(4);
            });

            test('fastest duration found in workout', () => {
                const result = sut.getFastestDurationEver(state, setAnswerWorkout);
        
                expect(result).toBe(3);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getFastestDurationEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getFastestDurationEver(state, set);
        
                expect(result).toBe(null);
            });


            test('return null if set is deleted', () => {

                const result = sut.getFastestDurationEver(state, deletedSet);

                expect(result).toBe(null);
            });

            test('return null if set is deleted with same exercise/tags', () => {
                const deletedSet = {
                    setID: 'i',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    deleted: true,
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                };

                const result = sut.getFastestDurationEver(state, deletedSet);

                expect(result).toBe(null);
            });

        });

        describe('getSlowestDurationEver', () => {
            
            test('slowest duration found in history', () => {
                const result = sut.getSlowestDurationEver(state, setAnswerHistory);
        
                expect(result).toBe(20);
            });

            test('slowest duration found in workout', () => {
                const result = sut.getSlowestDurationEver(state, setAnswerWorkout);
        
                expect(result).toBe(36);
            });
        
            test('return null when no history or workout data', () => {
                const state = {
                    sets: {
                        workoutData: [],
                        historyData: {}
                    }
                };
        
                const result = sut.getSlowestDurationEver(state, setAnswerHistory);
        
                expect(result).toBe(null);
            });

            test('null when set is not filled out', () => {
                const set = {
                    exercise: null,
                    weight: null,
                    metric: 'lbs',
                    reps: [],
                };

                const result = sut.getSlowestDurationEver(state, set);
        
                expect(result).toBe(null);
            });


            test('return null if set is deleted', () => {

                const result = sut.getSlowestDurationEver(state, deletedSet);

                expect(result).toBe(null);
            });

            test('return null if set is deleted with same exercise/tags', () => {
                const deletedSet = {
                    setID: 'i',
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.933368, 188, 18, 18, 1, 18]
                    }, {
                        isValid: false,
                        removed: false,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }, {
                        isValid: true,
                        removed: true,
                        data: [-3456, 37, 1.453368, 328, 83, 72, 11, 15]
                    }],
                    deleted: true,
                    tags: ['A', 'B', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                };

                const result = sut.getSlowestDurationEver(state, deletedSet);

                expect(result).toBe(null);
            });

        });

        describe('generateExerciseItems', () => {
            test('TODO: ACTUAL TEST NAME HERE', () => {
                const valid = { isValid: true, removed: false }
                const invalid = { isValid: false, removed: true }
                const removed = { isValid: true, removed: true }

                const state = {
                    sets: {
                        workoutData: [
                            { exercise: 'SSB Squat', reps: [] },
                            { exercise: 'Reverse Band Bench', reps: [valid, valid, invalid] },
                            { exercise: 'Deadlift w/ Chains', reps: [valid, invalid, valid, valid] },
                        ],
                        historyData: {
                            a: {
                                exercise: 'Box Squat w/ Bands',
                                reps: [valid, valid, invalid, valid]
                            },
                            b: {
                                exercise: 'Good Mornings w/ Bands & Chains in Belt Squat',
                                reps: [valid, removed, valid, valid, removed]
                            },
                            c: {
                                exercise: 'Zercher Squats',
                                reps: [removed]
                            },
                            d: {
                                exercise: 'Close Grip Bench Press',
                                reps: [valid]
                            },
                            e: {
                                exercise: 'Box Squat w/ Bands',
                                reps: [],
                            },
                            f: {
                                exercise: 'Reverse Band Bench',
                                reps: [invalid, valid]
                            }
                        }
                    }
                }
                
                const expected = [
                    {"label": "box squat w/ bands", "value": "box squat w/ bands"}, 
                    {"label": "good mornings w/ bands & chains in belt squat", "value": "good mornings w/ bands & chains in belt squat"}, 
                    {"label": "close grip bench press", "value": "close grip bench press"}, 
                    {"label": "reverse band bench", "value": "reverse band bench"}, 
                    {"label": "deadlift w/ chains", "value": "deadlift w/ chains"}
                ];

                const result = sut.generateExerciseItems(state);

                expect(result).toEqual(expected);
            });
        });
    });

    describe('getFilteredHistorySets', () => {
        var validUnremoved = { isValid: true, removed: false }; // acceptable
        var invalidUnremoved = { isValid: false, removed: false }; // unacceptable
        var validRemoved = { isValid: true, removed: true }; // unacceptable
        var invalidRemoved = { isValid: false, removed: true }; // unacceptable

        var state = null;
        var historyData = null;
        
        beforeEach(() => {
            state = {
                sets: {
                    historyData: {
                        '1': {
                            setID: '1',
                            exercise: 'Squat',
                            weight: 125,
                            rpe: '6.5',
                            tags: ['single'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved],
                        },
                        '2': {
                            setID: '2',
                            exercise: 'Squat',
                            weight: 130,
                            rpe: '7',
                            tags: ['belt', 'single'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved],
                        },
                        '3': {
                            setID: '3',
                            exercise: 'Squat',
                            weight: 140,
                            rpe: '7,5',
                            tags: ['single', 'belt'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validRemoved],
                        },
                        '4': {
                            setID: '4',
                            exercise: 'Squat',
                            weight: 120,
                            rpe: null,
                            tags: ['backoff', 'volume'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '5': {
                            setID: '5',
                            exercise: 'Squat',
                            weight: 120,
                            rpe: '8',
                            tags: ['backoff', 'volume'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '6': {
                            setID: '6',
                            exercise: 'Squat',
                            weight: 120,
                            rpe: '8',
                            tags: ['backoff'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved, validRemoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '7': {
                            setID: '7',
                            exercise: 'SSB Squat',
                            weight: 80,
                            rpe: '7',
                            tags: ['volume'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [invalidUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved]
                        },
                        '8': {
                            setID: '8',
                            exercise: 'SSB Squat',
                            weight: 80,
                            rpe: '7',
                            tags: ['rounding', 'volume', 'knee cave'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '9': {
                            setID: '9',
                            exercise: 'SSB Squat',
                            weight: 80,
                            rpe: '7',
                            tags: ['volume'],
                            workoutID: 'A',
                            initialStartTime: '2018-03-11',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '10': {
                            setID: '10',
                            exercise: 'Bench',
                            weight: 80,
                            rpe: '7',
                            tags: ['single'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved],
                        },
                        '11': {
                            setID: '11',
                            exercise: 'Bench',
                            weight: 85,
                            rpe: '8',
                            tags: ['loose', 'single'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved],
                        },
                        '12': {
                            setID: '12',
                            exercise: 'Bench',
                            weight: 90,
                            rpe: '8',
                            tags: ['single'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [invalidRemoved],
                        },
                        '13': {
                            setID: '13',
                            exercise: 'Bench',
                            tags: ['backoff', 'volume'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '14': {
                            setID: '14',
                            exercise: 'Bench',
                            tags: ['backoff', 'volume'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, invalidUnremoved, validUnremoved, validUnremoved],
                        },
                        '15': {
                            setID: '15',
                            exercise: 'Bench',
                            tags: ['backoff', 'volume'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '16': {
                            setID: '16',
                            exercise: 'Bench',
                            tags: ['backoff', 'volume', 'close grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '17': {
                            setID: '17',
                            exercise: 'Incline Bench',
                            tags: ['volume', 'wide grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '18': {
                            setID: '18',
                            exercise: 'Incline Bench',
                            tags: ['volume', 'wide grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '19': {
                            setID: '19',
                            exercise: 'Incline Bench',
                            tags: ['volume', 'wide grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '20': {
                            setID: '20',
                            exercise: 'Incline Bench',
                            tags: ['volume', 'wide grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '21': {
                            setID: '21',
                            exercise: 'Incline Bench',
                            tags: ['volume', 'wide grip'],
                            workoutID: 'B',
                            initialStartTime: '2018-03-13',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '22': {
                            setID: '22',
                            exercise: 'Squat',
                            weight: 115,
                            rpe: '7,5',
                            tags: ['volume', 'belt', 'knee cave', 'knee wraps'],
                            workoutID: 'C',
                            initialStartTime: '2018-03-15',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '23': {
                            setID: '23',
                            exercise: 'Squat',
                            weight: 115,
                            rpe: '7',
                            tags: ['belt', 'volume'],
                            workoutID: 'C',
                            initialStartTime: '2018-03-15',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '24': {
                            setID: '24',
                            exercise: 'Squat',
                            weight: 115,
                            rpe: '7',
                            tags: ['volume'],
                            workoutID: 'C',
                            initialStartTime: '2018-03-15',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        },
                        '25': {
                            setID: '25',
                            exercise: 'Squat',
                            weight: 115,
                            rpe: '8.5',
                            tags: ['volume'],
                            workoutID: 'C',
                            initialStartTime: '2018-03-15',
                            metric: 'kgs',
                            reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                        }
                    }
                },
                history: {
                    exercise: 'Squat',
                    tagsToInclude: [],
                    tagsToExclude: [],
                    startingRPE: '7',
                    endingRPE: '9',
                    startingWeight: 260,
                    startingWeightMetric: 'lbs',
                    endingWeight: 130,
                    endingWeightMetric: 'kgs',
                    startingRepRange: 1,
                    endingRepRange: 6,
                    startingDate: '2018-03-05',
                    endingDate: '2018-03-20',
                }
            };

            historyData = sut.getHistorySets(state);
        });

        // testing with invalidUnremoved, validUnremoved, invalidRemoved, etc.
        // TODO: Test with , RPE's
        // TODO: Tests with no RPE's

        test('return filtered history list', () => {
            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "2",
                "tags": ["belt", "single"],
                "weight": 130,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "5",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": true
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "6",
                "tags": ["backoff"],
                "weight": 120,
                "workoutID": "A"
            }]);
        });

        test('return only exercise when no other filtering is on', () => {
            state.history = {
                exercise: 'Bench',
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: null,
                startingWeight: null,
                startingWeightWeight: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            }

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "10",
                "tags": ["single"],
                "weight": 80,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "11",
                "tags": ["loose", "single"],
                "weight": 85,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "13",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": false,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "14",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "15",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "16",
                "tags": ["backoff", "volume", "close grip"],
                "workoutID": "B"
            }]);
        });

        // test for when starting date is not filled but end is
        test('return sets only after start date', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: '2018-03-14',
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7,5",
                "setID": "22",
                "tags": ["volume", "belt", "knee cave", "knee wraps"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "23",
                "tags": ["belt", "volume"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "24",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8.5",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });

        // test for when no start date, but end date
        test('return sets only before end date', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: '2018-03-14',
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "6.5",
                "setID": "1",
                "tags": ["single"],
                "weight": 125,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "2",
                "tags": ["belt", "single"],
                "weight": 130,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": true
                }],
                "rpe": "7,5",
                "setID": "3",
                "tags": ["single", "belt"],
                "weight": 140,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": null,
                "setID": "4",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "5",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": true
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "6",
                "tags": ["backoff"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "7",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "8",
                "tags": ["rounding", "volume", "knee cave"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "9",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "10",
                "tags": ["single"],
                "weight": 80,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "11",
                "tags": ["loose", "single"],
                "weight": 85,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "13",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": false,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "14",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "15",
                "tags": ["backoff", "volume"],
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "16",
                "tags": ["backoff", "volume", "close grip"],
                "workoutID": "B"
            }, {
                "exercise": "Incline Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "17",
                "tags": ["volume", "wide grip"],
                "workoutID": "B"
            }, {
                "exercise": "Incline Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "18",
                "tags": ["volume", "wide grip"],
                "workoutID": "B"
            }, {
                "exercise": "Incline Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "19",
                "tags": ["volume", "wide grip"],
                "workoutID": "B"
            }, {
                "exercise": "Incline Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "20",
                "tags": ["volume", "wide grip"],
                "workoutID": "B"
            }, {
                "exercise": "Incline Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "setID": "21",
                "tags": ["volume", "wide grip"],
                "workoutID": "B"
            }]);
        });

        // test for when start rpe but no end rpe
        test('return sets only greater than or equal to start rpe', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: '8',
                endingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "5",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": true
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "6",
                "tags": ["backoff"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "11",
                "tags": ["loose", "single"],
                "weight": 85,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8.5",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });

        // test for when no start rpe but end rpe
        test('return sets only less than or equal to end rpe', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: '8',
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "6.5",
                "setID": "1",
                "tags": ["single"],
                "weight": 125,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "2",
                "tags": ["belt", "single"],
                "weight": 130,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": true
                }],
                "rpe": "7,5",
                "setID": "3",
                "tags": ["single", "belt"],
                "weight": 140,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "5",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": true
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "6",
                "tags": ["backoff"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "7",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "8",
                "tags": ["rounding", "volume", "knee cave"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "9",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "10",
                "tags": ["single"],
                "weight": 80,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "11",
                "tags": ["loose", "single"],
                "weight": 85,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7,5",
                "setID": "22",
                "tags": ["volume", "belt", "knee cave", "knee wraps"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "23",
                "tags": ["belt", "volume"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "24",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });

        // test for start weight but no end -- also tests for null weights as incline has no weights 
        test('return sets after start weight', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: null,
                startingWeight: 105,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "6.5",
                "setID": "1",
                "tags": ["single"],
                "weight": 125,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "2",
                "tags": ["belt", "single"],
                "weight": 130,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": true
                }],
                "rpe": "7,5",
                "setID": "3",
                "tags": ["single", "belt"],
                "weight": 140,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": null,
                "setID": "4",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "5",
                "tags": ["backoff", "volume"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": true
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "6",
                "tags": ["backoff"],
                "weight": 120,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7,5",
                "setID": "22",
                "tags": ["volume", "belt", "knee cave", "knee wraps"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "23",
                "tags": ["belt", "volume"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "24",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-15",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8.5",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });
        
        // test for no start weight but end -- Also tests against sets with no weights as Incline Bench should not appear
        test('return sets before end weight', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                endingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: 110,
                endingWeightMetric: 'kgs',
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "7",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "8",
                "tags": ["rounding", "volume", "knee cave"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "SSB Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }, {
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "9",
                "tags": ["volume"],
                "weight": 80,
                "workoutID": "A"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "10",
                "tags": ["single"],
                "weight": 80,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "8",
                "setID": "11",
                "tags": ["loose", "single"],
                "weight": 85,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }]);
        });

        test('return no sets if there are no weights logged for the exercise', () => {
            state.history = {
                exercise: 'Incline Bench',
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: null,
                startingWeight: 100,
                startingWeightMetric: 'kgs',
                endingWeight: 150,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([]);
        });

        // test for tags to include 
        test('return sets with tags to include', () => {
            state.history = {
                exercise: null,
                tagsToInclude: ['volume', 'belt'],
                tagsToExclude: ['knee cave', 'rounding', 'loose'],
                startingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat", 
                "initialStartTime": "2018-03-15", 
                "metric": "kgs", 
                "reps": [
                    {"isValid": true, "removed": false}, 
                    {"isValid": true, "removed": false}, 
                    {"isValid": true, "removed": false}, 
                    {"isValid": true, "removed": false}, 
                    {"isValid": true, "removed": false}, 
                    {"isValid": true, "removed": false}
                ], 
                "rpe": "7", 
                "setID": "23", 
                "tags": ["belt", "volume"], 
                "weight": 115, 
                "workoutID": "C"
            }]);
        });

        // test for tags to exclude
        test('return sets with tags to exclude', () => {
            state.history = {
                exercise: null,
                tagsToInclude: [],
                tagsToExclude: ['backoff', 'volume', 'loose', 'knee cave'],
                startingRPE: null,
                endingRPE: null,
                startingWeight: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.getFilteredHistorySets(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "6.5",
                "setID": "1",
                "tags": ["single"],
                "weight": 125,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "2",
                "tags": ["belt", "single"],
                "weight": 130,
                "workoutID": "A"
            }, {
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": true
                }],
                "rpe": "7,5",
                "setID": "3",
                "tags": ["single", "belt"],
                "weight": 140,
                "workoutID": "A"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": false
                }],
                "rpe": "7",
                "setID": "10",
                "tags": ["single"],
                "weight": 80,
                "workoutID": "B"
            }, {
                "exercise": "Bench",
                "initialStartTime": "2018-03-13",
                "metric": "kgs",
                "reps": [{
                    "isValid": false,
                    "removed": true
                }],
                "rpe": "8",
                "setID": "12",
                "tags": ["single"],
                "weight": 90,
                "workoutID": "B"
            }]);
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
