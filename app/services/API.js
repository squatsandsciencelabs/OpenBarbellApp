// TODO: is it worth ensuring there's only 1 request happening at a time, and to buffer them?
// TODO: If simultaneous requests are allowed, MAKE SURE YOU WAIT IF A NEW TOKEN IS BEING ACCESSED TO REDUCE THE NUMBER OF CALLS
// TODO: check that the server response is WHAT IS EXPECTED instead of assuming it'll always be correct, server CAN and WILL blow up

import { Alert } from 'react-native';
import Reactotron from 'reactotron-react-native';

import OpenBarbellConfig from 'app/configs/OpenBarbellConfig.json';
import * as AuthActionCreators from 'app/redux/shared_actions/AuthActionCreators';

// note: dispatch is required on every call in this case specifically so the token system can save the new access and refresh tokens
// otherwise, rely on the completion handler so the action creator thunk that calls thie API can appropriately handle the action
const API = {

    postUpdatedSetData: (sets, dispatch, accessToken, refreshToken, completionHandler=null, errorHandler=null) => {
        executeAuthenticatedRequest({
            endpoint: 'sets',
            method: 'POST',
            body: sets,
            dispatch: dispatch,
            accessToken: accessToken,
            refreshToken: refreshToken,
            completionHandler: (json) => {
                if (completionHandler !== null && json !== undefined && json !== null) {
                    completionHandler(json.revision);
                }
            },
            errorHandler: errorHandler
        });
    },

    login: (googleToken, dispatch, completionHandler=null, errorHandler=null) => {
        executeUnauthenticatedRequest({
            endpoint: 'login',
            method: 'POST',
            body: { token: googleToken },
            dispatch: dispatch,
            completionHandler: (json) => {
                if (completionHandler !== null) {
                    completionHandler(json.accessToken, json.refreshToken, json.revision, json.sets);
                }
            },
            errorHandler: errorHandler
        });
    },

    sync: (revision, dispatch, accessToken, refreshToken, completionHandler=null, errorHandler=null) => {
        executeAuthenticatedRequest({
            endpoint: 'sync',
            method: 'POST',
            body: { revision: revision },
            dispatch: dispatch,
            accessToken: accessToken,
            refreshToken: refreshToken,
            completionHandler: (json) => {
                Reactotron.log("sync success " + json);
                if (completionHandler !== null) {
                    if (json !== undefined) {
                        completionHandler(json.revision, json.sets);
                    } else {
                        completionHandler(null, null);
                    }
                }
            },
            errorHandler: errorHandler
        });
    }
};

const executeAuthenticatedRequest = (request) => {
    let parameters = ['endpoint', 'method', 'body', 'dispatch', 'accessToken', 'refreshToken'];
    if (requestContainsParameters(request, parameters)) {
        executeRequest(request);
    } else {
        Reactotron.log("authenticated request is missing parameters, attempting now to force logout assuming dispatch exists " + JSON.stringify(request));
        forceLogout(request.dispatch, false);
    }
};

const executeUnauthenticatedRequest = (request) => {
    let parameters = ['endpoint', 'method', 'body', 'dispatch'];
    if (requestContainsParameters(request, parameters)) {
        executeRequest(request);
    } else {
        Reactotron.log("normal request is missing parameters " + JSON.stringify(request));
    }
};

const requestContainsParameters = (request, parameters) => {
    for (let parameter of parameters) {
        if (request[parameter] === undefined || request[parameter] === null) {
            return false;
        }
    }

    return true;
};

