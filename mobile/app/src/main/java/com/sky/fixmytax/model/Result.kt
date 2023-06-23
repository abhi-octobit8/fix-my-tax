package com.sky.fixmytax.model

data class Result(
    val creationTime: String,
    val creatorUserId: Any,
    val deleterUserId: Any,
    val deletionTime: Any,
    val description: String,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: String,
    val lastModifierUserId: Any,
    val price: Double,
    val pricingKey: String,
    val service: String,
    val subService: String
)