import { Alert } from 'react-native';

import {
    DISMISS_SURVEY,
    COMPLETE_SURVEY,
} from 'app/ActionTypes';

export const closeSurvey = () => (dispatch, getState) => {
    Alert.alert(
        null,
        "Are you done with the survey? We won't show this one to you again.",
        [
            {
                text: 'Cancel',
                onPress: () => {
                    // TODO: analytics
                },
                style: 'cancel'
            },
            {
                text: "Finished",
                onPress: () => {
                    // TODO: analytics
                    dispatch({
                        type: COMPLETE_SURVEY,
                    });
                },
            },
        ]
    );
};

export const fillOutLater = () => (dispatch, getState) => {
    // TODO: analytics
    dispatch({
        type: DISMISS_SURVEY,
    });
};
