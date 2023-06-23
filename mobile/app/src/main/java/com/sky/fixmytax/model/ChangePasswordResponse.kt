package com.sky.fixmytax.model

data class ChangePasswordResponse(
    val __abp: Boolean,
    val error: Any,
    val result: Boolean,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)