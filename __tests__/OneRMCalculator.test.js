import * as sut from 'app/math/OneRMCalculator';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

describe('1RM', () => {
    // edge cases:
    // test for metrics - sprinkle some KG ones around
    // test for velocities with fastest or slowest speeds - sprinkle some odd ones in the middle of some sets
    // test buckets in that highest RPE1rm is taken and unused has the unused one - add two more
    // why is the unused one going where it is?
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
                // return
                v: { setID: 'v', exercise: 'Squat', weight: '140.5', RPE: '8', workoutID: 'bc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.59']}, 
                        {isValid: false, removed: false, data: ['0', '1', '.49', '560', '.55']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.40', '560', '.53']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.60']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.40', '560', '.33']}
                    ],
                    tags: [],
                    metric: 'kgs',
                    initialStartTime: '2018-01-22T04:06:12.640Z',
                },
                w: { setID: 'w', exercise: 'Squat', weight: '140.5', RPE: '8', workoutID: 'bc', reps: [
                        {isValid: true, removed: false, data: ['0', '1', '.44', '560', '.59']}, 
                        {isValid: false, removed: false, data: ['0', '1', '.49', '560', '.55']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.40', '560', '.53']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.47', '560', '.60']}, 
                        {isValid: true, removed: false, data: ['0', '1', '.40', '560', '.33']}
                    ],
                    tags: [],
                    metric: 'kgs',
                    initialStartTime: '2018-01-26T04:06:12.640Z',
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

        expect(results).toEqual({"active": [], "e1RM": null, "errors": [], "r2": null, "regressionPoints": [], "unused": []});
    });

    test('return 1rm', () => {
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
                    {"setID": "a", "size": 10, "x": 270, "y": 0.51}, 
                    {"setID": "h", "size": 10, "x": 290, "y": 0.41}, 
                    {"setID": "i", "size": 10, "x": 330, "y": 0.37}, 
                    {"setID": "c", "size": 10, "x": 350, "y": 0.41}, 
                    {"setID": "o", "size": 10, "x": 354.94424182, "y": 0.42}, 
                    {"setID": "p", "size": 10, "x": 375, "y": 0.35}, 
                    {"setID": "q", "size": 10, "x": 396.83207159999995, "y": 0.3}], 
                "e1RM": 543, 
                "errors": [
                    {"setID": "b", "size": 10, "x": 308.6471668, "y": 0.49}], 
                "r2": 71, 
                "regressionPoints": [
                    {"x": 270, "y": 0.4774}, 
                    {"x": 290, "y": 0.4534}, 
                    {"x": 330, "y": 0.4054}, 
                    {"x": 350, "y": 0.3814}, 
                    {"x": 354.9442, "y": 0.3755}, 
                    {"x": 375, "y": 0.3514}, 
                    {"x": 396.8321, "y": 0.3252}
                ], 
                "unused": [{"setID": "j", "size": 10, "x": 375, "y": 0.31}]});
    });
});
