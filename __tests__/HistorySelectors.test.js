import * as sut from 'app/redux/selectors/HistorySelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

describe('HistorySelectors', () => {

    describe('filterHistory', () => {
        var validUnremoved = { isValid: true, removed: false }; // acceptable
        var invalidUnremoved = { isValid: false, removed: false }; // unacceptable
        var validRemoved = { isValid: true, removed: true }; // unacceptable
        var invalidRemoved = { isValid: false, removed: true }; // unacceptable

        var state = {
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
                        rpe: '9',
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
                        rpe: '8',
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
                        rpe: '7',
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
                        rpe: '7',
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
                startingWeight: 100,
                startingWeightMetric: 'lbs',
                endingWeight: 120,
                endingWeightMetric: 'kgs',
                startingRepRange: 1,
                endingRepRange: 6,
                startingDate: '2018-03-05',
                endingDate: '2018-03-20',
            }
        }

        var historyData = SetsSelectors.getHistorySets(state);

        // testing with invalidUnremoved, validUnremoved, invalidRemoved, etc.
        // TODO: Test with , RPE's
        // TODO: Test with no weight sets

        test('return filtered history list', () => {
            const result = sut.filterHistory(historyData, state);

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
                "rpe": "7",
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
                "rpe": "7",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
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

            const result = sut.filterHistory(historyData, state);

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

            const result = sut.filterHistory(historyData, state);

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
                "rpe": "7",
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
                "rpe": "7",
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

            const result = sut.filterHistory(historyData, state);

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
                "rpe": "9",
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

            const result = sut.filterHistory(historyData, state);

            expect(result).toEqual([{
                "exercise": "Squat",
                "initialStartTime": "2018-03-11",
                "metric": "kgs",
                "reps": [{
                    "isValid": true,
                    "removed": true
                }],
                "rpe": "9",
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

            const result = sut.filterHistory(historyData, state);

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
                "rpe": "7",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });

        // test for start weight but no end
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

            const result = sut.filterHistory(historyData, state);

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
                "rpe": "9",
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
                "rpe": "7",
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
                "rpe": "7",
                "setID": "25",
                "tags": ["volume"],
                "weight": 115,
                "workoutID": "C"
            }]);
        });
        
        // test for no start weight but end
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

            const result = sut.filterHistory(historyData, state);

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

        // test for tags to include 
        test('return sets with tags to include', () => {
            state.history = {
                exercise: null,
                tagsToInclude: ['volume', 'belt'],
                tagsToExclude: ['knee cave', 'rounding', 'loose'],
                startingRPE: null,
                startingWeightMetric: 'kgs',
                endingWeight: null,
                endingWeightMetric: 'kgs',
                startingRepRange: null,
                endingRepRange: null,
                startingDate: null,
                endingDate: null,
            };

            const result = sut.filterHistory(historyData, state);

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

            const result = sut.filterHistory(historyData, state);

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
                "rpe": "9",
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
});
