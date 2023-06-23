package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.sky.fixmytax.BuildConfig
import com.sky.fixmytax.R
import com.sky.fixmytax.databinding.ActivityContactUsBinding
import com.sky.fixmytax.model.ContactUsRequest
import com.sky.fixmytax.model.ContactUsResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper


class ContactUsActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private lateinit var superSafeWebView: WebView

    lateinit var binding: ActivityContactUsBinding

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact_us)
        binding = ActivityContactUsBinding.inflate(layoutInflater)
        setContentView(binding.root)




        binding.submitCreate.setOnClickListener {

            val contactUsRequest =  ContactUsRequest(
             email = binding.editTextTopic.text.toString(),
                feedback = binding.editTextTopic.text.toString(),
                firstName = binding.name.text.toString(),
                lastName = "",
                phone = binding.phoneNumber.text.toString()
            )
            val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

            var loginResponse: ContactUsResponse? = null
            lifecycleScope.launchWhenCreated  {
                try {
                    Log.d("ayush: ", contactUsRequest.toString())
                    val result = quotesApi.postContactUs(contactUsRequest)

                    loginResponse = result.body() as ContactUsResponse?
                    Log.d("ayush: ", result.body().toString())
                    Log.d("ayush: ", result.toString())
                    if(result.code()==200 && loginResponse?.result != null){

                      //  Toast.makeText(this@ContactUsActivity,"Successfully submitted",Toast.LENGTH_LONG).show()
                        finish()

                    }
                    else
                    {
                        Log.d("ayush: ", loginResponse!!.toString())
                    }
                }catch (Ex:Exception){
                    Ex.localizedMessage?.let { it1 -> Log.e("Error", it1) }
                }
            }
        }

        binding.callLyt.setOnClickListener {
            val intent = Intent(Intent.ACTION_DIAL)
            intent.data = Uri.parse("tel:6387022844")
            startActivity(intent)
        }
        binding.emailLyt.setOnClickListener {

            val i = Intent(Intent.ACTION_SEND)
            i.type = "message/rfc822"
            i.putExtra(Intent.EXTRA_EMAIL, arrayOf("contact@fixmytax.in"))
            i.putExtra(Intent.EXTRA_SUBJECT, "Contact Us")
            i.putExtra(Intent.EXTRA_TEXT, "body of email")
            try {
                startActivity(Intent.createChooser(i, "Send mail..."))
            } catch (ex: ActivityNotFoundException) {
              //  Toast.makeText(this@ContactUsActivity, "There are no email clients installed.", Toast.LENGTH_SHORT ).show()
            }

        }

        appVersion()
    }

    @SuppressLint("SetTextI18n")
    private fun appVersion(){
        val versionName: String = BuildConfig.VERSION_NAME
        binding.tvAppVersion.text ="App Version: "+versionName
    }

}