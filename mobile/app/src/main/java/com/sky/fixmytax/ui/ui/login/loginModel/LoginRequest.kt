package com.sky.fixmytax.ui.ui.login.loginModel

data class LoginRequest(
    val password: String,
    val rememberClient: Boolean,
    val userNameOrEmailAddress: String
)