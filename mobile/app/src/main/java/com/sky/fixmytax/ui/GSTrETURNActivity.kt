package com.sky.fixmytax.ui

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.sky.fixmytax.R
import com.sky.fixmytax.databinding.ActivityContactUsBinding
import com.sky.fixmytax.databinding.ActivityGstrEturnactivityBinding

class GSTrETURNActivity : AppCompatActivity() {
    lateinit var binding: ActivityGstrEturnactivityBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gstr_eturnactivity)
        binding = ActivityGstrEturnactivityBinding.inflate(layoutInflater)
        setContentView(binding.root)

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
    }
}