import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';

describe('SetsSelectors', () => {
    describe('lastWorkoutRepTime', () => {
        const realEndTime = SetTimeCalculator.endTime;

        afterEach(() => {
            SetTimeCalculator.endTime = realEndTime;
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
            SetTimeCalculator.endTime = () => null;
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.lastWorkoutRepTime(state);

            expect(result).toBeNull();
        });

        test('null if no end time on any set', () => {
            SetTimeCalculator.endTime = () => null;
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
            SetTimeCalculator.endTime = () => expected;
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
            SetTimeCalculator.endTime = () => {
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
        const realIsUntouched = SetEmptyCheck.isUntouched;

        afterEach(() => {
            SetEmptyCheck.isUntouched = realIsUntouched; 
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
            SetEmptyCheck.isUntouched = () => false;
            const state = {
                sets: {
                    workoutData: [{}]
                }
            };

            const result = sut.getIsWorkoutEmpty(state);

            expect(result).toBe(false);
        });

        test('true when 1 set untouched', () => {
            SetEmptyCheck.isUntouched = () => true;
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
        const realHasEmptyFields = SetEmptyCheck.hasEmptyFields;
        
        afterEach(() => {
            SetEmptyCheck.hasEmptyFields = realHasEmptyFields;
        });

        test('3 fields', () => {
            SetEmptyCheck.hasEmptyFields = (set) => set;
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
        const realHasEmptyFields = SetEmptyCheck.hasEmptyFields;

        beforeAll(() => {
            SetEmptyCheck.hasEmptyFields = (set) => set;            
        });
        
        afterAll(() => {
            SetEmptyCheck.hasEmptyFields = realHasEmptyFields;
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

    describe('getWorkoutDuration', () => {
        const realNow = Date.now;
        const realStartTime = SetTimeCalculator.startTime;

        afterAll(() => {
            Date.now = realNow;
            SetTimeCalculator.startTime = realStartTime;
        });

        test('0', () => {
            const state = {
                sets: {
                    workoutData: []
                }
            };
            SetTimeCalculator.startTime = () => new Date(0);
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
            SetTimeCalculator.startTime = () => new Date(5000);
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
            SetTimeCalculator.startTime = () => new Date(3000);
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
        const realHasEmptyReps = SetEmptyCheck.hasEmptyReps;

        beforeAll(() => {
            SetEmptyCheck.hasEmptyReps = (set) => set;            
        });

        afterAll(() => {
            SetEmptyCheck.hasEmptyReps = realHasEmptyReps;
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
        const realHasEmptyFields = SetEmptyCheck.hasEmptyFields;

        afterEach(() => {
            SetEmptyCheck.hasEmptyFields = realHasEmptyFields;
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
            SetEmptyCheck.hasEmptyFields = (set) => true;
            const state = {
                sets: {
                    workoutData: [{}, {}, {}, {}]
                }
            };
        
            const result = sut.getIsPreviousWorkoutSetFilled(state);
        
            expect(result).toBe(0);
        });

        test('1 if filled', () => {
            SetEmptyCheck.hasEmptyFields = (set) => false;
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
        const realHasEmptyFields = SetEmptyCheck.hasEmptyFields;
        const realStartTime = SetTimeCalculator.startTime;
        
        afterEach(() => {
            SetEmptyCheck.hasEmptyFields = realHasEmptyFields;
            SetTimeCalculator.startTime = realStartTime;
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
            SetEmptyCheck.hasEmptyFields = (set) => false;
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
            SetEmptyCheck.hasEmptyFields = (set) => false;
            SetTimeCalculator.startTime = (set) => 1;            
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
                }, {
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
                }, {
                    exercise: 'Squat',
                    weight: 200,
                    metric: 'kgs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 3.933368, 312, 34, 35, 1, 36]
                    }],
                }, {
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
                }, {
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
                }],
                historyData: {
                    a: {
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
                        }]
                    },
                    b: {
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.943368, 388, 38, 28, 1, 18]
                        }],
                    },
                    c: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.733368, 288, 28, 18, 1, 8]
                        }],
                    },
                    d: {
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 188, 18, 8, 1, 4]
                        }],
                    },
                    e: {
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
                        }]
                    },
                    f: {
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
                        }]
                    },
                    g: {
                        exercise: 'Squat',
                        weight: 200,
                        metric: 'kgs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.933368, 288, 28, 28, 1, 28]
                        }]
                    },
                }
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

        });
        
        describe('getExerciseData', () => {

            test('return data', () => {
                const expected = [[100, 1.83], [100, 1.73], [200, 1.83], [100, 1.43]];
                
                const result = sut.getExerciseData(state, 'Bench');

                expect(result).toEqual(expected);
            });
        });

        describe('get 1rm', () => {
            const result = sut.get1rm(state, 'Bench');

            expect(result).toEqual({ "velocity": 1.83, "weight": 100, "confidence": 19 });
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
