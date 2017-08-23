import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './HistorySetExpandedActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as HistorySelectors from 'app/redux/selectors/HistorySelectors';
import SetExpandedView from 'app/shared_features/expanded_set/SetExpandedView';

const mapStateToProps = (state) => {
    var setID = HistorySelectors.getExpandedSetID(state);
    
    if (setID !== null) {
        var set = SetsSelectors.getExpandedHistorySet(state, setID);
        var repNum = 0;
        if (HistorySelectors.getShowRemoved(state)) {
            var reps = set.reps;            
        } else {
            var reps = set.reps.filter((rep) => !rep.removed);            
        }
        var vms = reps.map((rep) => {
            repNum++;
            let data = rep.data;

            var duration = RepDataMap.durationOfLift(data);
            if (duration !== null) {
                duration = (duration / 1000000.0).toFixed(2);
            } else {
                duration = "obv2 only";
            }

            return {
                key: "rep"+repNum,
                removed: rep.removed,
                values: [
                    repNum,
                    RepDataMap.averageVelocity(data),
                    RepDataMap.peakVelocity(data),
                    RepDataMap.peakVelocityLocation(data),
                    RepDataMap.rangeOfMotion(data),
                    duration,
                ]
            };
        });
    }

    return {
        visible: setID !== null,
        rows: vms
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissExpanded,
    }, dispatch);
};
 
const HistorySetExpandedScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetExpandedView);

export default HistorySetExpandedScreen;
