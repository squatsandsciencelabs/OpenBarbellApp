import * as sut from 'app/redux/selectors/SetsSelectors';
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';

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
            Date.now = () => new Date(0);

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
            Date.now = () => new Date(6000);

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
            Date.now = () => new Date(8000);

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

    describe.skip('getExpandedHistorySet', () => {
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
            Date.now = () => new Date(6000);
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

describe('getBestAvgVelocityEver', () => {

    test('get best avg velocity ever', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 388]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.433368, 388]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.533368, 388]
                        }
                    ]},
                    b: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.933368, 388]
                        }],
                    },
                    c: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.733368, 388]
                        }],
                    },
                    d: {
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 388]
                        }],
                    },
                    e: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 388]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 388]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 388]
                        }
                    ]},
                }
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 388]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 388]
            }],
        };

        let result = sut.getBestAvgVelocityEver(state, set);

        expect(result).toBe(2.4);
    });

    test('return null when no history data', () => {
        const state = {
            sets: {
                historyData: {}
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 388]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 388]
            }],
        };

        let result = sut.getBestAvgVelocityEver(state, set);

        expect(result).toBe(null);
    });
});

describe('getBestROMEver', () => {

    test('get best rom ever', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 200]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.433368, 250]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.533368, 400]
                        }
                    ]},
                    b: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.933368, 388]
                        }],
                    },
                    c: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.733368, 288]
                        }],
                    },
                    d: {
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 188]
                        }],
                    },
                    e: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230]
                        }
                    ]},
                }
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 378]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 328]
            }],
        };

        let result = sut.getBestROMEver(state, set);

        expect(result).toBe(400);
    });

    test('return null when no history data', () => {
        const state = {
            sets: {
                historyData: {}
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 388]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 388]
            }],
        };

        let result = sut.getBestROMEver(state, set);

        expect(result).toBe(null);
    });
});

// PKV
            
describe('getBestPKVEver', () => {

    test('get best pkv ever', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 200, 20]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.433368, 250, 25]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.533368, 400, 40]
                        }
                    ]},
                    b: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.933368, 388, 38]
                        }],
                    },
                    c: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.733368, 288, 28]
                        }],
                    },
                    d: {
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 188, 18]
                        }],
                    },
                    e: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100, 10]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300, 30]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230, 23]
                        }
                    ]},
                }
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388, 38]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 378, 37]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 328, 32]
            }],
        };

        let result = sut.getBestPKVEver(state, set);

        expect(result).toBe(40);
    });

    test('return null when no history data', () => {
        const state = {
            sets: {
                historyData: {}
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388, 38]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 388, 38]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 388, 38]
            }],
        };

        let result = sut.getBestPKVEver(state, set);

        expect(result).toBe(null);
    });
});       

// PKH

describe('getBestPKHEver', () => {
    
    test('get best pkh ever', () => {
        const state = {
            sets: {
                historyData: {
                    a: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 200, 20, 10]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.433368, 250, 25, 15]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.533368, 400, 40, 30]
                        }
                    ]},
                    b: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.933368, 388, 38, 28]
                        }],
                    },
                    c: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.733368, 288, 28, 18]
                        }],
                    },
                    d: {
                        exercise: 'Bench',
                        weight: 200,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.833368, 188, 18, 8]
                        }],
                    },
                    e: {
                        exercise: 'Bench',
                        weight: 100,
                        metric: 'lbs',
                        reps: [{
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.3, 100, 10, 5]
                        }, 
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 1.9, 300, 30, 20]
                        },
                        {
                            isValid: true,
                            removed: false,
                            data: [-3456, 37, 2.4, 230, 23, 13]
                        }
                    ]},
                }
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388, 38, 18]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 378, 37, 17]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 328, 32, 22]
            }],
        };

        let result = sut.getBestPKHEver(state, set);

        expect(result).toBe(30);
    });

    test('return null when no history data', () => {
        const state = {
            sets: {
                historyData: {}
            }
        };

        let set = {
            exercise: 'Bench',
            weight: 100,
            metric: 'lbs',
            reps: [{
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.333368, 388, 38, 28]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.033368, 388, 38, 28]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.453368, 388, 38, 28]
            }],
        };

        let result = sut.getBestPKHEver(state, set);

        expect(result).toBe(null);
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
