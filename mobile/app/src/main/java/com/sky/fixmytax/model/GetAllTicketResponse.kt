package com.sky.fixmytax.model

data class GetAllTicketResponse(
    val __abp: Boolean,
    val error: Any,
    val result: ResultX,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)