const executeRequest = async (request) => {
    Reactotron.log("Executing request " + JSON.stringify(request));

    // build up the properties
    var authorizedRequest = false;
    let requestProperties = {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(request.body)
    };
    if (request.accessToken !== undefined && request.accessToken !== null) {
        requestProperties.headers['Authorization'] = 'Bearer ' + request.accessToken;
        authorizedRequest = true;
    }

    try {
        let response = await fetch(OpenBarbellConfig.baseURL + request.endpoint, requestProperties);
        let status = await response.status;

        switch(true) {
            case (status === 401):
                Reactotron.log("401!");
                if (authorizedRequest === true) {
                    Reactotron.log("401 on authorized call, checking for refresh token with req " + JSON.stringify(request));
                    if (request.refreshToken !== undefined && request.refreshToken !== null) {
                        Reactotron.log("attempting to execute token req");
                        // hit the token endpoint and then try again
                        executeTokenRequest(request);
                    } else {
                        Reactotron.log("no refresh token, bail out");
                        // you don't have a refresh token, logout
                        forceLogout(request.dispatch);
                    }
                } else if (request.endpoint === 'token') {
                    // refresh token failed
                    Reactotron.log("if token endpoint failed, bail out and force logout");
                    forceLogout(request.dispatch);
                } else {
                    // generic, this error might happen on login fail and such
                    throw new Error("Oops, something went wrong");
                }
                break;
            case (status >= 200 && status < 300):
                try {
                    // attempt to get json
                    let json = await response.json();
                    Reactotron.log("200! completion handler is " + request.completionHandler + " response is " + JSON.stringify(json));

                    // success!
                    if (request.completionHandler !== null) {
                        Reactotron.log("success, pasing to completion handler with json");
                        request.completionHandler(json);
                    }
                } catch (err) {
                    // success, this particular request has no JSON
                    Reactotron.log("200 with err " + err.message + " completion handler is " + request.completionHandler + " response is not JSON parsable");

                    // success!
                    if (request.completionHandler !== null) {
                        Reactotron.log("success, pasing to copmletion handler with no json");
                        request.completionHandler();
                    }
                }
                break;
            default:
                Reactotron.log("Not 401 or in the 200s, blah");
                throw new Error("Oops, something went wrong it's not 200 it's " + status);
        }
    } catch (err) {
        Reactotron.log("Error with request " + JSON.stringify(request) + " error: " + err);
        if (request.errorHandler !== null) {
            request.errorHandler(err);
        }
    }
};

const executeTokenRequest = (failedRequest) => {
    Reactotron.log("in execute token req, fail req is " + JSON.stringify(failedRequest));
    if (failedRequest.refreshToken === undefined || failedRequest.refreshToken === null) {
        Reactotron.log("Cannot ask for new token, there's no refresh token " + JSON.stringify(failedRequest));
        if (request.errorHandler !== null) {
            request.errorHandler(new Error("Missing refresh token"));
        }
    } else {
        // attempt it
        executeRequest(tokenRequest(failedRequest));
    }
};

const tokenRequest = (failedRequest) => {
    Reactotron.log("token request created for " + JSON.stringify(failedRequest));
    let request = {
        endpoint: 'token',
        method: 'POST',
        dispatch: failedRequest.dispatch,
        body: { 'refreshToken': failedRequest.refreshToken },
        completionHandler: (json) => {
            // save the tokens
            let accessToken = json.accessToken;
            let refreshToken = json.refreshToken;
            failedRequest.dispatch(AuthActionCreators.saveUser(refreshToken, accessToken));

            // execute previous request
            failedRequest.accessToken = accessToken;
            failedRequest.refreshToken = refreshToken;
            executeRequest(failedRequest);
        },
        errorHandler: (err) => {
            // TODO: figure out what to do on server error with token
            // something went wrong with the token, should I force logout? not sure as what if it's a 500?
            // feels bad if it's a server bug, server bug shouldn't forcibly log you out IMO
            Reactotron.log("Error with obtaining new token: " + err);
            if (failedRequest.errorHandler !== null) {
                failedRequest.errorHandler(err);
            }
        }
    };

    return request;
};

const forceLogout = (dispatch, displayError=true) => {
    if (dispatch === undefined || dispatch === null) {
        Reactotron.log("Force logout FAILED because dispatch doesn't exist");
        return;
    }

    dispatch(AuthActionCreators.signOut());
    if (displayError) {
        Alert.alert("Important", "As it's been awhile since you've signed on, you've been logged out! Please login again.");
    }
};

export default API;
