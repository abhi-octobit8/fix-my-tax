package com.sky.fixmytax.model

data class Item(
    val creationTime: String,
    val creatorUserId: Any,
    val date: String,
    val deleterUserId: Any,
    val deletionTime: Any,
    val endTime: String,
    val id: Int,
    val isDeleted: Boolean,
    val lastModificationTime: Any,
    val lastModifierUserId: Any,
    val slotName: String,
    val startTime: String,
    val status: Int
)