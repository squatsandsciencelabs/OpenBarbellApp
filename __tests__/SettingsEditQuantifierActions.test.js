jest.mock('app/services/Firebase', () => {});
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    FIRST_REP_QUANTIFIER,
    LAST_REP_QUANTIFIER,
    MIN_QUANTIFIER,
    MAX_QUANTIFIER,
    AVG_QUANTIFIER,
    ABS_LOSS_QUANTIFIER,
    FASTEST_EVER_QUANTIFIER,
    SLOWEST_EVER_QUANTIFIER,
} from 'app/configs+constants/CollapsedMetricTypes';

import * as Analytics from 'app/services/Analytics';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as sut from 'app/features/settings/metrics/quantifier/SettingsEditQuantifiersActions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var logEventSpy = null;
var store = null;

describe('collapsedMetric Analysis', () => {
    beforeEach(() => {
        logEventSpy = jest.spyOn(Analytics, 'logEventWithAppState').mockImplementation(() => {});        
        store = mockStore({
            collapsedSettings: {
                metric1: AVG_VELOCITY_METRIC,
                quantifier1: LAST_REP_QUANTIFIER,
                metric2: RPE_METRIC,
                quantifier2: EMPTY_QUANTIFIER,
                metric3: ROM_METRIC,
                quantifier3: MIN_QUANTIFIER,
                metric4: DURATION_METRIC,
                quantifier4: MIN_QUANTIFIER,
                metric5: AVG_VELOCITY_METRIC,
                quantifier5: ABS_LOSS_QUANTIFIER,
                currentCollapsedMetricRank: 2,
                isEditingMetric: false,
                isEditingQuantifier: false,                
            }
        });
    });

    afterEach(() => {
        logEventSpy.mockReset();        
    });

    afterAll(() => {
        logEventSpy.mockRestore();
    });   

    describe('change quantifier', () => {
        test('quantifier changes', () => {
            const expectedQuantifier = DURATION_METRIC;

            store.dispatch(sut.saveQuantifierSetting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(2);
            expect(params.from_quantifier).toBe(EMPTY_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });

        test('quantifier1 changes', () => {
            const expectedQuantifier = DURATION_METRIC;

            store.dispatch(sut.saveQuantifier1Setting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(1);
            expect(params.from_quantifier).toBe(LAST_REP_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });

        test('quantifier2 changes', () => {
            const expectedQuantifier = ABS_LOSS_QUANTIFIER;

            store.dispatch(sut.saveQuantifier2Setting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(2);
            expect(params.from_quantifier).toBe(EMPTY_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });

        test('quantifier3 changes', () => {
            const expectedQuantifier = MAX_QUANTIFIER;

            store.dispatch(sut.saveQuantifier3Setting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(3);
            expect(params.from_quantifier).toBe(MIN_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });

        test('quantifier4 changes', () => {
            const expectedQuantifier = MAX_QUANTIFIER;

            store.dispatch(sut.saveQuantifier4Setting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(4);
            expect(params.from_quantifier).toBe(MIN_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });

        test('quantifier5 changes', () => {
            const expectedQuantifier = MIN_QUANTIFIER;

            store.dispatch(sut.saveQuantifier5Setting(expectedQuantifier));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_quantifier');
            expect(params.rank).toBe(5);
            expect(params.from_quantifier).toBe(ABS_LOSS_QUANTIFIER);   
            expect(params.to_quantifier).toBe(expectedQuantifier);
        });
    });

});
