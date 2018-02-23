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
                {},
                {},
                {},
                {},
                {},
            ],
            historyData: {
                a: {},
                b: {},
                c: {},
                d: {},
                e: {},
                f: {},
                g: {}
            }
        },
        analysis: {
            exercise: 'Squat',
            daysRange: 7,
            velocitySlider: .15,
            tagsToInclude: ['A', 'B', 'C'],
            tagsToExclude: ['F', 'G'],
        },
        settings: {
            metric: 'lbs',
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
                tagsToInclude: ['A', 'B', 'C'],
                tagsToExclude: ['F', 'G'],
            },
            settings: {
                metric: 'lbs',
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
    });
});
