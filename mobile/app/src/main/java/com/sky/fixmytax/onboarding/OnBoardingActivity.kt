package com.sky.fixmytax.onboarding

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.sky.fixmytax.BusinessConsultActivity
import com.sky.fixmytax.ConstVariable
import com.sky.fixmytax.R
import com.sky.fixmytax.databinding.ActivityChangePasswordBinding
import com.sky.fixmytax.databinding.ActivityOnBoardingBinding
import com.sky.fixmytax.ui.*

class OnBoardingActivity : AppCompatActivity() {
    lateinit var _binding: ActivityOnBoardingBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_on_boarding)
        _binding = ActivityOnBoardingBinding.inflate(layoutInflater)
        setContentView(_binding.root)
        getNextClick()
    }
    private fun getNextClick(){

        _binding.lytIncomeTaxGstAppeal.setOnClickListener {

            val intent = Intent(this, IncomeTaxGstAppealActivit::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
        /*_binding.lytIncomeTaxGstAppeal.setOnClickListener {
            Toast.makeText(this,"under Development",Toast.LENGTH_LONG).show()
        }*/
        _binding.lytBusinessConsult.setOnClickListener {
            // Toast.makeText(this,"under Development",Toast.LENGTH_LONG).show()
            val intent = Intent(this, BusinessConsultActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
        _binding.lytVideoConsultationFiling.setOnClickListener {
            // Toast.makeText(this,"under Development",Toast.LENGTH_LONG).show()
            val intent = Intent(this, VideoConsulatationActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }

        _binding.lytGstReturn.setOnClickListener {
            val intent = Intent(this, GSTrETURNActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
        _binding.gstNotice.setOnClickListener {
            val intent = Intent(this, GSTNoticeActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
        _binding.lytItrTdsTcsNotices.setOnClickListener {
            val intent = Intent(this, ITRNoticeActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }

        _binding.lytTdsTcsFiling.setOnClickListener {
            val intent = Intent(this, TDSTCSFilingActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
        _binding.lytItrFiling.setOnClickListener {
            val intent = Intent (this, FilingITRActivity::class.java)
            intent.putExtra(ConstVariable.IS_LOGIN,false)
            startActivity(intent)
        }
    }


    override fun onBackPressed() {
        super.onBackPressed()
        moveTaskToBack(true)
    }
}