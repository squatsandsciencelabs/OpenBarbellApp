jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/services/Analytics';
import * as SetUtils from 'app/utility/SetUtils';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as sut from 'app/redux/shared_actions/SetsActionCreators';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('endSet analytics', () => {

    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});        
    });

    afterEach(() => {
        logEventSpy.mockReset();        
    });

    afterAll(() => {
        logEventSpy.mockRestore();
    });

    describe("Analytics called", () => {
        const realIsUntouched = SetUtils.isUntouched;

        afterEach(() => {
            SetUtils.isUntouched = realIsUntouched;
        });

        test("not called when the working set is untouched", () => {
            // given we have a store with an untouched working set
            SetUtils.isUntouched = () => true;
            store = mockStore({
                sets: {
                    workoutData: [{
                        reps: [],
                        tags: []
                    }],
                }
            });
            
            // when we try to end the set
            store.dispatch(sut.endSet());
            
            // then the analytics will not be logged
            expect(logEventSpy).not.toBeCalled();
        });

        test('Analytics is called', () => {
            // given when a workout was touched
            SetUtils.isUntouched = () => false;
            store = mockStore({
                sets: {
                    workoutData: [{
                        reps: [],
                        tags: []
                    }],
                },
                settings: {
                    endSetTimerDuration: 30
                }
            });

            // when we try to end the set
            store.dispatch(sut.endSet());

            // then the analytics will be called
            expect(logEventSpy).toBeCalled();
        });

    });

    describe('manually_started', () => {
        beforeEach(() => {
            store = mockStore({
                sets: {
                    workoutData: [{
                        exercise: 'derp',
                        reps: [],
                        tags: []
                    }],
                },
                settings: {
                    defaultMetric: 'kgs'
                }
            });
        });

        test('true when passed in true', () => {
            // when you end the set with manual passed in
            store.dispatch(sut.endSet(true));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBe(true);;
        });

        test('false when passed in false', () => {
            // when you end the set with not manual passed in
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBe(false);
        });
    });

    describe('auto_end_timer', () => {
        const realGetEndSetTimerDuration = SettingsSelectors.getEndSetTimerDuration;

        beforeEach(() => {
            store = mockStore({
                sets: {
                    workoutData: [{
                        exercise: 'derp',
                        reps: [],
                        tags: []
                    }],
                },
                settings: {
                    defaultMetric: 'kgs'
                }
            });
        });

        afterEach(() => {
            SettingsSelectors.getEndSetTimerDuration = realGetEndSetTimerDuration;
        });           

        test('0 when manually started', () => {
            SettingsSelectors.getEndSetTimerDuration = () => 0;

            store.dispatch(sut.endSet(true));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.auto_end_timer).toBe(0);
        });

        test('30 seconds when endSetTimerDuration is 30', () => {
            SettingsSelectors.getEndSetTimerDuration = () => 30;
            
            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.auto_end_timer).toBe(30);
        });  
        
        test('60 seconds when endSetTimerDuration is 1 min', () => {
            SettingsSelectors.getEndSetTimerDuration = () => 60;
            
            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.auto_end_timer).toBe(60);
        });      
        
        
        test('120 seconds when endSetTimerDuration is 2 min', () => {
            SettingsSelectors.getEndSetTimerDuration = () => 120;
            
            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.auto_end_timer).toBe(120);
        }); 
        
        test('300 seconds when endSetTimerDuration is 5 min', () => {
            SettingsSelectors.getEndSetTimerDuration = () => 300;
            
            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.auto_end_timer).toBe(300);
        });
    });

    describe('was_sanity_check', () => {

        test('true when passed in true', () => {
            // when you end the set with sanityCheck true passed in
            store.dispatch(sut.endSet(false, true));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBe(true);;
        });

        test('false when passed nothing', () => {
            // when you end the set with sanityCheck not passed in
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBe(false);
        });

        test('false when passed in false', () => {
            // when you end the set with sanityCheck not passed in
            store.dispatch(sut.endSet(false, false));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBe(false);
        });
    })

    describe('has_reps', () => {
        const realHasEmptyReps = SetUtils.hasEmptyReps;

        afterEach(() => {
            SetUtils.hasEmptyReps = realHasEmptyReps;
        });

        test("true when it does not have empty reps", () => {
            // given the set does not have empty reps
            SetUtils.hasEmptyReps = () => false;

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.has_reps).toBe(true);;
        });

        test("false when it has empty reps", () => {
            // given the set does not have empty reps
            SetUtils.hasEmptyReps = () => true;
            
            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.has_reps).toBe(false);
        });
    });

    describe("num_fields_entered and value", () => {
        const realNumFieldsEntered = SetUtils.numFieldsEntered;

        afterEach(() => {
            SetUtils.numFieldsEntered = realNumFieldsEntered;
        });

        test("num_fields_entered is 0", () => {
            // given a number of fields
            SetUtils.numFieldsEntered = () => 0;

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(0);
            expect(params.value).toBe(0);            
        });

        test("num_fields_entered is 1", () => {
            // given a number of fields
            SetUtils.numFieldsEntered = () => 1;
            
            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(1);
            expect(params.value).toBe(1);            
        });
        
        test("num_fields_entered is 2", () => {
            // given a number of fields
            SetUtils.numFieldsEntered = () => 2;
            
            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(2);
            expect(params.value).toBe(2);            
        });    
        
        test("num_fields_entered is 3", () => {
            // given a number of fields
            SetUtils.numFieldsEntered = () => 3;
            
            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(3);
            expect(params.value).toBe(3);            
        });     

        test("num_fields_entered is 4", () => {
            // given a number of fields
            SetUtils.numFieldsEntered = () => 4;
            
            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(4);
            expect(params.value).toBe(4);            
        });      
    });

    describe("is_default_timer", () => {
        const realGetIfTimerWasEdited = SettingsSelectors.getIfTimerWasEdited;

        afterEach(() => {
            SettingsSelectors.getIfTimerWasEdited = realGetIfTimerWasEdited;
        });
        
        test("timer edited is false", () => {
            SettingsSelectors.getIfTimerWasEdited = () => false;

            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_default_end_timer).toBe(true);;                   
        });

        test("timer edited is true", () => {
            SettingsSelectors.getIfTimerWasEdited = () => true;
            
            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_default_end_timer).toBe(false);                   
        });        
    });

    describe('is_previous_set_filled', () => {
        const realGetIsPreviousWorkoutSetFilled = SetsSelectors.getIsPreviousWorkoutSetFilled;

        afterEach(() => {
            SetsSelectors.getIsPreviousWorkoutSetFilled = realGetIsPreviousWorkoutSetFilled;
        });
        
        test('-1 if no previous set', () => {
            SetsSelectors.getIsPreviousWorkoutSetFilled = () => -1;

           store.dispatch(sut.endSet());
           
           const event = logEventSpy.mock.calls[0][0];
           const params = logEventSpy.mock.calls[0][1];
           expect(event).toEqual('start_new_set');
           expect(params.is_previous_set_fields_filled).toBe(-1);                
        });

        test('0 if empty', () => {
            SetsSelectors.getIsPreviousWorkoutSetFilled = () => 0;
            
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_previous_set_fields_filled).toBe(0);                
        });        

        test('1 if filled', () => {
            SetsSelectors.getIsPreviousWorkoutSetFilled = () => 1;
            
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_previous_set_fields_filled).toBe(1);                
        });
    });

    describe('previous_set_has_reps', () => {
        const realGetWorkoutPreviousSetHasEmptyReps = SetsSelectors.getWorkoutPreviousSetHasEmptyReps;

        afterEach(() => {
            SetsSelectors.getWorkoutPreviousSetHasEmptyReps = realGetWorkoutPreviousSetHasEmptyReps;
        });

        test("true when it does not have empty reps", () => {
            // given the set does not have empty reps
            SetsSelectors.getWorkoutPreviousSetHasEmptyReps = () => false;

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.previous_set_has_reps).toBe(true);;
        });

        test("false when it has empty reps", () => {
            // given the set does not have empty reps
            SetsSelectors.getWorkoutPreviousSetHasEmptyReps = () => true;
            
            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.previous_set_has_reps).toBe(false);
        });        
    })
});
