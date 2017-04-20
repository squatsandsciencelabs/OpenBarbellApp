// app/utility/TimerDurationMap.js

export const timerDurationDescription = (duration) => {
    if (duration == null || duration <= 0) {
        return "Off";
    }

    var minutes = 0;
    var seconds = duration;
    while(seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }

    if (minutes > 0 && seconds > 0) {
        return minutes + " min " + seconds + " sec";
    } else if (minutes > 0) {
        return minutes + " min";
    } else {
        return seconds + " sec";
    }
};
