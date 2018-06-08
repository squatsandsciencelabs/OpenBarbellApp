import { 
    VELOCITY_DROPPED, 
    PLAY_VELOCITY_DROP_AUDIO 
} from 'app/configs+constants/ActionTypes';

export const velocityDropped = () => ({
    type: VELOCITY_DROPPED
});

export const playVelocityDropAudio = () => ({
    type: PLAY_VELOCITY_DROP_AUDIO
});
