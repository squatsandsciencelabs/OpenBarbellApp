package com.openbarbellapp;

import android.app.Application;

import com.brentvatne.react.ReactVideoPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.horcrux.svg.SvgPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager; // note, may not be needed, theoretically removed in upgrade from 0.39.2 to 0.42.3
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.crash.RNFirebaseCrashPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import com.ocetnik.timer.BackgroundTimerPackage;

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
            new RNFetchBlobPackage(),
            new SvgPackage(),
            new KCKeepAwakePackage(),
            new RNGoogleSigninPackage(),
            new RNDeviceInfo(),
            new VectorIconsPackage(),
            new RCTCameraPackage(),
            new ReactVideoPackage(),
              new BackgroundTimerPackage(),
              new RFDuinoServicePackage(),
              new RNFirebasePackage(),
              new RNFirebaseAnalyticsPackage(),
              new RNFirebaseCrashPackage(),
              new RNFirebaseCrashlyticsPackage(),
              new RNFirebaseMessagingPackage(),
              new RNFirebaseRemoteConfigPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
