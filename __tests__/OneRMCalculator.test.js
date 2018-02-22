import * as sut from 'app/math/OneRMCalculator';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';
import * as OneRMCalculator from 'app/math/OneRMCalculator';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';

describe('1RM', () => {
    beforeAll(() => {
        Date.now = () => 1515197192603;
    });

    afterAll(() => {
        Date.now = realNow;
    });

    const state = {
        sets: {
            workoutData: [
            {
                setID: 'a',
                exercise: 'Bench',
                weight: 100,
                metric: 'lbs',
                reps: [{
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 1, 10, 1, 4]
                }, {
                    isValid: false,
                    removed: false,
                    data: [-3456, 37, 10.533368, 500, 2, 80, 1, 70]
                }, {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 2.433368, 250, 3, 15, 1, 10]
                }, {
                    isValid: true,
                    removed: true,
                    data: [-3456, 37, 0.533368, 50, 4, 20, 1, 2]
                }, {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 0.233368, 400, 5, 30, 1, 20]
                }],
                tags: ['A', 'B', 'C'],
                initialStartTime: '1-2-18'
            },
            {
                setID: 'h',
                exercise: 'Squat',
                weight: 100,
                metric: 'lbs',
                reps: [{
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.333368, 388, 6, 24, 9, 12]
                }, {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.033368, 378, 7, 69, 13, 8]
                }, {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.453368, 328, 8, 72, 11, 15]
                }],
                tags: ['D', 'A', 'B', 'C'],
                initialStartTime: '2018-01-03T04:06:12.640Z'
            }],
            historyData: {
                b: {
                    setID: 'b',
                    exercise: 'Bench',
                    weight: 200,
                    metric: 'lbs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.943368, 388, 38, 28, 1, 18]
                    }],
                    tags: ['A', 'G', 'B', 'C', 'F'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
                c: {
                    setID: 'c',
                    exercise: 'Bench',
                    weight: 150,
                    metric: 'lbs',
                    reps: [{
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.733368, 288, 8, 18, 1, 8]
                    }],
                    tags: ['A', 'E', 'B', 'C'],
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
                        data: [-3456, 37, 1.833368, 188, 3, 8, 1, 4]
                    }],
                    tags: ['A', 'B', 'F', 'C'],
                    initialStartTime: '2018-01-03T04:06:12.640Z'
                },
            }
        },
        analysis: {
            exercise: 'Bench',
            daysRange: 7,
            velocitySlider: .15,
            tagsToInclude: ['A', 'B', 'C'],
            tagsToExclude: ['F', 'G'],
        },
        settings: {
            metric: 'lbs',
        }
    };

    // Test that proper pool is returned
    // Test that proper velocitys are placed in proper pools
    // Test that workouts are properly cherry picked
    // Test that workouts are being thinned properly
    // Test that proper chart data is returned
    // Test for KG and lB
    // Tests where middle would fail
    test('return 1rm', () => {
        const exercise = AnalysisSelectors.getExercise(state);
        const tagsToInclude = AnalysisSelectors.getTagsToInclude(state);
        const tagsToExclude = AnalysisSelectors.getTagsToExclude(state);
        const daysRange = AnalysisSelectors.getDaysRange(state);
        const velocity = AnalysisSelectors.getVelocitySlider(state);
        const allSets = SetsSelectors.getAllSets(state);
        const metric = SettingsSelectors.getDefaultMetric(state);

        const results = sut.calculate1RM(exercise, tagsToInclude, tagsToExclude, daysRange, velocity, metric, allSets);

        expect(results).toEqual({"active": [{"setID": "c", "size": 10, "x": 68, "y": 1.73}], "e1RM": -Infinity, "errors": [{"setID": "a", "size": 10, "x": 45, "y": 2.43}], "r2": NaN, "regressionPoints": [{"x": 68, "y": 1.73}], "unused": []});
    })
});
