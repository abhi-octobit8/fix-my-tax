package com.sky.fixmytax.model

data class TicketCreateRequest(
    val description: String,
    val extensionData: String,
    val fixMyTaxServiceType: Int,
    val paymentInfo: String,
    val paymentStaus: Int,
    val price: String,
    val question: String,
    val section: String,
    val serviceType: Int,
    val slotId: Int,
    val status: Int,
    val subSection: String,
    val subject: String,
    val transactionNumber: String
)