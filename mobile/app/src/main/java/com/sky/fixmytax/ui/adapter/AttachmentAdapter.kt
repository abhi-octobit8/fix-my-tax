package com.sky.fixmytax.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sky.fixmytax.databinding.ItemAttachmentBinding
import com.sky.fixmytax.databinding.ItemChatItemBinding
import com.sky.fixmytax.interfaces.BluePrint
import com.sky.fixmytax.model.Attachment
import com.sky.fixmytax.model.ChatListResponse

class AttachmentAdapter (val context: Context,
                         val tempList: ArrayList<Attachment>,
                         val param: BluePrint.OnAttachmentPDF,
): RecyclerView.Adapter<AttachmentAdapter.MyViewHolder>() {



    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemAttachmentBinding.inflate(inflater)
        return MyViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

        val concern = tempList[position]
        holder.items.fileName.text = concern.filename

        holder.items.lytPDF.setOnClickListener {
            param.onItemClick(concern.id,concern.filename)
        }

    }

    override fun onViewRecycled(holder: MyViewHolder) {

        super.onViewRecycled(holder)
    }

    override fun getItemCount(): Int {
        return tempList.size
    }

    class MyViewHolder(val items: ItemAttachmentBinding) : RecyclerView.ViewHolder(items.root) {}
}