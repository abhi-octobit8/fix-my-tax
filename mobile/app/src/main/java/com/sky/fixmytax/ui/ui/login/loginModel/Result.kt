package com.sky.fixmytax.ui.ui.login.loginModel

data class Result(
    val accessToken: String,
    val encryptedAccessToken: String,
    val expireInSeconds: Int,
    val userId: Int
)