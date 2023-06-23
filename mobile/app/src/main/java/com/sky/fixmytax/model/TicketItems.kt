package com.sky.fixmytax.model

data class TicketItems(
    val assignedUserId: Int,
    val assignedUserName: String,
    val assignmentByUserId: Int,
    val assignmentByUserName: String,
    val assignmentDatetime: String,
    val attachments: ArrayList<Attachment>,
    val creationTime: String,
    val creatorUserId: Int,
    val creatorUserName: String,
    val deleterUserId: Any,
    val deletionTime: Any,
    val description: String,
    val fixMyTaxServiceType: Int,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: String,
    val lastModifierUserId: Int,
    val paymentStaus: Int,
    val price: String,
    val question: String,
    val section: String,
    val serviceType: Int,
    val slot: Slot,
    val slotId: Int,
    val status: Int,
    val subSection: String,
    val subject: String,
    val transactionNumber: String
)



