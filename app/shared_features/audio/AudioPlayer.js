import Sound from 'react-native-sound';

export const audioPlayer = (audioPath) => {
    const audio = new Sound(audioPath, (error) => {
        if (error) {
            console.tron.log('failed to load the sound', error);
            return;
          } else {
              audio.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                  audio.release();
                } else {
                  console.log('playback failed due to audio decoding errors');
                  // reset the player to its uninitialized state (android only)
                  // this is the only option to recover after an error occured and use the player again
                  audio.reset();
                }
            });
        }
    });
}
