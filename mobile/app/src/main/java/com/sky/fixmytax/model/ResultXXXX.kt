package com.sky.fixmytax.model

data class ResultXXXX(
    val creationTime: String,
    val creatorUserId: Any,
    val deleterUserId: Any,
    val deletionTime: Any,
    val discountAmount: Double,
    val discountRate: Double,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: String,
    val lastModifierUserId: Any,
    val price: Double,
    val pricingKey: String,
    val taxAmount: Double,
    val taxRate: Double,
    val totalAmount: Double
)