package com.sky.fixmytax.model

data class ChangePasswordRequest(
    val currentPassword: String,
    val newPassword: String
)