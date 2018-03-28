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
                        tags: ['single', 'belt'],
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
                        tags: ['single', 'belt'],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: ['single'],
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
                        tags: ['backoff'],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '14': {
                        setID: '14',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, invalidUnremoved, validUnremoved, validUnremoved],
                    },
                    '15': {
                        setID: '15',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '16': {
                        setID: '16',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '17': {
                        setID: '17',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '18': {
                        setID: '18',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '19': {
                        setID: '19',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '20': {
                        setID: '20',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                        reps: [validUnremoved, validUnremoved, validUnremoved, validUnremoved, validUnremoved],
                    },
                    '21': {
                        setID: '21',
                        exercise: 'Incline Bench',
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                        tags: [],
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
                startingRPE: 7,
                endingRPE: 9,
                startingWeight: 100,
                endingWeight: 120,
                startingRepRange: 1,
                endingRepRange: 5,
                startingDate: '2018-03-05',
                endingDate: '2018-03-20',
            }
        }

        test('return filtered history list', () => {
            let historyData = SetsSelectors.getHistorySets(state);

            const result = sut.filterHistory(historyData, state);

            expect(result).toEqual([
                {
                    "exercise": "Squat", 
                    "initialStartTime": "2018-03-11", 
                    "metric": "kgs", 
                    "reps": [
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}], 
                    "rpe": "8",
                    "setID": "4", 
                    "tags": [], 
                    "weight": 120, 
                    "workoutID": "A"
                }, 
                {
                    "exercise": "Squat", 
                    "initialStartTime": "2018-03-11", 
                    "metric": "kgs", 
                    "reps": [
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}
                    ], 
                    "rpe": "8", 
                    "setID": "5", 
                    "tags": [], 
                    "weight": 120, 
                    "workoutID": "A"
                }, 
                {
                    "exercise": "Squat", 
                    "initialStartTime": "2018-03-11", 
                    "metric": "kgs", 
                    "reps": [
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": true}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}, 
                        {"isValid": true, "removed": false}
                    ], 
                    "rpe": "8", 
                    "setID": "6", 
                    "tags": [], 
                    "weight": 120, 
                    "workoutID": "A"
                }
            ]);
        });

    });

});

