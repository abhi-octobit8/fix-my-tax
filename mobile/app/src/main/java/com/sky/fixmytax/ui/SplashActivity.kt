package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.WindowManager
import com.sky.fixmytax.MainActivity
import com.sky.fixmytax.R
import com.sky.fixmytax.SharePrefrence
import com.sky.fixmytax.SharePrefrence.getUserAccessToken
import com.sky.fixmytax.SharePrefrence.getUserLogin
import com.sky.fixmytax.onboarding.OnBoardingActivity
import com.sky.fixmytax.ui.ui.login.LoginActivity

@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        SharePrefrence.commonInit(this)

        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        // we used the postDelayed(Runnable, time) method
        // to send a message with a delayed time.
        //Normal Handler is deprecated , so we have to change the code little bit

        // Handler().postDelayed({
        Handler(Looper.getMainLooper()).postDelayed({
            if (getUserAccessToken(this) != "") {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }else {
                val intent = Intent(this, OnBoardingActivity::class.java)
                startActivity(intent)
            }
            finish()
        }, 3000)
    }
}