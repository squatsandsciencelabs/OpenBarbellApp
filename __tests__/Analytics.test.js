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
import { AppState } from 'react-native';
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
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => '');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBeTruthy();
            });
        });

        describe('is_app_active', () => {
            let originalAppCurrentState = null;

            beforeEach(() => {
                originalAppCurrentState = AppState.currentState;    
            });

            afterEach(() => {
                AppState.currentState = originalAppCurrentState;
            });

            test('true if active', () => {
                AppState.currentState = 'active';
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => '');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(true);
            });

            test('false if inactive', () => {
                AppState.currentState = 'inactive';
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => '');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(false);
            });

            test('false is background', () => {
                AppState.currentState = 'background';
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => '');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(false);
            });

            test('undefined otherwise', () => {
                AppState.currentState = 'foobar';
                screenStatusSpy = jest.spyOn(AppStateSelectors, 'getScreenStatus').mockImplementation(() => '');
                scannedDevicesSpy = jest.spyOn(ScannedDevicesSelectors, 'getScannedDevices').mockImplementation(() => []);
                connectedDeviceStatusSpy = jest.spyOn(ConnectedDeviceStatusSelectors, 'getConnectedDeviceStatus').mockImplementation(() => '');
                workoutEmptySpy = jest.spyOn(SetsSelectors, 'getIsWorkoutEmpty').mockImplementation(() => true);
                let params = {};

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBeUndefined();

            });
        });

        describe('is_app_in_background', () => {

        });

        describe('is_app_inactive', () => {
            
        });

        describe('scanned_devices', () => {
            
        });

        describe('num_scanned_devices', () => {
            
        });

        describe('is_bluetooth_on', () => {
            
        });

        describe('is_workout_in_progress', () => {
            
        });
    });
});
