jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as Analytics from 'app/services/Analytics';
import * as sut from 'app/features/workout/card/collapsed/EditWorkoutTitleCollapsedActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('expand card', () => {
    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});        
        store = mockStore({
            collapsedSettings: {}
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();        
    });

    afterAll(() => {
        logEventSpy.mockRestore();
    });   

    test('log set id when expanded', () => {
        const setID = 3527;

        store.dispatch(sut.expandCard(setID));
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('expand_card');
        expect(params.set_id).toEqual(3527);
    });
});