import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as DateUtils from 'app/utility/transforms/DateUtils';

export default class Validator {

    constructor(accessToken, lastRefreshDate) {
        this.accessToken = accessToken
        if (!lastRefreshDate) {
            // no refresh date, invalid
            this.isValid = false;
        } else {
            // calculate isvalid
            let lastRefreshMS = DateUtils.getDate(lastRefreshDate).getTime();
            let todaysDateMS = (new Date()).getTime();
            let msBetween = todaysDateMS - lastRefreshMS;
            this.isValid = msBetween < OpenBarbellConfig.apiWaitTimer;
        }
    }

};
