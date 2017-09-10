import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';

export default class Validator {
    constructor(accessToken, lastRefreshDate) {
        this.accessToken = accessToken,
        this.lastRefreshDate = lastRefreshDate
    }

    isValid() {
        return this.lastRefreshDate < OpenBarbellConfig.obtainTokenTimer;
    }
};
