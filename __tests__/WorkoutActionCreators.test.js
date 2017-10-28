jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/utility/Analytics';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as WorkoutSelectors from 'app/redux/selectors/WorkoutSelectors';
import * as sut from 'app/redux/shared_actions/WorkoutActionCreators';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('endWorkout analytics', () => {

    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});        
        store = mockStore({
            sets: {
                workoutData: [{
                    exercise: 'derp',
                    reps: [],
                    tags: []
                }],
            },
            auth: {
                email: '',
            },
            workout: {
                removedCounter: '',
                restoredCounter: '',
            },
            history: {
                viewedCounter: 0
            },
            appState: {
                lockedCounter: 0,
            },
            connectedDevice: {
                numDisconnects: 0,
                numReconnects: 0,
            }
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();        
    });

    afterAll(() => {
        logEventSpy.mockReset();
        logEventSpy.mockRestore();
    });    

    describe('num_reps', () => {
        var repsSpy = null;

        afterEach(() => {
            repsSpy.mockReset();
        });

        afterAll(() => {
            repsSpy.mockReset();
            repsSpy.mockRestore();
        });        

        test('num_reps is 1', () => {
           repsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutReps').mockImplementation(() => 1);
           
           store.dispatch(sut.endWorkout());

           const event = logEventSpy.mock.calls[0][0];
           const params = logEventSpy.mock.calls[0][1];
           expect(event).toEqual('end_workout');
           expect(params.num_reps).toBe(1);
        });

        test('num_reps is 2', () => {
            repsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutReps').mockImplementation(() => 2);
            
            store.dispatch(sut.endWorkout());
 
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_reps).toBe(2);
         });

        test('num_reps is 3', () => {
            repsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutReps').mockImplementation(() => 3);
            
            store.dispatch(sut.endWorkout());
 
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_reps).toBe(3);
        });         
    });

    describe('num_sets_with_fields', () => {
        var fieldsSpy = null;

        afterEach(() => {
            fieldsSpy.mockReset();
        });

        afterAll(() => {
            fieldsSpy.mockReset();
            fieldsSpy.mockRestore();
        })

        test('num_sets_with_fields is 1', () => {
            fieldsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutSetsWithFields').mockImplementation(() => 1);

            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_sets_with_fields).toBe(1);
        });

        test('num_sets_with_fields is 2', () => {
            fieldsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutSetsWithFields').mockImplementation(() => 2);

            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_sets_with_fields).toBe(2);    
        });
        
        test('num_sets_with_fields is 3', () => {
            fieldsSpy = jest.spyOn(SetsSelectors, 'getNumWorkoutSetsWithFields').mockImplementation(() => 3);

            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_sets_with_fields).toBe(3);
        });        
    });

    describe('manually_ended', () => {

        test('true', () => {
            store.dispatch(sut.endWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.manually_ended).toBeTruthy();
        });

        test('false', () => {
            store.dispatch(sut.autoEndWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.manually_ended).toBeFalsy();
        });
    });

    describe('percent_sets_with_fields', () => {
        var percentSpy = null;

        afterEach(() => {
            percentSpy.mockReset();
        });

        afterAll(() => {
            percentSpy.mockReset();
            percentSpy.restore();
        });
        
        test('25%', () => {
            percentSpy = jest.spyOn(SetsSelectors, 'getPercentWorkoutSetsWithFields').mockImplementation(() => 25);
        
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(25);
        });

        test('50%', () => {
            percentSpy = jest.spyOn(SetsSelectors, 'getPercentWorkoutSetsWithFields').mockImplementation(() => 50);
        
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(50);
        });
        
        test('75%', () => {
            percentSpy = jest.spyOn(SetsSelectors, 'getPercentWorkoutSetsWithFields').mockImplementation(() => 75);
        
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(75);
        });  
        
        test('100%', () => {
            percentSpy = jest.spyOn(SetsSelectors, 'getPercentWorkoutSetsWithFields').mockImplementation(() => 100);
        
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(100);
        });        
    });
});
