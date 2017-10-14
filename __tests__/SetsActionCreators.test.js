jest.mock('react-native-firebase');
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/utility/Analytics';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
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

        test('false when passed in false', () => {
            // when you end the set with sanityCheck not passed in
            store.dispatch(sut.endSet());
            
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
});
