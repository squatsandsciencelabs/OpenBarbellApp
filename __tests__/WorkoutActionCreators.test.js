jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/services/Analytics';
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
        logEventSpy.mockRestore();
    });    

    describe('num_reps', () => {
        const realGetNumWorkoutReps = SetsSelectors.getNumWorkoutReps;

        afterEach(() => {
            SetsSelectors.getNumWorkoutReps = realGetNumWorkoutReps;
        });  

        test('num_reps is 1', () => {
            SetsSelectors.getNumWorkoutReps = () => 1;
           
            store.dispatch(sut.endWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_reps).toBe(1);
        });

        test('num_reps is 2', () => {
            SetsSelectors.getNumWorkoutReps = () => 2;
            
            store.dispatch(sut.endWorkout());
 
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_reps).toBe(2);
         });

        test('num_reps is 3', () => {
            SetsSelectors.getNumWorkoutReps = () => 3;
            
            store.dispatch(sut.endWorkout());
 
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_reps).toBe(3);
        });         
    });

    describe('num_sets_with_fields', () => {
        const realGetNumWorkoutSetsWithFields = SetsSelectors.getNumWorkoutSetsWithFields;

        afterEach(() => {
            SetsSelectors.getNumWorkoutSetsWithFields = realGetNumWorkoutSetsWithFields;
        });

        test('num_sets_with_fields is 1', () => {
            SetsSelectors.getNumWorkoutSetsWithFields = () => 1;

            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_sets_with_fields).toBe(1);
        });

        test('num_sets_with_fields is 2', () => {
            SetsSelectors.getNumWorkoutSetsWithFields = () => 2;
            
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.num_sets_with_fields).toBe(2);    
        });
        
        test('num_sets_with_fields is 3', () => {
            SetsSelectors.getNumWorkoutSetsWithFields = () => 3;
            
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
            expect(params.manually_ended).toBe(true);;
        });

        test('false', () => {
            store.dispatch(sut.autoEndWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.manually_ended).toBe(false);
        });
    });

    describe('percent_sets_with_fields', () => {
        const realGetPercentWorkoutSetsWithFields = SetsSelectors.getPercentWorkoutSetsWithFields;

        afterEach(() => {
            SetsSelectors.getPercentWorkoutSetsWithFields = realGetPercentWorkoutSetsWithFields;
        });
        
        test('25%', () => {
            SetsSelectors.getPercentWorkoutSetsWithFields = () => 25;
        
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(25);
        });

        test('50%', () => {
            SetsSelectors.getPercentWorkoutSetsWithFields = () => 50;
            
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(50);
        });
        
        test('75%', () => {
            SetsSelectors.getPercentWorkoutSetsWithFields = () => 75;
            
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(75);
        });  
        
        test('100%', () => {
            SetsSelectors.getPercentWorkoutSetsWithFields = () => 100;
            
            store.dispatch(sut.endWorkout());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.percent_sets_fields).toBe(100);
        });        
    });

    describe('workout_duration', () => {
        const realWorkoutDuration = SetsSelectors.getWorkoutDuration;

        afterAll(() => {
            SetsSelectors.getWorkoutDuration = realWorkoutDuration;
        });

        test('0', () => {
            SetsSelectors.getWorkoutDuration = () => 0;

            store.dispatch(sut.endWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.workout_duration).toBe(0);
        });

        test('9001', () => {
            SetsSelectors.getWorkoutDuration = () => 9001;
            
            store.dispatch(sut.endWorkout());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('end_workout');
            expect(params.workout_duration).toBe(9001);
        });
    });
});
