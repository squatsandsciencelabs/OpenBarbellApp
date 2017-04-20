package com.openbarbellapp;

import android.Manifest;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothProfile;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;
import java.util.UUID;
import java.util.concurrent.TimeUnit;


public class RFDuinoService extends Service {

    private static final String TAG = "RFDuinoService";

    public final static String ACTION_CONNECTED = "com.openbarbellapp.ACTION_CONNECTED";
    public final static String ACTION_DISCONNECTED = "com.openbarbellapp.ACTION_DISCONNECTED";
    public final static String ACTION_DATA_AVAILABLE = "com.openbarbellapp.ACTION_DATA_AVAILABLE";
    public final static String EXTRA_DATA = "com.openbarbellapp.EXTRA_DATA";

    public final static UUID UUID_SERVICE = BluetoothHelper.sixteenBitUuid(0x2220);
    public final static UUID UUID_RECEIVE = BluetoothHelper.sixteenBitUuid(0x2221);
    public final static UUID UUID_SEND = BluetoothHelper.sixteenBitUuid(0x2222);
    public final static UUID UUID_DISCONNECT = BluetoothHelper.sixteenBitUuid(0x2223);
    public final static UUID UUID_CLIENT_CONFIGURATION = BluetoothHelper.sixteenBitUuid(0x2902);

    private BluetoothManager mBluetoothManager;
    private BluetoothAdapter mBluetoothAdapter;
    private String mBluetoothDeviceAddress;
    private BluetoothGatt mBluetoothGatt;
    private BluetoothGattService mBluetoothGattService;

    /* service binding */

    // the communication channel to the service
    private final IBinder mBinder = new LocalBinder();
    public class LocalBinder extends Binder {

        public RFDuinoService getService() {
            return RFDuinoService.this;
        }

    }

    // returns the communication channel to the service
    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    // called when all clients have disconnected from a particular interface published by the service
    @Override
    public boolean onUnbind(Intent intent) {
        // after using a given device, make sure that BluetoothGatt.close is called properly
        close();
        return super.onUnbind(intent);
    }

    /* service broadcasting */

    // send broadcast to module
    private void broadcastUpdate(final String action) {
        final Intent intent = new Intent(action);
        sendBroadcast(intent, Manifest.permission.BLUETOOTH);
    }

    // send some other broadcast to module
    private void broadcastUpdate(final String action, final BluetoothGattCharacteristic characteristic) {
        if (UUID_RECEIVE.equals(characteristic.getUuid())) {
            final Intent intent = new Intent(action);
            intent.putExtra(EXTRA_DATA, characteristic.getValue());
            sendBroadcast(intent, Manifest.permission.BLUETOOTH);
        }
    }

    // actions that will be broadcast by this service
    public static IntentFilter getIntentFilter() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(ACTION_CONNECTED);
        filter.addAction(ACTION_DISCONNECTED);
        filter.addAction(ACTION_DATA_AVAILABLE);
        return filter;
    }

    /* finally, the device connection logic :-) */

    /**
     * Initializes the Bluetooth Adapter.
     * @return True, if the bluetooth adapter was successfully initialized. False, otherwise.
     */
    public boolean initService() {
        // for API level 18 and above, get a reference to BluetoothAdapter through BluetoothManager
        if (mBluetoothManager == null) {
            mBluetoothManager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
            if (mBluetoothManager == null) {
                return false;
            }
        }

        // attempt to get BluetoothAdapter from BluetoothManager, return if was able to get
        mBluetoothAdapter = mBluetoothManager.getAdapter();
        return mBluetoothAdapter != null;
    }

    /**
     * Attempts to connect to the GATT service hosted by the device at address.
     * @param address The address of the device.
     * @return True, if successfully connected to the GATT service. False, otherwise.
     */
    public boolean connectTargetDevice(final String address) {
        // no bluetooth adapter, return failure
        if (mBluetoothAdapter == null || address == null) return false;

        // attempt connection to a previously connected device
        if (mBluetoothDeviceAddress != null && address.equals(mBluetoothDeviceAddress)
                && mBluetoothGatt != null) {
            return mBluetoothGatt.connect();
        }

        // attempt connection to a new device
        final BluetoothDevice device = mBluetoothAdapter.getRemoteDevice(address);
        // connect to the GATT server hosted by this device (context, directly connecting to device, the gatt callback handler)
        mBluetoothGatt = device.connectGatt(this, false, mGattCallback);
        mBluetoothDeviceAddress = address;
        return true;
    }

    // disconnects from the target device
    public void disconnectTargetDevice() {
        if (mBluetoothGatt != null) {
            mBluetoothGatt.disconnect();
        }
    }

    // The GATT callback handler that will receive asynchronous callbacks
    private final BluetoothGattCallback mGattCallback = new BluetoothGattCallback() {

        // broadcasts connection state changes to module
        @Override
        public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
            switch (newState) {
                // connected (successfully / failed)
                case BluetoothProfile.STATE_CONNECTED:
                    mBluetoothGatt.discoverServices();
                    break;
                // disconnected
                case BluetoothProfile.STATE_DISCONNECTED:
                    broadcastUpdate(ACTION_DISCONNECTED);
                    break;
            }
        }

        // called after the completion of discoverServices()
        @Override
        public void onServicesDiscovered(BluetoothGatt gatt, int status) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                // get the gatt service
                mBluetoothGattService = gatt.getService(UUID_SERVICE);
                if (mBluetoothGattService == null) {
                    return;
                }

                // setup characteristics
                BluetoothGattCharacteristic receiveCharacteristic = mBluetoothGattService.getCharacteristic(UUID_RECEIVE);
                if (receiveCharacteristic != null) {
                    BluetoothGattDescriptor receiveConfigDescriptor = receiveCharacteristic.getDescriptor(UUID_CLIENT_CONFIGURATION);

                    if (receiveConfigDescriptor != null) {
                        gatt.setCharacteristicNotification(receiveCharacteristic, true);
                        receiveConfigDescriptor.setValue(BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE);
                        gatt.writeDescriptor(receiveConfigDescriptor);
                    }
                }

                broadcastUpdate(ACTION_CONNECTED);
            }
        }

        // reports the result of a characteristic read operation
        @Override
        public void onCharacteristicRead(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic, int status) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                broadcastUpdate(ACTION_DATA_AVAILABLE, characteristic);
            }
        }

        // reports the result of a characteristic write operation
        @Override
        public void onCharacteristicChanged(BluetoothGatt gatt, BluetoothGattCharacteristic characteristic) {
            broadcastUpdate(ACTION_DATA_AVAILABLE, characteristic);
        }

    };

    // closes the bluetoothGatt
    private void close() {
        if (mBluetoothGatt == null) return;

        mBluetoothGatt.close();
        mBluetoothGatt = null;
    }

}
