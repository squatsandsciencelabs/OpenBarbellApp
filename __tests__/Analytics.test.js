// NOTE: maybe need to reset these somewhere? For now just going with this
console.tron = {};
console.tron.log = () => {};
console.tron.display = () => {};
jest.mock('app/services/Firebase', () => {
    return {
        analytics: () => {
            return {
                logEvent: () => {
                    
                }
            };
        }
    };
});

import * as sut from 'app/utility/Analytics';
import * as AppStateSelectors from 'app/redux/selectors/AppStateSelectors';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';

describe('Analytics', () => {
    let screenStatusSpy = null;
    let scannedDevicesSpy = null;
    let connectedDeviceStatusSpy = null;
    let workoutEmptySpy = null;

    afterEach(() => {
        if (screenStatusSpy) {
            screenStatusSpy.mockReset();
            screenStatusSpy.mockRestore();
        }
        if (scannedDevicesSpy) {
            scannedDevicesSpy.mockReset();
            scannedDevicesSpy.mockRestore();
        }
        if (connectedDeviceStatusSpy) {
            connectedDeviceStatusSpy.mockReset();
            connectedDeviceStatusSpy.mockRestore();
        }
        if (workoutEmptySpy) {
            workoutEmptySpy.mockReset();
            workoutEmptySpy.mockRestore();
        }
    });

    describe('logEventWithAppState', () => {
        describe('is_screen_locked', () => {
            test('false', () => {
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => 'active');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBeFalsy();
            });

            test('true', () => {
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => 'derp');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBeTruthy();
            });
        });
    });
});
