package com.sky.fixmytax.ui.ui.login.model

data class Result(
    val error: Boolean,
    val errorMsg: String,
    val password: Any,
    val ticketId: Int,
    val userId: Int,
    val userName: Any
)