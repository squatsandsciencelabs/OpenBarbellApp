package com.openbarbellapp;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.IBinder;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.List;

public class RFDuinoServiceModule extends ReactContextBaseJavaModule implements BluetoothAdapter.LeScanCallback, LifecycleEventListener {

    private static final String TAG = "RFDuinoServiceModule";

    /* constants */

    // state machine
    final private static int STATE_BLUETOOTH_OFF = 1;   // can't do anything until user enables bluetooth
    final private static int STATE_DISCONNECTED = 2;    // scan for devices or select a device to connect to
    final private static int STATE_CONNECTING = 3;      // wait for connection or cancel connection
    final private static int STATE_CONNECTED = 4;       // receive data or cancel connection
    // scanning
    private static final String REACT_EVENT_FOUND = "Found";
    private static final String REACT_EVENT_PARAM_NAME = "name";
    // connections status
    private static final String REACT_EVENT_DEVICE_BLUETOOTH_OFF = "BluetoothOff";
    private static final String REACT_EVENT_DEVICE_DISCONNECTED = "Disconnected";
    private static final String REACT_EVENT_DEVICE_CONNECTING = "Connecting";
    private static final String REACT_EVENT_DEVICE_CONNECTED = "Connected";
    // connected
    private static final String REACT_EVENT_DATA = "Data";

    /* variables */

    // scanning
    private boolean scanningForDevices;
    private HashMap<String, BluetoothDevice> devices;
    // connection status
    private int state;
    private BluetoothAdapter bluetoothAdapter;
    private BluetoothLeScanner bluetoothLeScanner;
    private boolean isRfduinoReceiverRegistered;
    private boolean isBluetoothStateReceiverRegistered;
    private ScanCallback leScanCallback;
    // connected
    private BluetoothDevice targetDevice;
    private RFDuinoService rfduinoService;

    /* constructors */

