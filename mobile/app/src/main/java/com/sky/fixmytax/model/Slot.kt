package com.sky.fixmytax.model

data class Slot(
    val creationTime: String,
    val creatorUserId: Int,
    val date: String,
    val deleterUserId: Int,
    val deletionTime: String,
    val endTime: String,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: String,
    val lastModifierUserId: Int,
    val requestTicketId: Int,
    val slotName: String,
    val startTime: String,
    val status: Int,
    val description:String
)