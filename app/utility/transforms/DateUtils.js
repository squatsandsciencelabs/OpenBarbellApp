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

export const getDate = (date) => {
    if (date === null) {
        return null;
    } else if (Object.prototype.toString.call(date) === '[object Date]') {
        return date;
    } else {
        return new Date(date);
    }
};

// ASSUMES that you aren't resting for entire days or months
// if you are, then the human readable rest will be wrong
// taken from http://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
export const restInClockFormat = (duration) => {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
};

export const restInShortenedClockFormat = (duration) => {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    var returnString = '';
    if (hours > 0) {
        returnString += (hours < 10) ? "0" + hours : hours;
        returnString += ':';
    }
    returnString += (minutes < 10) ? "0" + minutes : minutes;
    returnString += ':';
    returnString += (seconds < 10) ? "0" + seconds : seconds;

    return returnString;
};

export const restInSentenceFormat = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (minutes > 0 && seconds > 0) {
        return minutes + " min, " + seconds + " sec rest";
    } else if (minutes > 0) {
        return minutes + " min rest";
    } else {
        return seconds + " sec rest";
    }
};

export const checkDateWithinRange = (range, time) => {
    const today = new Date();
    const date = new Date(time);
    
    const diff = Math.abs(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= range;
};
