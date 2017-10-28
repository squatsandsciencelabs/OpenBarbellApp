// NOTE: maybe need to reset these somewhere? For now just going with this
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
    let params = null;
    const realTron = console.tron;
    const realGetScreenStatus = AppStateSelectors.getScreenStatus;
    const realGetScannedDevices = ScannedDevicesSelectors.getScannedDevices;
    const realGetConnectedDeviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus;
    const realGetIsWorkoutEmpty = SetsSelectors.getIsWorkoutEmpty;

    beforeAll(() => {
        console.tron = console.tron = {
            log: () => null,
            display: () => null
        };
    });

    beforeEach(() => {
        params = {};
    });

    afterEach(() => {
        AppStateSelectors.getScreenStatus = realGetScreenStatus;
        ScannedDevicesSelectors.getScannedDevices = realGetScannedDevices;
        ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = realGetConnectedDeviceStatus;
        SetsSelectors.getIsWorkoutEmpty = realGetIsWorkoutEmpty;
    });

    afterAll(() => {
        console.tron = realTron;
    });

    describe('logEventWithAppState', () => {
        describe('is_screen_locked', () => {
            beforeEach(() => {
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });

            test('false', () => {
                AppStateSelectors.getScreenStatus = () => 'active';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBeFalsy();
            });

            test('true', () => {
                AppStateSelectors.getScreenStatus = () => '';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBeTruthy();
            });
        });

        describe('is_app_active', () => {
            let originalAppCurrentState = null;

            beforeEach(() => {
                originalAppCurrentState = AppState.currentState;
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
                params = {};
            });

            afterEach(() => {
                AppState.currentState = originalAppCurrentState;
            });

            test('true if active', () => {
                AppState.currentState = 'active';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(true);
            });

            test('false if inactive', () => {
                AppState.currentState = 'inactive';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(false);
            });

            test('false is background', () => {
                AppState.currentState = 'background';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_active).toBe(false);
            });

            test('undefined otherwise', () => {
                AppState.currentState = 'foobar';

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
