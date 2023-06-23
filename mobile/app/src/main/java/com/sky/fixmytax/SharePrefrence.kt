package com.sky.fixmytax

import android.content.Context
import android.content.Context.MODE_PRIVATE

import android.content.SharedPreferences
import android.content.SharedPreferences.Editor
import com.google.gson.Gson
import com.sky.fixmytax.model.UserData


object SharePrefrence {



 //   fun customPreference(context: Context, name: String): SharedPreferences = context.getSharedPreferences(name, Context.MODE_PRIVATE)
 var sharedPref:SharedPreferences? =
     null // = SharedPreferences;  //= getSharedPreferences("myFixPref", MODE_PRIVATE)
    var editor: Editor? = null //=sharedPref.edit()

     fun commonInit(context: Context){
         sharedPref = context.getSharedPreferences("myFixPref", MODE_PRIVATE)
         editor = sharedPref!!.edit()
    }

    fun removeAccessToken(context: Context){
      //  commonInit(context)
        editor?.remove(ACCESS_TOKEN)?.apply()
    }


    fun saveLoginDetails(email: String,context: Context){
        commonInit(context)
        editor.apply {
            editor!!.putString(USER_EMAIL,email)
        }!!.apply()

    }

    fun getUserAccessToken(context: Context): String{
       commonInit(context)



       return sharedPref!!.getString(ACCESS_TOKEN,"").toString()
    }
    fun saveUserAccessToken(email: String,context: Context){
        commonInit(context)
        editor.apply {
            editor!!.putString(ACCESS_TOKEN,email)
        }!!.apply()

    }

    fun saveUserData(userData: String, context: Context){
       commonInit(context)
        editor.apply {
            editor!!.putString(USER_DATA, userData.toString())
        }!!.apply()
    }

    fun getUserData(context: Context): String
    {
        commonInit(context)
        return sharedPref!!.getString(USER_DATA,"").toString()
    }
    fun getUserLogin(context: Context): String{
       commonInit(context)
        return sharedPref!!.getString(USER_EMAIL,"").toString()
    }


    private const val USER_EMAIL = "user_email"
     const val ACCESS_TOKEN = "access_token"
    private const val USER_DATA = "user_data"


    fun getUserDetails(context: Context): UserData {
        val gson = Gson()
        val data = getUserData(context)



        return gson.fromJson(
            data,
            UserData::class.java
        )
    }


}