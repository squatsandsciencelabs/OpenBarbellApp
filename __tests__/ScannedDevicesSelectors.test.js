import * as sut from 'app/redux/selectors/ScannedDevicesSelectors';

describe('ScannedDevicesSelectors', () => {

    describe('getManualScannedNone', () => {

        test('false if not a manual scan', () => {
            const state = {
                scannedDevices: {
                    isManualScan: false,
                    devices: [],
                }
            }
    
            const result = sut.getManualScannedNone(state);
    
            expect(result).toBe(false);
        });

        test('false if manual and has multiple', () => {
            const state = {
                scannedDevices: {
                    isManualScan: true,
                    devices: [{}],
                }
            }
    
            const result = sut.getManualScannedNone(state);
    
            expect(result).toBe(false);
        });

        test('true if manual and has none', () => {
            const state = {
                scannedDevices: {
                    isManualScan: true,
                    devices: [],
                }
            }
    
            const result = sut.getManualScannedNone(state);
    
            expect(result).toBe(true);
        });

    });

});
