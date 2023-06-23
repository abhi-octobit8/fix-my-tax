package com.sky.fixmytax.model

data class ContactUsResponse(
    val __abp: Boolean,
    val error: Any,
    val result: String,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)