package com.growapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader
import com.growapp.LanScanPackage
import com.growapp.TimeControllerPackage
import com.nozbe.watermelondb.WatermelonDBPackage

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override fun getPackages(): List<ReactPackage> {
            val packages = PackageList(this).packages.toMutableList()
            // Seus módulos nativos manuais
            packages.add(TimeControllerPackage())
            packages.add(LanScanPackage())
            packages.add(WatermelonDBPackage())
            return packages
        }

        override fun getJSMainModuleName(): String = "index"
    }

    override val reactNativeHost: ReactNativeHost
        get() = mReactNativeHost

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}