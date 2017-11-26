import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    BEST_EVER_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';
import SetAnalysis from './SetAnalysis';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';

const metricValue = (state, set, quantifier, metric) => {
    switch (metric) {
        case AVG_VELOCITY_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    return CollapsedMetrics.getFirstAvgVelocity(set);
                case LAST_REP_QUANTIFIER:
                    return CollapsedMetrics.getLastAvgVelocity(set);
                case MIN_QUANTIFIER:
                    return CollapsedMetrics.getMinAvgVelocity(set);
                case MAX_QUANTIFIER:
                    return CollapsedMetrics.getMaxAvgVelocity(set);
                case AVG_QUANTIFIER:
                    return CollapsedMetrics.getAvgOfAvgVelocities(set);
                case ABS_LOSS_QUANTIFIER:
                    return CollapsedMetrics.getAbsLossOfAvgVelocities(set);
                case BEST_EVER_QUANTIFIER:
                    return SetsSelectors.getBestAvgVelocityEver(state, set);
            }
            break;
        case DURATION_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    return CollapsedMetrics.getFirstDuration(set);
                case LAST_REP_QUANTIFIER:
                    return CollapsedMetrics.getLastDuration(set);
                case MIN_QUANTIFIER:
                    return CollapsedMetrics.getMinDuration(set);
                case MAX_QUANTIFIER:
                    return CollapsedMetrics.getMaxDuration(set);
                case AVG_QUANTIFIER:
                    return CollapsedMetrics.getAvgDuration(set);
                case ABS_LOSS_QUANTIFIER:
                    return CollapsedMetrics.getAbsLossOfDurations(set);
                case BEST_EVER_QUANTIFIER:
                    return SetsSelectors.getBestDurationEver(state, set);
            }
            break;
        case ROM_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    return CollapsedMetrics.getFirstROM(set);
                case LAST_REP_QUANTIFIER:
                    return CollapsedMetrics.getLastROM(set);
                case MIN_QUANTIFIER:
                    return CollapsedMetrics.getMinROM(set);
                case MAX_QUANTIFIER:
                    return CollapsedMetrics.getMaxROM(set);
                case AVG_QUANTIFIER:
                    return CollapsedMetrics.getAvgROM(set);
                case ABS_LOSS_QUANTIFIER:
                    return CollapsedMetrics.getAbsLossOfROMs(set);
            }
            break;
        case PKH_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    return CollapsedMetrics.getFirstPKH(set);
                case LAST_REP_QUANTIFIER:
                    return CollapsedMetrics.getLastPKH(set);
                case MIN_QUANTIFIER:
                    return CollapsedMetrics.getMinPKH(set);
                case MAX_QUANTIFIER:
                    return CollapsedMetrics.getMaxPKH(set);
            }
            break;
        case PKV_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    return CollapsedMetrics.getFirstPKV(set);
                case LAST_REP_QUANTIFIER:
                    return CollapsedMetrics.getLastPKV(set);
                case MIN_QUANTIFIER:
                    return CollapsedMetrics.getMinPKV(set);
                case MAX_QUANTIFIER:
                    return CollapsedMetrics.getMaxPKV(set);
                case AVG_QUANTIFIER:
                    return CollapsedMetrics.getAvgPKV(set);
                case ABS_LOSS_QUANTIFIER:
                    return CollapsedMetrics.getAbsLossOfPKVs(set);
                case BEST_EVER_QUANTIFIER:
                    return SetsSelectors.getBestPKVEver(state, set);
            }
            break;
        case RPE_METRIC:
            return CollapsedMetrics.getRPE(set);
    }

    return '---';    
};

const metricDescription = (quantifier, metric) => {
    if (metric === RPE_METRIC) {
        return CollapsedMetrics.metricToString(metric);
    }
    return CollapsedMetrics.quantifierToString(quantifier) + " " + CollapsedMetrics.metricToString(metric);
}

const mapStateToProps = (state, ownProps) => {
    // raw values
    const set = ownProps.set;
    const metric1 = CollapsedSettingsSelectors.getMetric1(state);
    const quantifier1 = CollapsedSettingsSelectors.getQuantifier1(state);
    const metric2 = CollapsedSettingsSelectors.getMetric2(state);
    const quantifier2 = CollapsedSettingsSelectors.getQuantifier2(state);
    const metric3 = CollapsedSettingsSelectors.getMetric3(state);
    const quantifier3 = CollapsedSettingsSelectors.getQuantifier3(state);
    const metric4 = CollapsedSettingsSelectors.getMetric4(state);
    const quantifier4 = CollapsedSettingsSelectors.getQuantifier4(state);
    const metric5 = CollapsedSettingsSelectors.getMetric5(state);
    const quantifier5 = CollapsedSettingsSelectors.getQuantifier5(state);

    // display values
    return {
        value1: metricValue(state, set, quantifier1, metric1),
        description1: metricDescription(quantifier1, metric1),
        value2: metricValue(state, set, quantifier2, metric2),
        description2: metricDescription(quantifier2, metric2),
        value3: metricValue(state, set, quantifier3, metric3),
        description3: metricDescription(quantifier3, metric3),
        value4: metricValue(state, set, quantifier4, metric4),
        description4: metricDescription(quantifier4, metric4),
        value5: metricValue(state, set, quantifier5, metric5),
        description5: metricDescription(quantifier5, metric5),
    };
};

const SetAnalysisScreen = connect(
    mapStateToProps,
)(SetAnalysis);

export default SetAnalysisScreen;
