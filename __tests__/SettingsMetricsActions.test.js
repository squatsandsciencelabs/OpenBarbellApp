jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as Analytics from 'app/services/Analytics';
import * as sut from 'app/features/settings/metrics/SettingsMetricsActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('what are metric tips', () => {
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

    test('what are metric tips gets logged', () => {
        store.dispatch(sut.presentBigMetricsInfo());
        
        const event = logEventSpy.mock.calls[0][0];
        const params = logEventSpy.mock.calls[0][1];
        expect(event).toEqual('what_are_metric_tips');
        expect(params).toEqual({});
    });
});

describe('edit collapsed metric screen', () => {
    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'setCurrentScreen').mockImplementation(() => {});        
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

    test('edit collapsed_metric screen is set', () => {
        store.dispatch(sut.presentCollapsedMetric());
        
        const event = logEventSpy.mock.calls[0][0];
        expect(event).toEqual('edit_collapsed_metric');
    });    
});

describe('edit quantifier screen', () => {
    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'setCurrentScreen').mockImplementation(() => {});        
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

    test('edit quantifier screen is set', () => {
        store.dispatch(sut.presentQuantifier());
        
        const event = logEventSpy.mock.calls[0][0];
        expect(event).toEqual('edit_quantifier');
    });    
});
