import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetExpandedView from 'app/shared_features/expanded_set/SetExpandedView';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as Actions from './WorkoutSetExpandedActions';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';

const mapStateToProps = (state) => {
    if (state.workout.expandedSetID !== null) {
        var set = SetsSelectors.getExpandedWorkoutSet(state.sets, state.workout.expandedSetID);
        var repNum = 0;
        var reps = set.reps.filter((rep) => !rep.removed);
        var vms = reps.map((rep) => {
            repNum++;
            let data = rep.data;

            var duration = RepDataMap.durationOfLift(data);
            if (duration !== null) {
                duration = DurationCalculator.displayDuration(duration);
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
        visible: state.workout.expandedSetID !== null,
        rows: vms
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissExpanded,
    }, dispatch);
};
 
const WorkoutSetExpandedScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetExpandedView);

export default WorkoutSetExpandedScreen;
