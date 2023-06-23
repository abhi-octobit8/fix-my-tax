package com.sky.fixmytax.ui.ui.login.loginModel

data class LoginResponse(
    val __abp: Boolean,
    val error: Any,
    val result: Result,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)