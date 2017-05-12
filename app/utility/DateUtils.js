// app/utility/DateUtils.js

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
