package com.sky.fixmytax.model

data class ChatResponse(
    val __abp: Boolean,
    val error: Any,
    val result: ResultXX,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)