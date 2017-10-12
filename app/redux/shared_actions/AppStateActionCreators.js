import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN
} from 'app/ActionTypes';

export const unlockedScreen = () => ({
    type: UNLOCKED_SCREEN
});

export const lockedScreen = () => ({
    type: LOCKED_SCREEN
});
