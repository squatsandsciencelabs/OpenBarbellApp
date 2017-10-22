jest.mock('react-native-firebase');
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/utility/Analytics';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
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
        logEventSpy.mockReset();
        logEventSpy.mockRestore();
    });

    describe("Analytics called", () => {

        var untouchedSpy = null;

        afterEach(() => {
            untouchedSpy.mockReset();
            untouchedSpy.mockRestore();
        });

        test("not called when the working set is untouched", () => {
            // given we have a store with an untouched working set
            untouchedSpy = jest.spyOn(SetEmptyCheck, 'isUntouched').mockImplementation(() => true);
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
            untouchedSpy = jest.spyOn(SetEmptyCheck, 'isUntouched').mockImplementation(() => false);
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
                    defaultMetric: 'kg'
                }
            });
        });

        test('true when passed in true', () => {
            // when you end the set with manual passed in
            store.dispatch(sut.endSet(true));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBeTruthy();
        });

        test('false when passed in false', () => {
            // when you end the set with not manual passed in
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBeFalsy();
        });

        describe('auto_end_timer', () => {

            var endSetTimerSpy = null;

            afterEach(() => {
                endSetTimerSpy.mockReset();
            });
    
            afterAll(() => {
                endSetTimerSpy.mockReset();
                endSetTimerSpy.mockRestore();
            });            

            test('0 when manually started', () => {
                endSetTimerSpy = timerEditedSpy = jest.spyOn(SettingsSelectors, 'getEndSetTimerDuration').mockImplementation(() => 0);

                store.dispatch(sut.endSet(true));

                const event = logEventSpy.mock.calls[0][0];
                const params = logEventSpy.mock.calls[0][1];
                expect(event).toEqual('start_new_set');
                expect(params.auto_end_timer).toBe(0);            
            });

            test('30 seconds when endSetTimerDuration is 30', () => {
                endSetTimerSpy = timerEditedSpy = jest.spyOn(SettingsSelectors, 'getEndSetTimerDuration').mockImplementation(() => 30);

                store.dispatch(sut.endSet());

                const event = logEventSpy.mock.calls[0][0];
                const params = logEventSpy.mock.calls[0][1];
                expect(event).toEqual('start_new_set');
                expect(params.auto_end_timer).toBe(30);            
            });  
            
            test('60 seconds when endSetTimerDuration is 1 min', () => {
                endSetTimerSpy = timerEditedSpy = jest.spyOn(SettingsSelectors, 'getEndSetTimerDuration').mockImplementation(() => 60);

                store.dispatch(sut.endSet());

                const event = logEventSpy.mock.calls[0][0];
                const params = logEventSpy.mock.calls[0][1];
                expect(event).toEqual('start_new_set');
                expect(params.auto_end_timer).toBe(60);            
            });      
            
            
            test('120 seconds when endSetTimerDuration is 2 min', () => {
                endSetTimerSpy = timerEditedSpy = jest.spyOn(SettingsSelectors, 'getEndSetTimerDuration').mockImplementation(() => 120);

                store.dispatch(sut.endSet());

                const event = logEventSpy.mock.calls[0][0];
                const params = logEventSpy.mock.calls[0][1];
                expect(event).toEqual('start_new_set');
                expect(params.auto_end_timer).toBe(120);            
            }); 
            
            test('300 seconds when endSetTimerDuration is 5 min', () => {
                endSetTimerSpy = timerEditedSpy = jest.spyOn(SettingsSelectors, 'getEndSetTimerDuration').mockImplementation(() => 300);

                store.dispatch(sut.endSet());

                const event = logEventSpy.mock.calls[0][0];
                const params = logEventSpy.mock.calls[0][1];
                expect(event).toEqual('start_new_set');
                expect(params.auto_end_timer).toBe(300);            
            });                   
        })
    });

    describe('was_sanity_check', () => {

        test('true when passed in true', () => {
            // when you end the set with sanityCheck true passed in
            store.dispatch(sut.endSet(false, true));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBeTruthy();
        });

        test('false when passed nothing', () => {
            // when you end the set with sanityCheck not passed in
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBeFalsy();
        });

        test('false when passed in false', () => {
            // when you end the set with sanityCheck not passed in
            store.dispatch(sut.endSet(false, false));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.was_sanity_check).toBeFalsy();
        });
    })

    describe('has_reps', () => {

        var touchedSpy = null;

        afterEach(() => {
            touchedSpy.mockReset();
        });

        afterAll(() => {
            touchedSpy.mockReset();
            touchedSpy.mockRestore();
        });

        test("true when it does not have empty reps", () => {
            // given the set does not have empty reps
            touchedSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyReps').mockImplementation(() => false);

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.has_reps).toBeTruthy();
        });

        test("false when it has empty reps", () => {
            // given the set does not have empty reps
            touchedSpy = jest.spyOn(SetEmptyCheck, 'hasEmptyReps').mockImplementation(() => true);

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.has_reps).toBeFalsy();
        });
    });

    describe("num_fields_entered", () => {

        var fieldsSpy = null

        afterEach(() => {
            fieldsSpy.mockReset();
        });

        afterAll(() => {
            fieldsSpy.mockReset();
            fieldsSpy.mockRestore();
        });       

        test("num_fields_entered is 0", () => {
            // given a number of fields
            fieldsSpy = jest.spyOn(SetEmptyCheck, 'numFieldsEntered').mockImplementation(() => 0);

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(0);           
        });

        test("num_fields_entered is 1", () => {
            // given a number of fields
            fieldsSpy = jest.spyOn(SetEmptyCheck, 'numFieldsEntered').mockImplementation(() => 1);

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(1);           
        });
        
        test("num_fields_entered is 2", () => {
            // given a number of fields
            fieldsSpy = jest.spyOn(SetEmptyCheck, 'numFieldsEntered').mockImplementation(() => 2);

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(2);           
        });    
        
        test("num_fields_entered is 3", () => {
            // given a number of fields
            fieldsSpy = jest.spyOn(SetEmptyCheck, 'numFieldsEntered').mockImplementation(() => 3);

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(3);           
        });     

        test("num_fields_entered is 4", () => {
            // given a number of fields
            fieldsSpy = jest.spyOn(SetEmptyCheck, 'numFieldsEntered').mockImplementation(() => 4);

            // when you end the set
            store.dispatch(sut.endSet());

            //then
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.num_fields_entered).toBe(4);           
        });      
    });

    describe("is_default_timer", () => {

        var timerEditedSpy = null;

        afterEach(() => {
            timerEditedSpy.mockReset();
        });

        afterAll(() => {
            timerEditedSpy.mockReset();
            timerEditedSpy.mockRestore();
        });
        

        test("timer edited is false", () => {
            timerEditedSpy = jest.spyOn(SettingsSelectors, 'getIfTimerWasEdited').mockImplementation(() => false);

            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_default_end_timer).toBeTruthy();                   
        });

        test("timer edited is true", () => {
            timerEditedSpy = jest.spyOn(SettingsSelectors, 'getIfTimerWasEdited').mockImplementation(() => true);

            store.dispatch(sut.endSet());

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_default_end_timer).toBeFalsy();                   
        });        
    });

    describe('is_previous_set_filled', () => {

        var previousSetFilledSpy = null;

        afterEach(() => {
            previousSetFilledSpy.mockReset();
        });

        afterAll(() => {
            previousSetFilledSpy.mockReset();
            previousSetFilledSpy.mockRestore();
        });
        
        
        test('-1 if no previous set', () => {
           previousSetFilledSpy = jest.spyOn(SetsSelectors, 'getIsPreviousSetFilled').mockImplementation(() => -1);

           store.dispatch(sut.endSet());
           
           const event = logEventSpy.mock.calls[0][0];
           const params = logEventSpy.mock.calls[0][1];
           expect(event).toEqual('start_new_set');
           expect(params.is_previous_set_fields_filled).toBe(-1);                
        });

        test('0 if empty', () => {
            previousSetFilledSpy = jest.spyOn(SetsSelectors, 'getIsPreviousSetFilled').mockImplementation(() => 0);
 
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_previous_set_fields_filled).toBe(0);                
        });        

        test('1 if filled', () => {
            previousSetFilledSpy = jest.spyOn(SetsSelectors, 'getIsPreviousSetFilled').mockImplementation(() => 1);
 
            store.dispatch(sut.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.is_previous_set_fields_filled).toBe(1);                
        });
    });

    describe('previous_set_has_reps', () => {
        var touchedSpy = null;

        afterEach(() => {
            touchedSpy.mockReset();
        });

        afterAll(() => {
            touchedSpy.mockReset();
            touchedSpy.mockRestore();
        });

        test("true when it does not have empty reps", () => {
            // given the set does not have empty reps
            touchedSpy = jest.spyOn(SetsSelectors, 'getPreviousSetHasEmptyReps').mockImplementation(() => false);

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.previous_set_has_reps).toBeTruthy();
        });

        test("false when it has empty reps", () => {
            // given the set does not have empty reps
            touchedSpy = jest.spyOn(SetsSelectors, 'getPreviousSetHasEmptyReps').mockImplementation(() => true);

            // when you end the set
            store.dispatch(sut.endSet());            

            // then has_reps should be true
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.previous_set_has_reps).toBeFalsy();
        });        
    })
});
