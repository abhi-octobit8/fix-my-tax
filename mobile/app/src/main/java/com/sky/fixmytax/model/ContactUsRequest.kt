package com.sky.fixmytax.model

data class ContactUsRequest(
    val email: String,
    val feedback: String,
    val firstName: String,
    val lastName: String,
    val phone: String
)