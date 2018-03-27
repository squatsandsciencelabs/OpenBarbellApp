import * as sut from 'app/redux/selectors/HistorySelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

describe('HistorySelectors', () => {

    describe('filterHistory', () => {

        beforeAll(() => {
            Date.now = () => 1522555200000;
        });
    
        afterAll(() => {
            Date.now = realNow;
        });

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
                        reps: [{}]
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
                        reps: [{}]
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
                        reps: [{}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}, {}, {}, {}, {}]
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
                        reps: [{}]
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
                        reps: [{}]
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
                        reps: [{}]
                    },
                    '13': {
                        setID: '13',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '14': {
                        setID: '14',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '15': {
                        setID: '15',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '16': {
                        setID: '16',
                        exercise: 'Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '17': {
                        setID: '17',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '18': {
                        setID: '18',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '19': {
                        setID: '19',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '20': {
                        setID: '20',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
                    },
                    '21': {
                        setID: '21',
                        exercise: 'Incline Bench',
                        tags: [],
                        workoutID: 'B',
                        initialStartTime: '2018-03-13',
                        metric: 'kgs',
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
                        reps: [{}, {}, {}]
                    }
                }
            },
            history: {
                exercise: 'Squat',
                tagsToInclude: [],
                tagsToExclude: [],
                startingRPE: 6.5,
                endingRPE: 9,
                startingWeight: 100,
                endingWeight: 150,
                startingReps: null,
                endingReps: null,
                startingDate: null,
                endingDate: null,
            }
        }

        test('return filtered history list', () => {
            let historyData = SetsSelectors.getHistorySets(state);

            const result = sut.filterHistory(historyData, state);

            expect(result).toBe([]);
        });

    });

});

