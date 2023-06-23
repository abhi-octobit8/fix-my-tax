package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.View
import android.webkit.ValueCallback
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ProgressBar
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import com.sky.fixmytax.MyWebViewClient
import com.sky.fixmytax.R

class AboutActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private lateinit var superSafeWebView: WebView
    private var safeBrowsingIsInitialized: Boolean = false
    lateinit var pBar: ProgressBar
   val PDF_VIEW = "https://drive.google.com/viewerng/viewer?embedded=true&url="
    val TERM_COND= "https://fixmytax.zupiers.com/documents/TERMS_CONDITIONS_FMT.pdf"
    val ITR_Filing= "https://fixmytax.zupiers.com/documents/ITR_FILINING_DOCUMENT.pdf"
    val TDS_Filing= "https://fixmytax.zupiers.com/documents/TDS_TCS_FILING.pdf"
    val gst_nOTICE= "https://fixmytax.zupiers.com/documents/NOTICES_UNDER_GST.pdf"
    val gst_APPEAL= "https://fixmytax.zupiers.com/documents/DOCUMENTS_REQUIRED_FOR_APPEALS.pdf"
    @SuppressLint("SetJavaScriptEnabled", "MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about)
        webView = findViewById(R.id.webview)
        pBar = findViewById<ProgressBar>(R.id.loading)

        Handler().postDelayed({
            //doSomethingHere()
                              pBar.visibility = View.GONE
            webView.visibility = View.VISIBLE
        }, 10000)


        webView.settings.javaScriptEnabled = true




        when(intent.getIntExtra("type",0)){
            0 -> {
                superSafeWebView = WebView(this)
                webView.settings.domStorageEnabled = true
                webView.loadUrl("https://fixmytax.zupiers.com/about")
            }
            1 -> {
                webView.loadUrl(PDF_VIEW+TERM_COND)
            }
            2 -> {
                webView.loadUrl(PDF_VIEW+ITR_Filing)
            }
            3 -> {
                webView.loadUrl(PDF_VIEW+TDS_Filing)
            }
            4 -> {
                webView.loadUrl(PDF_VIEW+gst_nOTICE)
            } 5 -> {
                webView.loadUrl(PDF_VIEW+gst_APPEAL)
            }

        }
    }
}


       // webView.loadUrl("https://fixmytax.zupiers.com/documents/TERMS_CONDITIONS_FMT.pdf")
     //   );

