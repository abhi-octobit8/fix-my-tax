package com.sky.fixmytax.model

data class UserData(
    val adharNumber: Any,
    val categoryProof: Any,
    val creationTime: String,
    val emailAddress: String,
    val fmtCategory: Int,
    val fullName: String,
    val gstNumber: Any,
    val id: Int,
    val isActive: Boolean,
    val lastLoginTime: Any,
    val name: String,
    val panCardNumber: Any,
    val roleNames: List<String>,
    val surname: String,
    val userName: String
)