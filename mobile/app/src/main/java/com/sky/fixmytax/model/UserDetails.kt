package com.sky.fixmytax.model

data class UserDetails(
    val __abp: Boolean,
    val error: Any,
    val result: UserData,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)