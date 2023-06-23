package com.sky.fixmytax.model

data class FileUploadResponse(
    val __abp: Boolean,
    val error: Any,
    val result: String,
    val success: Boolean,
    val targetUrl: Any,
    val unAuthorizedRequest: Boolean
)