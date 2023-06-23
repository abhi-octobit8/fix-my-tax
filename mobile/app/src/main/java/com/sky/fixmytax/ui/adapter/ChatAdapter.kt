package com.sky.fixmytax.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.databinding.ItemChatItemBinding
import com.sky.fixmytax.databinding.ItemTicketBinding
import com.sky.fixmytax.model.ChatListResponse
import com.sky.fixmytax.model.TicketItems

class ChatAdapter(
    val context: Context,
    val tempList: ArrayList<ChatListResponse>,
    ): RecyclerView.Adapter<ChatAdapter.MyViewHolder>() {



    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemChatItemBinding.inflate(inflater)
        return MyViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

        val concern = tempList[position]
        holder.items.tvTitle.text = concern.text
        holder.items.author.text = concern.creatorUserName
        holder.items.timeP.text =    CommonUtils.convertToDateFormatT("dd/MM/yy",concern.creationTime)

    }

    override fun onViewRecycled(holder: MyViewHolder) {

        super.onViewRecycled(holder)
    }

    override fun getItemCount(): Int {
        return tempList.size
    }

    class MyViewHolder(val items: ItemChatItemBinding) : RecyclerView.ViewHolder(items.root) {


    }
}