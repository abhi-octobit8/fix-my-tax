package com.sky.fixmytax

import android.app.Application
import android.content.Context

 open class MainApplication : Application() {

    init {
        instance = this
    }

    companion object {
        private var instance: MainApplication? = null

        fun applicationContext() : Context {
            return instance!!.applicationContext
        }
    }

    override fun onCreate() {
        super.onCreate()
        // initialize for any
          instance = this
        // Use ApplicationContext.
        // example: SharedPreferences etc...
      //  MainApplication.applicationContext()
      //  neeraj1032@gmail.com
    }
}