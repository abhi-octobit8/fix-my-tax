package com.sky.fixmytax.ui.ui.login.model

data class SignResponse(
    val __abp: Boolean,
    val error: Any,
    val result: Result,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)