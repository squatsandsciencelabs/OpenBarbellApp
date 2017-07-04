package com.openbarbellapp;

import android.app.Application;

import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager; // note, may not be needed, theoretically removed in upgrade from 0.39.2 to 0.42.3
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.ocetnik.timer.BackgroundTimerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new RCTCameraPackage(),
              new BackgroundTimerPackage(),
              new RNGoogleSigninPackage(),
              new RFDuinoServicePackage());
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
