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

                expect(params.is_screen_locked).toBe(false);
            });

            test('true', () => {
                AppStateSelectors.getScreenStatus = () => '';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_screen_locked).toBe(true);
            });
        });

        describe('is_app_active', () => {
            let realAppCurrentState = null;

            beforeEach(() => {
                realAppCurrentState = AppState.currentState;
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });

            afterEach(() => {
                AppState.currentState = realAppCurrentState;
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
            let realAppCurrentState = null;
            
            beforeEach(() => {
                realAppCurrentState = AppState.currentState;
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });

            afterEach(() => {
                AppState.currentState = realAppCurrentState;
            });

            test('false if active', () => {
                AppState.currentState = 'active';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_in_background).toBe(false);
            });

            test('true if inactive', () => {
                AppState.currentState = 'inactive';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_in_background).toBe(true);
            });

            test('true is background', () => {
                AppState.currentState = 'background';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_in_background).toBe(true);
            });

            test('undefined otherwise', () => {
                AppState.currentState = 'foobar';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_in_background).toBeUndefined();
            });
        });

        describe('is_app_inactive', () => {
            let realAppCurrentState = null;
            
            beforeEach(() => {
                realAppCurrentState = AppState.currentState;
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });

            afterEach(() => {
                AppState.currentState = realAppCurrentState;
            });

            test('false if active', () => {
                AppState.currentState = 'active';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_inactive).toBe(false);
            });

            test('true if inactive', () => {
                AppState.currentState = 'inactive';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_inactive).toBe(true);
            });

            test('false is background', () => {
                AppState.currentState = 'background';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_inactive).toBe(false);
            });

            test('undefined otherwise', () => {
                AppState.currentState = 'foobar';

                sut.logEventWithAppState(null, params, null);

                expect(params.is_app_inactive).toBeUndefined();
            });
        });

        describe('scanned_devices', () => {
            beforeEach(() => {
                AppStateSelectors.getScreenStatus = () => '';
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });

            test('0', () => {
                ScannedDevicesSelectors.getScannedDevices = () => [];

                sut.logEventWithAppState(null, params, null);
                
                expect(params.scanned_devices).toBe('');
            });

            test('1', () => {
                ScannedDevicesSelectors.getScannedDevices = () => ['OB 3000'];
                
                sut.logEventWithAppState(null, params, null);
                
                expect(params.scanned_devices).toBe('3000');
            });

            test('2', () => {
                ScannedDevicesSelectors.getScannedDevices = () => ['OB 3000', 'OB 3021'];
                
                sut.logEventWithAppState(null, params, null);
                
                expect(params.scanned_devices).toBe('30003021');
            });

            test('26', () => {
                ScannedDevicesSelectors.getScannedDevices = () => [
                    'OB 3001', 'OB 3002', 'OB 3003', 'OB 3004', 'OB 3005', 'OB 3006', 'OB 3007', 'OB 3008', 'OB 3009', 'OB 3010',
                    'OB 2001', 'OB 2002', 'OB 2003', 'OB 2004', 'OB 2005', 'OB 2006', 'OB 2007', 'OB 2008', 'OB 2009', 'OB 2010',
                    'OB 1001', 'OB 1002', 'OB 1003', 'OB 1004', 'OB 1005', 'OB 1006'
                ];
                
                sut.logEventWithAppState(null, params, null);
                
                expect(params.scanned_devices).toBe('3001300230033004300530063007300830093010200120022003200420052006200720082009201010011002100310041005');
            });
        });

        describe('num_scanned_devices', () => {
            
        });

        describe('is_bluetooth_on', () => {

            beforeEach(() => {
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                SetsSelectors.getIsWorkoutEmpty = () => true;
            });
            
            test('false if bluetooth off', () => {
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => 'BLUETOOTH_OFF';
                
                sut.logEventWithAppState(null, params, null);
                
                expect(params.is_bluetooth_on).toBe(false);
            });

            test('true otherwise', () => {
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => 'foobar';

                sut.logEventWithAppState(null, params, null);
                
                expect(params.is_bluetooth_on).toBe(true);
            });
        });

        describe('is_workout_in_progress', () => {
            beforeEach(() => {
                AppStateSelectors.getScreenStatus = () => '';
                ScannedDevicesSelectors.getScannedDevices = () => [];
                ConnectedDeviceStatusSelectors.getConnectedDeviceStatus = () => '';
            });

            test('true', () => {
                SetsSelectors.getIsWorkoutEmpty = () => false;

                sut.logEventWithAppState(null, params, null);
                
                expect(params.is_workout_in_progress).toBe(true);
            });

            test('false', () => {
                SetsSelectors.getIsWorkoutEmpty = () => true;

                sut.logEventWithAppState(null, params, null);
                
                expect(params.is_workout_in_progress).toBe(false);
            });
        });
    });
});
