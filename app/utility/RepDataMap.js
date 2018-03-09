const map = {
    repNumberPosition : 1,
    averageVelocityPosition : 2,
    rangeOfMotionPosition: 3,
    peakVelocityPosition: 4,
    peakVelocityLocationPosition: 5,
    peakAccelerationPosition: 6, //OBV3 only, OBV2 has a -2121 flag   
    durationOfLiftPosition: 7, //OBV2 and OBV3only
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
};

export const repNumber = (repData) => parseData(repData, map.repNumberPosition);

export const averageVelocity = (repData) => parseData(repData, map.averageVelocityPosition);

export const rangeOfMotion = (repData) => parseData(repData, map.rangeOfMotionPosition);

export const peakVelocity = (repData) => parseData(repData, map.peakVelocityPosition);

export const peakVelocityLocation = (repData) => parseData(repData, map.peakVelocityLocationPosition);

export const peakAcceleration = (repData) => {
    const startFlag = parseData(repData, 0);
    if (startFlag === -1234 || startFlag === -2345) {
        return null;
    }

    return parseData(repData, map.peakAccelerationPosition);
};

export const durationOfLift = (repData) => {
    if (parseData(repData, 0) === -1234) {
        return null;
    }

    return parseData(repData, map.durationOfLiftPosition);
};

export const isValidData = (repData) => {
    let initialFlag = parseData(repData, 0);
    console.tron.log("initial flag is " + initialFlag);

    if (initialFlag == -3456) {
        // v3 bulk data flag check
        const bulkDataTransmissionFlag = parseData(repData, 21);
        console.tron.log("bulk data flag check at 21 " + bulkDataTransmissionFlag);
        if (bulkDataTransmissionFlag == -9999 && !isInfinityorNegative(repData)) {
            return true;
        }
    } else if (initialFlag == -2345) {
        // v2 bulk data flag check
        const bulkDataTransmissionFlag = parseData(repData, 18);
        console.tron.log("bulk data flag check at 18 " + bulkDataTransmissionFlag);
        if (bulkDataTransmissionFlag == -9999 && !isInfinityorNegative(repData)) {
            return true;
        }
    } else if (initialFlag == -1234) {
        // v1 bulk data flag check
        const bulkDataTransmissionFlag = parseData(repData, 6);
        console.tron.log("bulk data flag check at 6 " + bulkDataTransmissionFlag);
        if (bulkDataTransmissionFlag == -9999 && !isInfinityorNegative(repData)) {
            return true;
        }
    }

    // default
    return false;
};

const isInfinityorNegative = (repData) => {
    let averageVelocity = RepDataMap.averageVelocity(repData);

    if (!isFinite(averageVelocity) && averageVelocity < 0) {
        return true;
    } else {
        return false;
    }
}
