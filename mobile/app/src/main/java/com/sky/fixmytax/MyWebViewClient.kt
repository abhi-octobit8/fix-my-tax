package com.sky.fixmytax

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.widget.Toast
import androidx.webkit.SafeBrowsingResponseCompat
import androidx.webkit.WebViewClientCompat
import androidx.webkit.WebViewFeature

class MyWebViewClient : WebViewClientCompat() {
    // Automatically go "back to safety" when attempting to load a website that
    // Google has identified as a known threat. An instance of WebView calls
    // this method only after Safe Browsing is initialized, so there's no
    // conditional logic needed here.
    override fun onSafeBrowsingHit(
        view: WebView,
        request: WebResourceRequest,
        threatType: Int,
        callback: SafeBrowsingResponseCompat
    ) {
        // The "true" argument indicates that your app reports incidents like
        // this one to Safe Browsing.
        if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_RESPONSE_BACK_TO_SAFETY)) {
            callback.backToSafety(true)
            Toast.makeText(view.context, "Unsafe web page blocked.", Toast.LENGTH_LONG).show()
        }
    }
}