    public RFDuinoServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "RFDuinoLib";
    }

    /* start of life cycle */

    // called when app is first started
    /**
     * Initializes everything!
     */
    @ReactMethod
    public void start() {
        devices = new HashMap<>();
        bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();
        }

        // set initial state
        state = bluetoothAdapter.isEnabled() ? STATE_DISCONNECTED : STATE_BLUETOOTH_OFF;
    }

    // called when app is navigated to
    @Override
    public void onHostResume() {
        obtainLocationPermission();
        registerReceivers();
        sendDeviceStateReactEvent();
    }

    private void obtainLocationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    if (!ActivityCompat.shouldShowRequestPermissionRationale(currentActivity, Manifest.permission.ACCESS_COARSE_LOCATION)) {
                        Toast.makeText(getReactApplicationContext(), "You must allow location to find your device.", Toast.LENGTH_SHORT).show();
                        ActivityCompat.requestPermissions(currentActivity, new String[]{ Manifest.permission.ACCESS_COARSE_LOCATION}, 405);
                    }
                }
            }
        }
    }

    private void registerReceivers() {
        // rfduino
        if (!isRfduinoReceiverRegistered) {
            getReactApplicationContext().registerReceiver(rfduinoBroadcastReceiver, RFDuinoService.getIntentFilter());
            isRfduinoReceiverRegistered = true;
            Log.i(TAG, "Rfduino receiver registered");
        }

        // bluetooth state
        if (!isBluetoothStateReceiverRegistered) {
            getReactApplicationContext().registerReceiver(bluetoothStateReceiver, RFDuinoService.getIntentFilter());
            isBluetoothStateReceiverRegistered = true;
            Log.i(TAG, "Bluetooth state receiver registered");
        }
    }

    /* end of life cycle */

    // called on sleep / lock
    @Override
    public void onHostPause() {
        stopScan();
    }

    // called when app is navigated away from
    /**
     * Destroys everything!
     */
    @Override
    public void onHostDestroy() {
        disconnectDevice();
        unregisterReceivers();
    }

    private void unregisterReceivers() {
        // rfduino
        if (isRfduinoReceiverRegistered) {
            try {
                getReactApplicationContext().unregisterReceiver(rfduinoBroadcastReceiver);
            } catch (IllegalArgumentException ignored) {}
            isRfduinoReceiverRegistered = false;
            Log.i(TAG, "Rfduino receiver unregistered");
        }

        // bluetooth state
        if (isBluetoothStateReceiverRegistered) {
            try {
                getReactApplicationContext().unregisterReceiver(bluetoothStateReceiver);
            } catch (IllegalArgumentException ignored) {}
            isBluetoothStateReceiverRegistered = false;
            Log.i(TAG, "Bluetooth state receiver unregistered");
        }
    }

    /* scanning logic */

    /**
     * Start scanning for BLE devices.
     */
    @ReactMethod
    public void startScan() {
        if (scanningForDevices) return;

        devices.clear();

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            if (bluetoothLeScanner != null) {
                bluetoothLeScanner.startScan(getNewLeScanCallback());
                scanningForDevices = true;
            }
        } else {
            scanningForDevices = bluetoothAdapter.startLeScan(this);
        }

    }

    // Older BLE scanning
    @Override
    public void onLeScan(BluetoothDevice device, int rssi, byte[] scanRecord) {
        putDevice(device);
    }

    // Newer BLE scanning
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private ScanCallback getNewLeScanCallback() {
        if (leScanCallback == null) {
            leScanCallback = new ScanCallback() {

                @Override
                public void onScanResult(int callbackType, ScanResult scanResult) {
                    super.onScanResult(callbackType, scanResult);
                    putDevice(scanResult.getDevice());
                }

                @Override
                public void onBatchScanResults(List<ScanResult> results) {
                    super.onBatchScanResults(results);
                    for (ScanResult scanResult : results) {
                        putDevice(scanResult.getDevice());
                    }
                }

                @Override
                public void onScanFailed(int errorCode) {
                    super.onScanFailed(errorCode);
                    Log.e(TAG, "leScanCallback failed with " + errorCode);
                }
            };
        }
        return leScanCallback;
    }

    /**
     * Add a device to this scans current list of devices if it is unique. Send device as event.
     * @param device The information about the bluetooth LE device.
     */
    private void putDevice(BluetoothDevice device) {
        if (device != null && device.getName() != null && !device.getName().isEmpty()) {
            String deviceName = device.getName();
            // only send the 'Found' event if it's a unique device for this scan
            if (!devices.containsKey(deviceName)) {
                devices.put(deviceName, device);
                sendDeviceReactEvent(REACT_EVENT_FOUND, deviceName);
            }
        }
    }

    /**
     * Stop scanning for BLE devices.
     */
    @ReactMethod
    public void stopScan() {
        if (!scanningForDevices) return;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            bluetoothLeScanner.stopScan(getNewLeScanCallback());
        } else {
            bluetoothAdapter.stopLeScan(this);
        }

        scanningForDevices = false;
    }

    /* connecting logic */

    // notifies of bluetooth state changes
    private final BroadcastReceiver bluetoothStateReceiver = new BroadcastReceiver() {

        @Override
        public void onReceive(Context context, Intent intent) {
            int state = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, 0);

            if (state == BluetoothAdapter.STATE_ON) {
                upgradeState(STATE_DISCONNECTED);
            } else if (state == BluetoothAdapter.STATE_OFF) {
                downgradeState(STATE_BLUETOOTH_OFF);
            }
        }

    };

    // upward state movement
    private void upgradeState(int newState) {
        if (newState > state) {
            updateState(newState);
        }
    }

    // downward  state movement
    private void downgradeState(int newState) {
        if (newState < state) {
            updateState(newState);
        }
    }

    // exact state change & sends event
    private void updateState(int newState) {
        state = newState;
        sendDeviceStateReactEvent();
    }

    /**
     * Begin connecting to a OB device.
     * @param deviceName The name of the device to connect to.
     */
    @ReactMethod
    public void connectDevice(String deviceName) {
        targetDevice = devices.get(deviceName);

        // start connecting to target device
        if (targetDevice != null) {
            Intent i = new Intent(getReactApplicationContext(), RFDuinoService.class);
            getReactApplicationContext().bindService(i, rfduinoServiceConnection, Service.BIND_AUTO_CREATE);
            upgradeState(STATE_CONNECTING);
        }
    }

    // callback type method tracking the status of the rfduinoService
    private final ServiceConnection rfduinoServiceConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            rfduinoService = ((RFDuinoService.LocalBinder) service).getService();

            if ((!rfduinoService.initService()) || !(rfduinoService.connectTargetDevice(targetDevice.getAddress()))) {
                // discontinue connection if unable to initialize or connect gatt
                downgradeState(STATE_DISCONNECTED);
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            rfduinoService = null;
            downgradeState(STATE_DISCONNECTED);
        }

    };

    /**
     * Disconnect from the currently connected device.
     */
    @ReactMethod
    public void disconnectDevice() {
        if (rfduinoService != null) {
            rfduinoService.disconnectTargetDevice();
            getReactApplicationContext().unbindService(rfduinoServiceConnection);
        }
        downgradeState(STATE_DISCONNECTED);
    }

    // receives information from the rfduinoService
    private final BroadcastReceiver rfduinoBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            switch (action) {
                case RFDuinoService.ACTION_CONNECTED:
                    upgradeState(STATE_CONNECTED);
                    break;
                case RFDuinoService.ACTION_DISCONNECTED:
                    downgradeState(STATE_DISCONNECTED);
                    break;
                case RFDuinoService.ACTION_DATA_AVAILABLE:
                    sendData(intent.getByteArrayExtra(RFDuinoService.EXTRA_DATA));
                    break;
            }
        }

        // translate & send data from OB
        private void sendData(byte[] data) {
            if (data.length == 4) {
                byte[] dataRev = new byte[4];
                for (int i = 0; i < 4; i++) {
                    dataRev[i] = data[3 - i];
                }
                ByteBuffer buffer = ByteBuffer.wrap(dataRev);
                sendDataReactEvent(String.valueOf(buffer.getFloat()));
            }
        }
    };

    /* sending react events */

    private void sendDeviceStateReactEvent() {
        switch (state) {
            case STATE_BLUETOOTH_OFF:
                sendDeviceReactEvent(REACT_EVENT_DEVICE_BLUETOOTH_OFF, null);
                break;
            case STATE_DISCONNECTED:
                sendDeviceReactEvent(REACT_EVENT_DEVICE_DISCONNECTED, null);
                break;
            case STATE_CONNECTING:
                if (targetDevice != null) {
                    sendDeviceReactEvent(REACT_EVENT_DEVICE_CONNECTING, targetDevice.getName());
                }
                break;
            case STATE_CONNECTED:
                if (targetDevice != null) {
                    sendDeviceReactEvent(REACT_EVENT_DEVICE_CONNECTED, targetDevice.getName());
                }
                break;
        }
    }

    private void sendDeviceReactEvent(String eventName, String deviceName) {
        WritableMap params = Arguments.createMap();
        if (deviceName != null) {
            params.putString(REACT_EVENT_PARAM_NAME, deviceName);
        }
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private void sendDataReactEvent(String data) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(REACT_EVENT_DATA, data);
    }

}



