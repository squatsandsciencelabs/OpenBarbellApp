import * as sut from 'app/math/OneRMCalculator';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

describe('1RM', () => {
    // edge cases:
    // test for metrics - sprinkle some KG ones around
    // test for velocities with fastest or slowest speeds - sprinkle some odd ones in the middle of some sets
    // move over tags tests
    beforeAll(() => {
        Date.now = () => 1514782800000;
    });

    afterAll(() => {
        Date.now = realNow;
    });

    var state = {
        sets: {
            workoutData: [
                { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                    ],
                    tags: ['a', 'c', 'b'],
                    metric: 'kgs',
                    initialStartTime: '2018-01-21T04:06:12.640Z', 
                },
                // higher RPE1rm than set j so should be in active
                { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                    ], 
                    tags: ['C', 'B', 'a', 'f'],
                    metric: 'lbs',
                    initialStartTime: '2018-01-21T04:06:12.640Z',
                },
                { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                        {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                        {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                    ],
                    tags: ['b', 'A', 'c'],
                    metric: 'kgs',
                    initialStartTime: '2018-01-21T04:06:12.640Z',
                },
                { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                    ],
                    tags: ['B', 'c', 'A'],
                    metric: 'lbs',
                    initialStartTime: '2018-01-21T04:06:12.640Z',
                },
                { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                    ],
                    tags: ['h', 'B', 'c', 'A'],
                    metric: 'lbs',
                    initialStartTime: '2018-01-21T04:06:12.640Z',
                },
                { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                        {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                        {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                    ],
                    tags: ['B', 'c', 'A'],
                    metric: 'lbs',
                    initialStartTime: '2018-01-21T04:06:12.640Z',
                },
                { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                        {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-26T04:06:12.640Z',
                },
            ],
            historyData: {
                a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.51', '560', '.42']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.35']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.33']}
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.59']}, 
                        {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.42', '560', '.53']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.33']}
                    ],
                    tags: [],
                    metric: 'kgs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                c: { setID: 'c', exercise: 'Squat', weight: '350', RPE: '8', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.53']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.49']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.43']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.31']}
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-07T04:06:12.640Z',
                },
                g: { setID: 'g', exercise: 'Deadlift', weight: '485', workoutID: 'bc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                        {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-12T04:06:12.640Z',
                },
                h: { setID: 'h', exercise: 'Squat', weight: '290', RPE: '6.5', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.59']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.55']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.53']}, 
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                i: { setID: 'i', exercise: 'Squat', weight: '330', RPE: '7', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                // lower RPE1rm than set p so should go into unused
                j: { setID: 'j', exercise: 'Squat', weight: '375', RPE: '8', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                k: { setID: 'k', exercise: 'Bench', weight: '190', RPE: '6', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                        {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                        {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                        {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                m: { setID: 'm', exercise: 'Bench', weight: '245', RPE: '8', workoutID: 'abc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                        {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                        {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-14T04:06:12.640Z',
                },
                n: { setID: 'n', exercise: 'Deadlift', RPE: '9', workoutID: 'bc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.18', '310', '.32']},
                        {isValid: true, removed: false, data: ['0', '2', '.15', '308', '.25']},
                    ],
                    tags: [],
                    metric: 'lbs',
                    initialStartTime: '2018-01-19T04:06:12.640Z',
                },
            },
        },
        analysis: {
            exercise: 'Squat',
            daysRange: 30,
            velocitySlider: .15,
            tagsToInclude: [],
            tagsToExclude: [],
        },
        settings: {
            defaultMetric: 'lbs',
        }
    };

    test('return null if no data', () => {
        const state = {
            sets: {
                workoutData: [],
                historyData: {}
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 7,
                velocitySlider: .15,
                tagsToInclude: ['A', 'B'],
                tagsToExclude: ['F', 'C', 'G'],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };
            
        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual({"active": [], "e1RM": null, "errors": [], "isRegressionNegative": false, "maxX": 0, "maxY": 0, "minX": 0, "minY": 0, "r2": null, "regressionPoints": [null, null], "slope": false, "unused": []});
    });

    test('return 1rm with proper data', () => {
        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual(
            {
                "active": [
                    {"marker": "270.00lbs, 0.51m/s", "setID": "a", "workoutID": "ab", "x": 270, "y": 0.51}, 
                    {"marker": "290.00lbs, 0.41m/s", "setID": "h", "workoutID": "abc", "x": 290, "y": 0.41}, 
                    {"marker": "330.00lbs, 0.37m/s", "setID": "i", "workoutID": "abc", "x": 330, "y": 0.37}, 
                    {"marker": "350.00lbs, 0.41m/s", "setID": "c", "workoutID": "ab", "x": 350, "y": 0.41}, 
                    {"marker": "354.94lbs, 0.42m/s", "setID": "o", "workoutID": null, "x": 354.94424182, "y": 0.42}, 
                    {"marker": "375.00lbs, 0.35m/s", "setID": "p", "workoutID": null, "x": 375, "y": 0.35}], 
                "e1RM": 590, 
                "errors": [
                    {"marker": "308.65lbs, 0.49m/s", "setID": "b", "workoutID": "ab", "x": 308.6471668, "y": 0.49}, 
                    {"marker": "396.83lbs, 0.3m/s", "setID": "q", "workoutID": null, "x": 396.83207159999995, "y": 0.3}
                ], 
                "isRegressionNegative": true, 
                "maxX": 396.83207159999995, 
                "maxY": 0.51, 
                "minX": 270, 
                "minY": 0.3, 
                "r2": 57, 
                "regressionPoints": [
                    {"x": 0, "y": 0.74}, {"x": 740.0000000000001, "y": 0}
                ], 
                "slope": -0.0009999999999999998, 
                "unused": [
                    {"marker": "", "setID": "j", "workoutID": "abc", "x": 375, "y": 0.31}
                ]
            }
        );
    });

    // test buckets in that highest RPE1rm is taken and unused has the unused one
    test('cherry pick highest RPE1rm', () => {
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-26T04:06:12.640Z',
                    },
                ],
                historyData: {
                    a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.51', '560', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.35']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.59']}, 
                            {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.42', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'kgs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    c: { setID: 'c', exercise: 'Squat', weight: '350', RPE: '8', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.31']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    g: { setID: 'g', exercise: 'Deadlift', weight: '485', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-12T04:06:12.640Z',
                    },
                    h: { setID: 'h', exercise: 'Squat', weight: '290', RPE: '6.5', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.59']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.53']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    i: { setID: 'i', exercise: 'Squat', weight: '330', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    // lower RPE1rm than set p so should go into unused
                    j: { setID: 'j', exercise: 'Squat', weight: '375', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '215', RPE: '6', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '215', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    n: { setID: 'n', exercise: 'Deadlift', RPE: '9', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.18', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.15', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-19T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: [],
                tagsToExclude: [],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        // unused should have k and l
        expect(results).toEqual(
            {
                "active": [
                    {"marker": "175.00lbs, 0.41m/s", "setID": "d", "workoutID": "ab", "x": 175, "y": 0.41}, 
                    {"marker": "202.00lbs, 0.37m/s", "setID": "e", "workoutID": "ab", "x": 202, "y": 0.37}, 
                    {"marker": "215.00lbs, 0.29m/s", "setID": "m", "workoutID": "abc", "x": 215, "y": 0.29}, 
                    {"marker": "230.00lbs, 0.34m/s", "setID": "f", "workoutID": "ab", "x": 230, "y": 0.34},
                    {"marker": "235.00lbs, 0.37m/s", "setID": "r", "workoutID": null, "x": 235, "y": 0.37}, 
                    {"marker": "245.00lbs, 0.34m/s", "setID": "s", "workoutID": null, "x": 245, "y": 0.34}, 
                    {"marker": "255.00lbs, 0.29m/s", "setID": "t", "workoutID": null, "x": 255, "y": 0.29}], 
                "e1RM": 399, 
                "errors": [], 
                "isRegressionNegative": true, 
                "maxX": 255, 
                "maxY": 0.41,
                "minX": 175, 
                "minY": 0.29, 
                "r2": 44, 
                "regressionPoints": [
                    {"x": 0, "y": 0.5890000000000001}, 
                    {"x": 535.4545454545454, "y": 0}
                ], 
                "slope": -0.0011000000000000003, 
                "unused": [
                    {"marker": "", "setID": "k", "workoutID": "abc", "x": 215, "y": 0.34}, 
                    {"marker": "", "setID": "l", "workoutID": "abc", "x": 215, "y": 0.31}
                ]
            }
        );
    });

    // test that if RPE1rm is the same, grab earliest one
    test('cherry pick earliest RPE1rm if RPE1rm is the same', () => {
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-26T04:06:12.640Z',
                    },
                ],
                historyData: {
                    a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.51', '560', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.35']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.59']}, 
                            {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.42', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'kgs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    c: { setID: 'c', exercise: 'Squat', weight: '350', RPE: '8', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.31']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    g: { setID: 'g', exercise: 'Deadlift', weight: '485', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-12T04:06:12.640Z',
                    },
                    h: { setID: 'h', exercise: 'Squat', weight: '290', RPE: '6.5', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.59']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.53']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    i: { setID: 'i', exercise: 'Squat', weight: '330', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    // lower RPE1rm than set p so should go into unused
                    j: { setID: 'j', exercise: 'Squat', weight: '375', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:04:08.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:04:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:15:12.640Z',
                    },
                    n: { setID: 'n', exercise: 'Deadlift', RPE: '9', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.18', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.15', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-19T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: [],
                tagsToExclude: [],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        // unused should have k and l
        expect(results).toEqual({
            "active": [
                {"marker": "175.00lbs, 0.41m/s", "setID": "d", "workoutID": "ab", "x": 175, "y": 0.41}, 
                {"marker": "202.00lbs, 0.37m/s", "setID": "e", "workoutID": "ab", "x": 202, "y": 0.37}, 
                {"marker": "215.00lbs, 0.34m/s", "setID": "k", "workoutID": "abc", "x": 215, "y": 0.34}, 
                {"marker": "230.00lbs, 0.34m/s", "setID": "f", "workoutID": "ab", "x": 230, "y": 0.34}, 
                {"marker": "235.00lbs, 0.37m/s", "setID": "r", "workoutID": null, "x": 235, "y": 0.37}, 
                {"marker": "245.00lbs, 0.34m/s", "setID": "s", "workoutID": null, "x": 245, "y": 0.34}, 
                {"marker": "255.00lbs, 0.29m/s", "setID": "t", "workoutID": null, "x": 255, "y": 0.29}
            ], 
            "e1RM": 390, 
            "errors": [], 
            "isRegressionNegative": true, 
            "maxX": 255, 
            "maxY": 0.41, 
            "minX": 175, 
            "minY": 0.29, 
            "r2": 72, 
            "regressionPoints": [
                {"x": 0, "y": 0.6183}, 
                {"x": 515.2500000000001, "y": 0}
            ], 
            "slope": -0.0011999999999999997, 
            "unused": [
                {"marker": "", "setID": "l", "workoutID": "abc", "x": 215, "y": 0.31}, 
                {"marker": "", "setID": "m", "workoutID": "abc", "x": 215, "y": 0.29}
            ]
        });
    });

    test('return data with proper tags included and excluded', () => {
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                ],
                historyData: {
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['D', 'A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '190', RPE: '6', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: ['A', 'G', 'B', 'C', 'F'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['A', 'E', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '245', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['A', 'B', 'F', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: ['A', 'B', 'C'],
                tagsToExclude: ['F', 'G'],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual({
            "active": [
                {"marker": "202.00lbs, 0.37m/s", "setID": "e", "workoutID": "ab", "x": 202, "y": 0.37}, 
                {"marker": "215.00lbs, 0.31m/s", "setID": "l", "workoutID": "abc", "x": 215, "y": 0.31}, 
                {"marker": "230.00lbs, 0.34m/s", "setID": "f", "workoutID": "ab", "x": 230, "y": 0.34}, 
                {"marker": "235.00lbs, 0.37m/s", "setID": "r", "workoutID": null, "x": 235, "y": 0.37}, 
                {"marker": "245.00lbs, 0.34m/s", "setID": "s", "workoutID": null, "x": 245, "y": 0.34}], 
            "e1RM": 2185, 
            "errors": [
                {"marker": "255.00lbs, 0.29m/s", "setID": "t", "workoutID": null, "x": 255, "y": 0.29}
            ], 
            "isRegressionNegative": true, 
            "maxX": 255, 
            "maxY": 0.37, 
            "minX": 202, 
            "minY": 0.29, 
            "r2": 0, 
            "regressionPoints": [
                {"x": 0, "y": 0.3685000000000001}, 
                {"x": 3684.999999999979, "y": 0}
            ], 
            "slope": -0.0001000000000000006, 
            "unused": []
        });
    });

    test('return proper data with tags empty', () => {
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-26T04:06:12.640Z',
                    },
                ],
                historyData: {
                    a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.51', '560', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.35']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.59']}, 
                            {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.42', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'kgs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: ['D', 'A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['A', 'G', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '190', RPE: '6', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: ['A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['A', 'E', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '245', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['A', 'G', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: [],
                tagsToExclude: ['F', 'G', 'H'],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual({
            "active": [
                {"marker": "175.00lbs, 0.41m/s", "setID": "d", "workoutID": "ab", "x": 175, "y": 0.41}, 
                {"marker": "190.00lbs, 0.34m/s", "setID": "k", "workoutID": "abc", "x": 190, "y": 0.34}, 
                {"marker": "202.00lbs, 0.37m/s", "setID": "e", "workoutID": "ab", "x": 202, "y": 0.37}, 
                {"marker": "215.00lbs, 0.31m/s", "setID": "l", "workoutID": "abc", "x": 215, "y": 0.31}, 
                {"marker": "235.00lbs, 0.37m/s", "setID": "r", "workoutID": null, "x": 235, "y": 0.37}], 
            "e1RM": 503, 
            "errors": [
                {"marker": "255.00lbs, 0.29m/s", "setID": "t", "workoutID": null, "x": 255, "y": 0.29}
            ], 
            "isRegressionNegative": true, 
            "maxX": 255, 
            "maxY": 0.41, 
            "minX": 175, 
            "minY": 0.29, 
            "r2": 17, 
            "regressionPoints": [
                {"x": 0, "y": 0.5024000000000002}, 
                {"x": 717.7142857142853, "y": 0}
            ], 
            "slope": -0.0007000000000000006,
            "unused": []
        });
    });

    test('tags to exclude empty', () => {
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-26T04:06:12.640Z',
                    },
                ],
                historyData: {
                    a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.51', '560', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.35']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.59']}, 
                            {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.42', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'kgs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    c: { setID: 'c', exercise: 'Squat', weight: '350', RPE: '8', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.31']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    g: { setID: 'g', exercise: 'Deadlift', weight: '485', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-12T04:06:12.640Z',
                    },
                    h: { setID: 'h', exercise: 'Squat', weight: '290', RPE: '6.5', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.59']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.53']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    i: { setID: 'i', exercise: 'Squat', weight: '330', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        ],
                        tags: ['D', 'A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    // lower RPE1rm than set p so should go into unused
                    j: { setID: 'j', exercise: 'Squat', weight: '375', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '190', RPE: '6', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: ['A', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: ['A', 'E', 'B', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '245', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['A', 'B', 'F', 'C'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    n: { setID: 'n', exercise: 'Deadlift', RPE: '9', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.18', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.15', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-19T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Bench',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: ['A', 'B', 'C'],
                tagsToExclude: [],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual({
            "active": [
                {"marker": "190.00lbs, 0.34m/s", "setID": "k", "workoutID": "abc", "x": 190, "y": 0.34}, 
                {"marker": "215.00lbs, 0.31m/s", "setID": "l", "workoutID": "abc", "x": 215, "y": 0.31}, 
                {"marker": "235.00lbs, 0.37m/s", "setID": "r", "workoutID": null, "x": 235, "y": 0.37}, 
                {"marker": "245.00lbs, 0.34m/s", "setID": "s", "workoutID": null, "x": 245, "y": 0.34}, 
                {"marker": "255.00lbs, 0.29m/s", "setID": "t", "workoutID": null, "x": 255, "y": 0.29}
            ], 
            "e1RM": 828, 
            "errors": [], 
            "isRegressionNegative": true, 
            "maxX": 255, 
            "maxY": 0.37, 
            "minX": 190, 
            "minY": 0.29, 
            "r2": 5, 
            "regressionPoints": [
                {"x": 0, "y": 0.39839999999999987}, 
                {"x": 1328.000000000002, "y": 0}
            ], 
            "slope": -0.00029999999999999943, 
            "unused": [
                {"marker": "", "setID": "m", "workoutID": "abc", "x": 245, "y": 0.29}
            ]
        });
    });

    test('ROMCheck', () => {
        // JSBIN of data with functionality showing broken
        // https://jsbin.com/leberel/edit?js,console
        const state = {
            sets: {
                workoutData: [
                    { setID: 'o', exercise: 'Squat', weight: '161', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.51']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.38', '562', '.48']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.42', '558', '.46']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.46', '561', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.30', '560', '.40']},
                        ],
                        tags: ['a', 'c', 'b'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z', 
                    },
                    // higher RPE1rm than set j so should be in active
                    { setID: 'p', exercise: 'Squat', weight: '375', RPE: '10', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.35', '561', '.45']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '563', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '595', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.29', '560', '.39']},
                        ], 
                        tags: ['C', 'B', 'a', 'f'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'q', exercise: 'Squat', weight: '180', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.30', '555', '.40']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.36']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: ['b', 'A', 'c'],
                        metric: 'kgs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'r', exercise: 'Bench', weight: '235', RPE: '7', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.34', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 's', exercise: 'Bench', weight: '245', RPE: '7.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '561', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.31', '563', '.41']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.27', '560', '.39']},
                        ],
                        tags: ['h', 'B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 't', exercise: 'Bench', weight: '255', RPE: '8.5', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.21', '566', '.33']},
                        ],
                        tags: ['B', 'c', 'A'],
                        metric: 'lbs',
                        initialStartTime: '2018-01-21T04:06:12.640Z',
                    },
                    { setID: 'u', exercise: 'Deadlift', weight: '525', RPE: '9', workoutID: null, reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-26T04:06:12.640Z',
                    },
                ],
                historyData: {
                    a: { setID: 'a', exercise: 'Squat', weight: '270', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.51', '561', '.42']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '0', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.46', '560', '.38']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.44', '563', '.35']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.41', '562', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    b: { setID: 'b', exercise: 'Squat', weight: '140', RPE: '6', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.47', '561', '.59']}, 
                            {isValid: false, removed: false, data: ['0', '1', '.51', '560', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.42', '562', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.49', '560', '.60']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '563', '.33']}
                        ],
                        tags: [],
                        metric: 'kgs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },

                    c: { setID: 'c', exercise: 'Squat', weight: '350', RPE: '8', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '561', '.53']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '558', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '562', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.43']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '559', '.31']},
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.31']},
                            {isValid: true, removed: false, data: ['0', '1', '.29', '520', '.31']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    d: { setID: 'd', exercise: 'Bench', weight: '175', RPE: '< 5.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '560', '.54']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.49']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.32', '560', '.467']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.29', '560', '.33']}
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    e: { setID: 'e', exercise: 'Bench', weight: '202', RPE: '7', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.30', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.28', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    f: { setID: 'f', exercise: 'Bench', weight: '230', RPE: '8.5', workoutID: 'ab', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-07T04:06:12.640Z',
                    },
                    g: { setID: 'g', exercise: 'Deadlift', weight: '485', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.21', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.17', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-12T04:06:12.640Z',
                    },
                    h: { setID: 'h', exercise: 'Squat', weight: '290', RPE: '6.5', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.41', '561', '.59']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.38', '562', '.55']}, 
                            {isValid: true, removed: false, data: ['0', '1', '.36', '560', '.53']},  
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    i: { setID: 'i', exercise: 'Squat', weight: '330', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.37', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.35', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.32', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    // lower RPE1rm than set p so should go into unused
                    j: { setID: 'j', exercise: 'Squat', weight: '375', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    k: { setID: 'k', exercise: 'Bench', weight: '190', RPE: '6', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.34', '560', '.47']}, 
                            {isValid: true, removed: false, data: ['0', '2', '.32', '562', '.44']}, 
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    l: { setID: 'l', exercise: 'Bench', weight: '215', RPE: '7', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '3', '.31', '558', '.42']}, 
                            {isValid: true, removed: true, data: ['0', '4', '.29', '561', '.40']}, 
                            {isValid: true, removed: false, data: ['0', '5', '.26', '560', '.38']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    m: { setID: 'm', exercise: 'Bench', weight: '245', RPE: '8', workoutID: 'abc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.29', '555', '.39']},
                            {isValid: true, removed: false, data: ['0', '2', '.26', '561', '.37']},
                            {isValid: true, removed: false, data: ['0', '3', '.23', '566', '.33']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-14T04:06:12.640Z',
                    },
                    n: { setID: 'n', exercise: 'Deadlift', RPE: '9', workoutID: 'bc', reps: [
                            {isValid: true, removed: false, data: ['0', '1', '.18', '310', '.32']},
                            {isValid: true, removed: false, data: ['0', '2', '.15', '308', '.25']},
                        ],
                        tags: [],
                        metric: 'lbs',
                        initialStartTime: '2018-01-19T04:06:12.640Z',
                    },
                },
            },
            analysis: {
                exercise: 'Squat',
                daysRange: 30,
                velocitySlider: .15,
                tagsToInclude: [],
                tagsToExclude: [],
            },
            settings: {
                defaultMetric: 'lbs',
            }
        };

        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual(
            // should be hiojq in active
            {
                "active": [
                    {"marker": "290.00lbs, 0.41m/s", "setID": "h", "workoutID": "abc", "x": 290, "y": 0.41}, 
                    {"marker": "330.00lbs, 0.37m/s", "setID": "i", "workoutID": "abc", "x": 330, "y": 0.37}, 
                    {"marker": "354.94lbs, 0.42m/s", "setID": "o", "workoutID": null, "x": 354.94424182, "y": 0.42}, 
                    {"marker": "375.00lbs, 0.31m/s", "setID": "j", "workoutID": "abc", "x": 375, "y": 0.31}, 
                    {"marker": "396.83lbs, 0.3m/s", "setID": "q", "workoutID": null, "x": 396.83207159999995, "y": 0.3}], 
                "e1RM": 561, 
                "errors": [
                    {"marker": "270.00lbs, 0.51m/s", "setID": "a", "workoutID": "ab", "x": 270, "y": 0.51}, 
                    {"marker": "308.65lbs, 0.49m/s", "setID": "b", "workoutID": "ab", "x": 308.6471668, "y": 0.49}, 
                    {"marker": "350.00lbs, 0.41m/s", "setID": "c", "workoutID": "ab", "x": 350, "y": 0.41}, 
                    {"marker": "375.00lbs, 0.35m/s", "setID": "p", "workoutID": null, "x": 375, "y": 0.35}
                ], 
                "isRegressionNegative": true, 
                "maxX": 396.83207159999995, 
                "maxY": 0.51, 
                "minX": 270, 
                "minY": 0.3, 
                "r2": 58, 
                "regressionPoints": [
                    {"x": 0, "y": 0.7113128632686243}, 
                    {"x": 711.5266567415732, "y": 0}], 
                    "slope": -0.0009996995285124974, 
                "unused": []
            }
        );
    });
});
    
describe('getTagsToIn/ExcludeSuggestions', () => {
    const state = {
        sets: {
            workoutData: [{
                setID: 'h',
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
            },
            {
                setID: 'x',
                exercise: 'Bench',
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
                tags: ['X', 'A', 'B', 'C'],
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
                    tags: ['A', 'B', 'G', 'C'],
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
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.733368, 288, 28, 18, 1, 8]
                    }],
                    tags: ['A', 'E', 'B', 'V', 'C'],
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
                    tags: ['A', 'B', 'F', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
            }
        },
        analysis: {
            e1RMDaysRange: 7,
            tagsToInclude: ['A', 'B', 'C'],
            tagsToExclude: ['E'],
        }
    };

    test('get all tag suggestions to include for an exercise', () => {
        const result = sut.getTagsToIncludeSuggestions(state, 'Bench');

        expect(result).toEqual(["g", "v", "f", "x"]);
    });

    test('get all tag suggestions to exclude for an exercise', () => {
        const result = sut.getTagsToExcludeSuggestions(state, 'Bench');

        expect(result).toEqual(["g", "v", "f", "x"]);
    });

});
