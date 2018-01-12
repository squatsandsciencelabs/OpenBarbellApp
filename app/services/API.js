// TODO: check that the server response is WHAT IS EXPECTED instead of assuming it'll always be correct, server CAN and WILL blow up, right now undefined can crash the app

// IMPORTANT NOTE: All errors returned are actually Redux actions

import {
    LOGOUT,
    
} from 'app/ActionTypes';
import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

// note: dispatch is required on every call in this case specifically so the token system can save the new access and refresh tokens
// otherwise, rely on the completion handler so the action creator thunk that calls thie API can appropriately handle the action
const API = {

    postUpdatedSetData: (sets, validator) => {
        return new Promise((resolve, reject) => {
            if (validator.isValid) {
                executeRequest('POST', 'sets', sets, validator.accessToken)
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    // TODO: check if this will work, I'm assuming that the error will always be an action
                    reject(error);
                });
            } else {
                reject(new Error("has not been atleast two weeks"));
            }
        });
    },

    postAnonymousSetData: (sets, validator) => {
        return new Promise((resolve, reject) => {
            if (validator.isValid) {
                executeRequest('POST', 'anonymous-sets', sets, validator.accessToken)
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    // TODO: check if this will work, I'm assuming that the error will always be an action
                    reject(error);
                });
            } else {
                reject(new Error("has not been atleast two weeks"));
            }
        });
    },

    login: (googleToken) => {
        return new Promise((resolve, reject) => {
            executeRequest('POST', 'login', { token: googleToken })
            .then((json) => {
                resolve(json);
            }).catch((error) => {
                // TODO: check if this will work, I'm assuming that the error will always be an action
                reject(error);
            });
        });
    },

    loginAnonymously: () => {
        return new Promise((resolve, reject) => {
            executeRequest('POST', 'login-anonymously')
            .then((json) => {
                resolve(json);
            }).catch((error) => {
                // TODO: check if this will work, I'm assuming that the error will always be an action
                reject(error);
            });
        });
    },

    sync: (revision, validator) => {
        console.tron.log("sync with rev " + revision);
        return new Promise((resolve, reject) => {
            if (validator.isValid) {
                executeRequest('POST', 'sync', { revision: revision }, validator.accessToken)
                .then((json) => {
                    // TODO: see if need undefined checks
                    console.tron.log("sync success " + json);
                    resolve(json);
                }).catch((error) => {
                    // TODO: check if this will work, I'm assuming that the error will always be an action
                    reject(error);
                });
            } else {
                reject(new Error('has not been atleast two weeks'))
            }
        });
    },

    obtainNewTokens: (refreshToken) => {
        return new Promise((resolve, reject) => {
            if (refreshToken === null || refreshToken === undefined) {
                // no refresh token, force logout
                reject(AuthActionCreators.logout(true));
            } else {
                executeRequest('POST', 'token', { refreshToken: refreshToken })
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    // TODO: check if this will work, I'm assuming that the error will always be an action
                    reject(error);
                });
            }
        });
    },

    obtainNewAnonymousTokens: (refreshToken) => {
        return new Promise((resolve, reject) => {
            if (refreshToken === null || refreshToken === undefined) {
                // no refresh token, logout
                reject(AuthActionCreators.logout(false));
            } else {
                executeRequest('POST', 'anonymous-token', { refreshToken: refreshToken })
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    // TODO: check if this will work, I'm assuming that the error will always be an action
                    reject(error);
                });
            }
        });
    },
};

const executeRequest = (method, endpoint, body, accessToken=null) => {
    return new Promise(async (resolve, reject) => {
        console.tron.log("Executing request " + method + " " + endpoint + " " + JSON.stringify(body) + " " + accessToken);

        // build up the properties
        var authorizedRequest = false;
        let requestProperties = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        };
        if (accessToken !== undefined && accessToken !== null) {
            requestProperties.headers['Authorization'] = 'Bearer ' + accessToken;
            authorizedRequest = true;
        }

        try {
            let response = await fetch(OpenBarbellConfig.baseURL + endpoint, requestProperties);
            let status = await response.status;

            switch(true) {
                case (status === 401):
                    console.tron.log("401!");
                    if (authorizedRequest === true) {
                        console.tron.log("401 on authorized call to " + endpoint + " should logout");
                        reject(AuthActionCreators.logout(true));
                    } else {
                        reject({type: "401"});
                    }
                    break;
                case (status >= 200 && status < 300):
                    try {
                        // attempt to get json
                        let json = await response.json();
                        console.tron.log("200! response is " + JSON.stringify(json));
                        resolve(json);
                    } catch (err) {
                        // success, this particular request has no JSON
                        console.tron.log("200 with err " + err.message + " response is not JSON parsable");

                        // success!
                        resolve();
                    }
                    break;
                default:
                    console.tron.log("Not 401 or in the 200s, blah");
                    reject({type:"Oops, something went wrong it's not 200 it's " + status});
            }
        } catch (err) {
            console.tron.log("Error with request " + endpoint + " error: " + err);
            reject({type:err.toString()}); // TODO: ensure this error toString actually works and doesn't fail
        }
    });
};

export default API;
