package com.openbarbellapp;

import android.content.pm.PackageManager;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "OBBApp";
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == 405) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // permission granted! do nothing
            } else {
                Toast.makeText(MainActivity.this, "Without access to location, you will be unable to find devices. Please reinstall and allow location permissions!", Toast.LENGTH_SHORT).show();
            }
        }
    }
}
