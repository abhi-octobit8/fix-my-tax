package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
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
import com.sky.fixmytax.ui.Price.getPriceNotice
import java.io.File


class ITRNoticeActivity : AppCompatActivity() {

    var subArray : List<String> = listOf();
    var item: String =""
    var itemSelected: String =""
    var itemSubSelected: String =""
    lateinit var price: AppCompatEditText;
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_itrnotice)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)
        fileName = findViewById<TextView>(R.id.fileName)
        val noticeSelectionType = resources.getStringArray(R.array.notice)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        val oneSelectionType = resources.getStringArray(R.array.one)
        val twoSelectionType = resources.getStringArray(R.array.two)
        val threeSelectionType = resources.getStringArray(R.array.three)
        val fourSelectionType = resources.getStringArray(R.array.four)
        val fiveSelectionType = resources.getStringArray(R.array.five)
        val sixSelectionType = resources.getStringArray(R.array.six)
        val sevenSelectionType = resources.getStringArray(R.array.seven)
        val eightSelectionType = resources.getStringArray(R.array.eight)
        val nineSelectionType = resources.getStringArray(R.array.nine)
        val tenSelectionType = resources.getStringArray(R.array.ten)
        val elevenSelectionType = resources.getStringArray(R.array.eleven)
      //  val tweelSelectionType = resources.getStringArray(R.array.tweel)
        val threenSelectionType = resources.getStringArray(R.array.therteen)
        val fourteenSelectionType = resources.getStringArray(R.array.fourteen)
        val fifteenSelectionType = resources.getStringArray(R.array.fifteen)
        if (spinnerSelectionType != null) {


            val adapter = ArrayAdapter.createFromResource(
                this, R.array.notice, R.layout.spinner_item)

            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("postion",""+position)
               //     Toast.makeText(this@ITRNoticeActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                      item = parent.getItemAtPosition(position).toString()
                    itemSelected = noticeSelectionType[position]
                    itemSubSelected = ""
                    price.text = null

                    when(position){
                        1 ->{
                        //    val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, oneSelectionType)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.one, R.layout.spinner_item)// resources.getStringArray(R.array.one)
                            subSelectionType(adaptersub)
                        }
                        2 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, twoSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.two, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        3 -> {
                         //   val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, threeSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.three, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        4 -> {
                        //    val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, fourSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.four, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        5 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, fiveSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.five, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        6 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, sixSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.six, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        7 -> {
                         //   val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, sevenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.seven, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        8 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, eightSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.eight, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        9 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, nineSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.nine, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        10 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, tenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.ten, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        11 -> {
                           // val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, elevenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.eleven, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        12 -> {
                        //    val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, threenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.therteen, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        13 -> {
                         //   val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, fourteenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.therteen, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        14 -> {
                          //  val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, fourteenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.fourteen, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                        15 -> {
                         //   val adaptersub = ArrayAdapter(view.context, android.R.layout.simple_spinner_item, fifteenSelectionType) // resources.getStringArray(R.array.one)
                            val adaptersub = ArrayAdapter.createFromResource(view.context, R.array.fifteen, R.layout.spinner_item)// resources.getStringArray(R.array.one)

                            subSelectionType(adaptersub)
                        }
                    }
                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }

        val btn_click_me = findViewById<AppCompatButton>(R.id.submit_create)
        val btnUpload = findViewById<AppCompatButton>(R.id.btnUpload)
        btn_click_me.setOnClickListener {
            if(price.text.toString().isNotEmpty()) {
                if(itemSubSelected != "") {
                    if(selectedImageUri != null) {
                        val intent = Intent(this, CheckOutActivity::class.java)
                        intent.putExtra("ServiceName", "ITR/TDS/TCS Notice")
                        intent.putExtra("ServiceType", itemSelected)
                        intent.putExtra("SubServiceType", itemSubSelected)
                        intent.putExtra("uri", selectedImageUri.toString())
                        intent.putExtra(
                            "SubServiceKey",
                            itemSelected?.let { it1 -> getPriceNotice(it1, itemSubSelected) })
                        startActivity(intent)
                    }else {
                        Toast(this).showCustomToast ("Upload Required Document", this)
                    }
                }else {
                    Toast(this).showCustomToast ("Select Sub-selection type", this)
                }
            }else {
                Toast(this).showCustomToast ("Select Selection type", this)
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

                    var size: Long = 0
                    data?.let { returnUri  ->
                        contentResolver.query(returnUri?.data!!.normalizeScheme() , null, null, null, null)
                    }?.use { cursor ->
                        val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
                        cursor.moveToFirst()
                        size = cursor.getLong(sizeIndex)
                    }

                    var sizeinKb = size/1024;
                    if(sizeinKb >= 1024){
                        Toast(this).showCustomToast("please upload document having size less than 1 mb",this)
                        selectedImageUri = null
                        fileName?.text = ""
                    }else{
                        fileName?.text = file.name
                    }
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
                     var priceTxt: String = getPriceNotice(item,parent.getItemAtPosition(position).toString())
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