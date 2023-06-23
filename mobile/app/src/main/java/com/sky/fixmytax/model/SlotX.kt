package com.sky.fixmytax.model

data class SlotX(
    val creationTime: String,
    val creatorUserId: Any,
    val date: String,
    val deleterUserId: Any,
    val deletionTime: Any,
    val endTime: String,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: String,
    val lastModifierUserId: Int,
    val requestTicketId: Int,
    val slotName: String,
    val startTime: String,
    val status: Int
)