import {
    UNLOCKED_SCREEN,
    LOCKED_SCREEN,
    MULTI_TASK_SCREEN,
} from 'app/ActionTypes';

export const unlockedScreen = () => ({
    type: UNLOCKED_SCREEN
});

export const lockedScreen = () => ({
    type: LOCKED_SCREEN
});

export const multiTask = () => ({
    type: MULTI_TASK_SCREEN
})
