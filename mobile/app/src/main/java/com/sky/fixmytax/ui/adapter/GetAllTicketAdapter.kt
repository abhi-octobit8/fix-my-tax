package com.sky.fixmytax.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.databinding.ItemTicketBinding
import com.sky.fixmytax.interfaces.BluePrint
import com.sky.fixmytax.model.TicketItems

class GetAllTicketAdapter(
    val context: Context,
    val param: BluePrint.OnAdapterItemTypeClick,
    val tempList: ArrayList<TicketItems>,
): RecyclerView.Adapter<GetAllTicketAdapter.MyViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        val binding = ItemTicketBinding.inflate(inflater)
        return MyViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {

        val concern = tempList[position]
        holder.items.tvPrice.text = ": "+concern.price
        holder.items.tvTxnNumber.text = "#"+concern.transactionNumber
        holder.items.tvTitle.text = concern.section
        holder.items.tvTime.text ="Time: "+CommonUtils.convertToDateFormatT("dd/MM/yy",concern.creationTime)
        holder.items.tvService.text = CommonUtils.getServiceStatus(concern.serviceType)
        holder.items.tvStatus.text = CommonUtils.getStatus(concern.status)

        holder.items.itemlYt.setOnClickListener {
            param.onItemClick(position,"")
        }



    }

    override fun onViewRecycled(holder: MyViewHolder) {

        super.onViewRecycled(holder)
    }

    override fun getItemCount(): Int {
        return tempList.size
    }








    class MyViewHolder(val items: ItemTicketBinding) : RecyclerView.ViewHolder(items.root) {


    }

}