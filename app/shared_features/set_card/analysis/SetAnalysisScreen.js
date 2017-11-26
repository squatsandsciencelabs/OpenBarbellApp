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
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

const metricValue = (state, set, quantifier, metric) => {
    let returnValue = null;

    switch (metric) {
        case AVG_VELOCITY_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getFirstAvgVelocity(set);
                    break;
                case LAST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getLastAvgVelocity(set);
                    break;
                case MIN_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMinAvgVelocity(set);
                    break;
                case MAX_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMaxAvgVelocity(set);
                    break;
                case AVG_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAvgOfAvgVelocities(set);
                    break;
                case ABS_LOSS_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAbsLossOfAvgVelocities(set);
                    break;
                case BEST_EVER_QUANTIFIER:
                    returnValue = SetsSelectors.getBestAvgVelocityEver(state, set);
                    break;
            }
            break;
        case DURATION_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getFirstDuration(set);
                    break;
                case LAST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getLastDuration(set);
                    break;
                case MIN_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMinDuration(set);
                    break;
                case MAX_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMaxDuration(set);
                    break;
                case AVG_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAvgDuration(set);
                    break;
                case ABS_LOSS_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAbsLossOfDurations(set);
                    break;
                case BEST_EVER_QUANTIFIER:
                    returnValue = SetsSelectors.getBestDurationEver(state, set);
                    break;
            }
            if (returnValue !== null) {
                returnValue = DurationCalculator.displayDuration(returnValue);
            }
            break;
        case ROM_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getFirstROM(set);
                    break;
                case LAST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getLastROM(set);
                    break;
                case MIN_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMinROM(set);
                    break;
                case MAX_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMaxROM(set);
                    break;
                case AVG_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAvgROM(set);
                    break;
                case ABS_LOSS_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAbsLossOfROMs(set);
                    break;
            }
            break;
        case PKH_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getFirstPKH(set);
                    break;
                case LAST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getLastPKH(set);
                    break;
                case MIN_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMinPKH(set);
                    break;
                case MAX_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMaxPKH(set);
                    break;
            }
            break;
        case PKV_METRIC:
            switch (quantifier) {
                case FIRST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getFirstPKV(set);
                    break;
                case LAST_REP_QUANTIFIER:
                    returnValue = CollapsedMetrics.getLastPKV(set);
                    break;
                case MIN_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMinPKV(set);
                    break;
                case MAX_QUANTIFIER:
                    returnValue = CollapsedMetrics.getMaxPKV(set);
                    break;
                case AVG_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAvgPKV(set);
                    break;
                case ABS_LOSS_QUANTIFIER:
                    returnValue = CollapsedMetrics.getAbsLossOfPKVs(set);
                    break;
                case BEST_EVER_QUANTIFIER:
                    returnValue = SetsSelectors.getBestPKVEver(state, set);
                    break;
            }
            break;
        case RPE_METRIC:
            returnValue = CollapsedMetrics.getRPE(set);
            break;
    }

    return returnValue ? returnValue : '---';    
};

const metricDescription = (quantifier, metric) => {
    if (metric === RPE_METRIC) {
        return CollapsedMetrics.metricAbbreviation(metric);
    }
    if (quantifier === EMPTY_QUANTIFIER || metric === EMPTY_METRIC) {
        return '';
    }
    return CollapsedMetrics.quantifierAbbreviation(quantifier) + "\n" + CollapsedMetrics.metricAbbreviation(metric) + " " + CollapsedMetrics.metricUnit(metric);
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

    console.tron.log("q1" + quantifier1 + " m1" + metric1 + " v1" + metricValue(state, set, quantifier1, metric1));

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
