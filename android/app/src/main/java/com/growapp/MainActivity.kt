package com.growapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "GrowApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      // Isso ignora completamente as verificações de Nova Arquitetura do RN 0.82
    }
  }
}