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
} from 'app/constants/CollapsedMetricTypes';

import * as Analytics from 'app/services/Analytics';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as sut from 'app/features/settings/metrics/metric/SettingsEditMetricsActions';

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

    describe('change metric', () => {

        test('collapsedMetric changes to current rank', () => {
            let metric = AVG_VELOCITY_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(2);
            expect(params.from_metric).toBe(RPE_METRIC);   
            expect(params.to_metric).toBe(metric);
        });

        test('metric1 changes', () => {
            let metric = DURATION_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting1(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(1);
            expect(params.from_metric).toBe(AVG_VELOCITY_METRIC);   
            expect(params.to_metric).toBe(metric);
        });

        test('metric2 changes', () => {
            let metric = AVG_VELOCITY_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting2(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(2);
            expect(params.from_metric).toBe(RPE_METRIC);   
            expect(params.to_metric).toBe(metric);
        });

        test('metric3 changes', () => {
            let metric = PKH_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting3(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(3);
            expect(params.from_metric).toBe(ROM_METRIC);   
            expect(params.to_metric).toBe(metric);
        });

        test('metric4 changes', () => {
            let metric = PKV_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting4(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(4);
            expect(params.from_metric).toBe(DURATION_METRIC);   
            expect(params.to_metric).toBe(metric);
        });

        test('metric5 changes', () => {
            let metric = ROM_METRIC;

            store.dispatch(sut.saveCollapsedMetricSetting5(metric));

            const event = logEventSpy.mock.calls[0][0];
            const params = logEventSpy.mock.calls[0][1];
            expect(event).toEqual('change_collapsed_metric');
            expect(params.rank).toBe(5);
            expect(params.from_metric).toBe(AVG_VELOCITY_METRIC);   
            expect(params.to_metric).toBe(metric);
        });
    });

});