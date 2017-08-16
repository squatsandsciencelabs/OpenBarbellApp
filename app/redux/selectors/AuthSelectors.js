const stateRoot = (state) => state.auth;

export const getAccessToken = (state) => stateRoot(state).accessToken;

export const getRefreshToken = (state) => stateRoot(state).refreshToken;

export const getEmail = (state) => stateRoot(state).email;

export const getIsLoggedIn = (state) => stateRoot(state).email !== null;
