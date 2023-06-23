package com.sky.fixmytax.model

data class GetPriceFromServerResponse(
    val __abp: Boolean,
    val error: Any,
    val result: Result,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)