package com.sky.fixmytax.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.widget.AppCompatEditText
import com.sky.fixmytax.R

class ConsultationActivity : AppCompatActivity() {
    lateinit var price: AppCompatEditText;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_consultation)
        price = findViewById(R.id.edit_text_price)
        val noticeSelectionType = resources.getStringArray(R.array.consulatancy)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {
            val adapter = ArrayAdapter(
                this, android.R.layout.simple_spinner_item, noticeSelectionType)
            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("postion",""+position)
                //    Toast.makeText(this@ConsultationActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                    var item = Price.getPriceConsultation(parent.getItemAtPosition(position).toString())
                    price.setText(item)

                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }
    }
}