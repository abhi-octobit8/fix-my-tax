package com.sky.fixmytax.network

import android.annotation.SuppressLint
import android.util.Log
import com.sky.fixmytax.ConstVariable
import com.sky.fixmytax.MainApplication
import com.sky.fixmytax.SharePrefrence.getUserAccessToken
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

@SuppressLint("StaticFieldLeak")
object RetrofitHelper {


    private const val baseUrl = "https://fixmytaxapi.zupiers.com/api/"

    val context = MainApplication.applicationContext()


    private var tokemB =   getUserAccessToken(context)

    val tokenA = ConstVariable.accessToken



    var finalToken = tokenA



  private val okHttpClient = OkHttpClient.Builder().apply {
        addInterceptor(
            Interceptor { chain ->
                val builder = chain.request().newBuilder()
                this.addInterceptor(interceptor)
               // builder.header("X-App-Version", "1.23")
               // builder.header("X-Platform", "Android")
                Log.d("gbhb:A", tokemB)
                Log.d("gbhb:B", tokenA)
                Log.d("gbhb:BA", ConstVariable.accessToken)
                if (tokenA == ""){
                    finalToken = tokemB
                }
                if(ConstVariable.accessToken =="") {
                    builder.header("Authorization", "Bearer " + tokemB)
                }else {
                    builder.header("Authorization", "Bearer " + ConstVariable.accessToken)
                }
                return@Interceptor chain.proceed(builder.build())
            }
        )
    }.build()

    val interceptor: HttpLoggingInterceptor = HttpLoggingInterceptor().apply {
        this.level = HttpLoggingInterceptor.Level.BODY
    }


    fun getInstance(): Retrofit {
        return Retrofit.Builder().baseUrl(baseUrl)
            .addConverterFactory(GsonConverterFactory.create())
            // we need to add converter factory to
            // convert JSON object to Java object
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)

            .build()

    }
}