// app/utility/RepDataMap.js

const map = {
	repNumberPosition : 1,
	averageVelocityPosition : 2,
	rangeOfMotionPosition: 3,
	peakVelocityPosition: 4,
	peakVelocityLocationPosition: 5,
	durationOfLiftPosition: 7, //OBV2 only
};

const parseData = (repData, position) => {
	// valid check
	if (repData.length < position+1) {
		return null;
	}

	// grab data
	let data = repData[position];

	// sanitize it
	let sanitizedData = parseFloat(data).toFixed(2).toString().replace('.00', '');

	// remove trailing 0s
	if(sanitizedData.indexOf('.') > -1 && sanitizedData.charAt(sanitizedData.length-1) === '0') {
		sanitizedData = sanitizedData.slice(0, -1);
	}

	return sanitizedData;
}

export const repNumber = (repData) => parseData(repData, map.repNumberPosition);

export const averageVelocity = (repData) => parseData(repData, map.averageVelocityPosition);

export const rangeOfMotion = (repData) => parseData(repData, map.rangeOfMotionPosition);

export const peakVelocity = (repData) => parseData(repData, map.peakVelocityPosition);

export const peakVelocityLocation = (repData) => parseData(repData, map.peakVelocityLocationPosition);

export const durationOfLift = (repData) => {
	if (parseData(repData, 0) == -1234) {
		return null;
	}

	return parseData(repData, map.durationOfLiftPosition);
};

export const isValidData = (repData) => {
	let initialFlag = parseData(repData, 0);
	console.log("initial flag is " + initialFlag);

	if (initialFlag == -1234) {
		// v1 bulk data flag check
		let bulkDataTransmissionFlag = parseData(repData, 6)
		console.log("bulk data flag check at 6 " + bulkDataTransmissionFlag);
		if (bulkDataTransmissionFlag == -9999) {
			return true;
		}
	}else if (initialFlag == -2345) {
		// v2 bulk data flag check
		let bulkDataTransmissionFlag = parseData(repData, 18)
		console.log("bulk data flag check at 18 " + bulkDataTransmissionFlag);
		if (bulkDataTransmissionFlag == -9999) {
			return true;
		}
	}

	// default
	return false;
};