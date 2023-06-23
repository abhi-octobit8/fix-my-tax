package com.sky.fixmytax.ui.ui.login.model

data class SignUPRequest(
    val email: String,
    val name: String,
    val phoneNumber: String,
   val  userCategory: Int,
   val panCardNumber: String,
  val adharNumber: String,
  val gstNumber: String

)