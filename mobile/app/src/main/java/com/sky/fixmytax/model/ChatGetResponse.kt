package com.sky.fixmytax.model

data class ChatGetResponse(
    val __abp: Boolean,
    val error: Any,
    val result: ResultXXX,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)