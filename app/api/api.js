// app/api/api.js

// TODO: is it worth ensuring there's only 1 request happening at a time, and to buffer them?
// TODO: If simultaneous requests are allowed, MAKE SURE YOU WAIT IF A NEW TOKEN IS BEING ACCESSED TO REDUCE THE NUMBER OF CALLS
// TODO: check that the server response is WHAT IS EXPECTED instead of assuming it'll always be correct, server CAN and WILL blow up

import config from '../config.json';
import * as AuthActionCreators from '../actions/AuthActionCreators';
import { Alert } from 'react-native';

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
				console.log("post updated set data returned with json " + JSON.stringify(json) + " completion " + completionHandler);
				if (completionHandler !== null && json !== undefined && json !== null) {
					console.log("about to hit the completion handler now");
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
				console.log("login returned with json " + JSON.stringify(json) + " completion " + completionHandler);
				if (completionHandler !== null) {
					console.log("about to hit the completion handler now");
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
				console.log("sync success with completion " + completionHandler + " json " + json);
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
		console.log("authenticated request is missing parameters, attempting now to force logout assuming dispatch exists " + JSON.stringify(request));
		forceLogout(request.dispatch, false);
	}
};

const executeUnauthenticatedRequest = (request) => {
	let parameters = ['endpoint', 'method', 'body', 'dispatch'];
	if (requestContainsParameters(request, parameters)) {
		executeRequest(request);
	} else {
		console.log("normal request is missing parameters " + JSON.stringify(request));
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
	console.log("!executing request " + JSON.stringify(request));
	
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
		console.log("authorization is " + requestProperties.headers['Authorization']);
	}

	try {
		let response = await fetch(config.baseURL + request.endpoint, requestProperties);
		let status = await response.status;

		console.log("> RECEIVED RESPONSE WIHT STATus " + status);

		switch(true) {
			case (status === 401):
				console.log("401!");
				if (authorizedRequest === true) {
					console.log("401 on authorized call, checking for refresh token with req " + JSON.stringify(request));
					if (request.refreshToken !== undefined && request.refreshToken !== null) {
						console.log("attempting to execute token req");
						// hit the token endpoint and then try again
						executeTokenRequest(request);
					} else {
						console.log("no refresh token, bail out");
						// you don't have a refresh token, logout
						forceLogout(request.dispatch);
					}
				} else if (request.endpoint === 'token') {
					// refresh token failed
					console.log("if token endpoint failed, bail out and force logout");
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
					console.log("200! completion handler is " + request.completionHandler + " response is " + JSON.stringify(json));

					// success!
					if (request.completionHandler !== null) {
						console.log("success, pasing to copmletion handler with json");
						request.completionHandler(json);
					}
				} catch (err) {
					// success, this particular request has no JSON
					console.log("200 with err " + err.message + " completion handler is " + request.completionHandler + " response is not JSON parsable");

					// success!
					if (request.completionHandler !== null) {
						console.log("success, pasing to copmletion handler with no json");
						request.completionHandler();
					}
				}
				break;
			default:
				console.log("Not 401 or in the 200s, blah");
				throw new Error("Oops, something went wrong it's not 200 it's " + status);
		}
	} catch (err) {
		console.log("Error with request " + JSON.stringify(request) + " error: " + err);
		if (request.errorHandler !== null) {
			request.errorHandler(err);
		}
	}
};

const executeTokenRequest = (failedRequest) => {
	console.log("in execute token req, fail req is " + JSON.stringify(failedRequest));
	if (failedRequest.refreshToken === undefined || failedRequest.refreshToken === null) {
		console.log("Cannot ask for new token, there's no refresh token " + JSON.stringify(failedRequest));
		if (request.errorHandler !== null) {
			request.errorHandler(new Error("Missing refresh token"));
		}
	} else {
		console.log("executing said request, gogogogo");
		// attempt it
		executeRequest(tokenRequest(failedRequest));
	}
};

const tokenRequest = (failedRequest) => {
	console.log("token request created " + JSON.stringify(failedRequest));
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
			console.log("Error with obtaining new token: " + err);
			if (failedRequest.errorHandler !== null) {
				failedRequest.errorHandler(err);
			}
		}
	};

	return request;
};

const forceLogout = (dispatch, displayError=true) => {
	if (dispatch === undefined || dispatch === null) {
		console.log("Force logout FAILED because dispatch doesn't exist");
		return;
	}

	console.log("force logging out with dispatch " + dispatch);
	dispatch(AuthActionCreators.signOut());
	if (displayError) {
		Alert.alert("Important", "As it's been awhile since you've signed on, you've been logged out! Please login again.");
	}
};

export default API;
