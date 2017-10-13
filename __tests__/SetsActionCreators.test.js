jest.mock('react-native-firebase');
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Analytics from 'app/utility/Analytics';
import * as SetsActionCreators from 'app/redux/shared_actions/SetsActionCreators';

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

    test("not called when there's no reps", () => {
        store = mockStore({
            sets: {
                workoutData: [{
                    reps: [],
                    tags: []
                }],
            }
        });

        store.dispatch(SetsActionCreators.endSet());

        expect(logEventSpy).not.toBeCalled();
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

        test('true', () => {
            store.dispatch(SetsActionCreators.endSet(true));
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBeTruthy();
        });

        test('false', () => {
            store.dispatch(SetsActionCreators.endSet());
            
            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('start_new_set');
            expect(params.manually_started).toBeFalsy();
        });
    });
});
