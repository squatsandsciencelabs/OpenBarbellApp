import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as DateUtils from 'app/utility/transforms/DateUtils';

export default class Validator {
    constructor(accessToken, lastRefreshDate) {
        this.accessToken = accessToken
        this.lastRefreshSeconds = DateUtils.getDate(lastRefreshDate).getTime()
        this.todaysDateSeconds = (new Date()).getTime()
        this.secondsBetween = this.todaysDateSeconds - this.lastRefreshSeconds
        this.isValid = this.secondsBetween < OpenBarbellConfig.apiWaitTimer;
    }
};
