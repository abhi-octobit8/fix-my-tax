package com.sky.fixmytax.interfaces

interface BluePrint {

    interface OnAdapterItemTypeClick {
        fun onItemClick(position: Int, type: String)
    }

    interface OnAttachmentPDF{

        fun onItemClick(id: Int, fileName: String)
    }
}