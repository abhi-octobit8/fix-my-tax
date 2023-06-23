package com.sky.fixmytax.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.app.NavUtils
import com.sky.fixmytax.R
import com.sky.fixmytax.ui.Price.getPriceGST

class ITRTDSTCSNoticesActivity : AppCompatActivity() {
    lateinit var price: AppCompatEditText;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_gstnotice)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)
        val noticeSelectionType = resources.getStringArray(R.array.gstlist)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {
          //  val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, noticeSelectionType)
            val adapter = ArrayAdapter.createFromResource(this, R.array.gstlist, R.layout.spinner_item)// resources.getStringArray(R.array.one)

            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long)
                {
                    Log.d("position",""+position)
                 //   Toast.makeText(this@ITRTDSTCSNoticesActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                    var item = getPriceGST(parent.getItemAtPosition(position).toString())
                    price.setText(item)
                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }
    }





    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                NavUtils.navigateUpFromSameTask(this)
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }
}