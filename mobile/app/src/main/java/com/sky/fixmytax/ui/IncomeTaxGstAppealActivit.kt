package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.app.NavUtils
import androidx.lifecycle.lifecycleScope
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.R
import com.sky.fixmytax.model.GetPriceFromServerResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import java.io.File

class IncomeTaxGstAppealActivit : AppCompatActivity() {
    lateinit var price: AppCompatEditText;
    var item: String =""
    var itemSelected : String? = null
    var itemSubSelected : String? = null
    var itemSelectedKey : String? = null
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_income_tax_gst_appeal)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)
        fileName = findViewById<TextView>(R.id.fileName)
        val textPdf = findViewById<TextView>(R.id.textPDF)
        textPdf.setOnClickListener {
            val intent = Intent(this, AboutActivity::class.java)
            intent.putExtra("type",5)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
        val noticeSelectionType = resources.getStringArray(R.array.incomeTaxAppeal)
        val oneSelectionType = resources.getStringArray(R.array.subIncomeTaxAppeal)
        val twoSelectionType = resources.getStringArray(R.array.subgstAppeal)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {

            val adapter = ArrayAdapter.createFromResource(
                this, R.array.incomeTaxAppeal, R.layout.spinner_item)
            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                //    Toast.makeText(this@IncomeTaxGstAppealActivit, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                 //   val item = Price.getPriceITR(parent.getItemAtPosition(position).toString())
                    item = parent.getItemAtPosition(position).toString()
                    itemSelected = noticeSelectionType[position]
                    when(position) {
                        1 -> {
                           // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(
                                view.context, R.array.subIncomeTaxAppeal, R.layout.spinner_item)
                            subSelectionType(adaptersub)
                        }
                        2 -> {

                            val adaptersub = ArrayAdapter.createFromResource(
                                view.context, R.array.subgstAppeal, R.layout.spinner_item)
                            subSelectionType(adaptersub)
                        }
                    }
                    /*price.setText(item)
                    val KeyForP =
                        Price.getGSTNotice(parent.getItemAtPosition(position).toString())
                    if(position>0) {
                        getPrice(KeyForP)
                    }*/

                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }


        val btn_click_me = findViewById<AppCompatButton>(R.id.submit_create)
        val btnUpload = findViewById<AppCompatButton>(R.id.btnUpload)
        btn_click_me.setOnClickListener {
            if(price.text.toString().isNotEmpty()) {
                if(itemSubSelected != null) {
                    if(selectedImageUri != null) {
                        val intent = Intent(this, CheckOutActivity::class.java)
                        intent.putExtra("ServiceName", "Income Tax Gst Appeal")
                        intent.putExtra("ServiceType", itemSelected)
                        intent.putExtra("SubServiceType", itemSubSelected)
                        intent.putExtra("SubServiceKey",
                            itemSelected?.let { it1 ->
                                itemSubSelected?.let { it2 ->
                                    Price.getPriceGstIncomeTaxAppeal(it1, it2)
                                }
                            })
                        startActivity(intent)
                        finish()
                     } else {
                        Toast(this).showCustomToast ("Upload Required Document", this)
                    }
                } else {
                    Toast(this).showCustomToast ("Select Appeal forms", this)
                }
            }else {
                Toast(this).showCustomToast ("Select Appeal type", this)

            }
        }
        btnUpload.setOnClickListener {
             uploadPDF()
        }
    }

    fun uploadPDF(){
        val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
        pdfIntent.type = "application/pdf"
        pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(pdfIntent, SignUPActivity.REQUEST_CODE_PICK_IMAGE)
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                SignUPActivity.REQUEST_CODE_PICK_IMAGE -> {
                    selectedImageUri = data?.data
                    val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
                    Log.d("data",file.name)
                    fileName?.text = file.name
                    if(CommonUtils.getFolderSizeLabel(file).toString().endsWith("MB")){
                        Toast(this).showCustomToast("Upload Required Document\nless then 1 MB",this)
                        selectedImageUri = null
                    }
                    // image_view.setImageURI(selectedImageUri)
                }
            }
        }
    }

    fun subSelectionType(adapter: ArrayAdapter<CharSequence>){

        val spinnerSubSelectionType = findViewById<Spinner>(R.id.sp_sub_section)
        if (spinnerSubSelectionType != null) {

            spinnerSubSelectionType.adapter = adapter
            spinnerSubSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                    Log.d("position",""+position.toString())
                    Log.d("position",""+parent.getItemAtPosition(position).toString())
                    var priceTxt: String =
                        Price.getPriceGstIncomeTaxAppeal(item, parent.getItemAtPosition(position).toString())
                    itemSubSelected = parent.getItemAtPosition(position).toString()
                    getPrice(priceTxt)
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

    private fun getPrice(keyP:String){

        val url = "services/app/RatecardService/Get?pricingKey=$keyP"
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
        var loginResponse: GetPriceFromServerResponse? = null
        lifecycleScope.launchWhenCreated  {
            try {
                Log.d("ayush: ", url.toString())
                val result = quotesApi.getPrice(url)

                loginResponse = result.body() as GetPriceFromServerResponse?
                Log.d("ayush: ", result.body().toString())
                Log.d("ayush: ", result.toString())
                if(result.code()==200 && loginResponse?.result != null){

                    Log.d("ayushp: ", loginResponse?.result?.price.toString())
                    price.setText(loginResponse?.result?.price.toString())
                }
                else
                {
                    Log.d("ayush: ", loginResponse!!.toString())
                }
            }catch (Ex:Exception){
                Ex.localizedMessage?.let { it1 -> Log.e("Error", it1) }
            }
        }

    }
}