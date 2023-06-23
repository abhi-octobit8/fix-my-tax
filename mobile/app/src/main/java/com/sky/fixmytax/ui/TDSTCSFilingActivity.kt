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
import com.sky.fixmytax.Utils
import com.sky.fixmytax.model.GetPriceFromServerResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import java.io.File

class TDSTCSFilingActivity : AppCompatActivity() {
    lateinit var price: AppCompatEditText;
    var itemSelected : String? = null
    var itemSelectedKey : String? = null
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tdstcsfiling)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)
        fileName = findViewById<TextView>(R.id.fileName)
       val textPdf = findViewById<TextView>(R.id.textPDF)
        textPdf.setOnClickListener {
            val intent = Intent(this, AboutActivity::class.java)
            intent.putExtra("type",3)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
        val noticeSelectionType = resources.getStringArray(R.array.tdstcsFilinglist)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {
         //   val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, noticeSelectionType)
            val adapter = ArrayAdapter.createFromResource(this, R.array.tdstcsFilinglist, R.layout.spinner_item)// resources.getStringArray(R.array.one)

            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                  //  Toast.makeText(this@TDSTCSFilingActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                    var item = Price.getPriceITR(parent.getItemAtPosition(position).toString())
                    itemSelected = parent.getItemAtPosition(position).toString()
                    price.setText(item)
                    var KeyForP =
                        Utils.getTDSTCSFilingKet(parent.getItemAtPosition(position).toString())
                    if(position>0) {
                        getPrice(KeyForP)
                    }

                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }


        val btn_click_me = findViewById<AppCompatButton>(R.id.submit_create)
        val btnUpload = findViewById<AppCompatButton>(R.id.btnUpload)
        btn_click_me.setOnClickListener {
            if(price.text.toString().isNotEmpty()) {
                if(selectedImageUri != null) {
                    val intent = Intent(this, CheckOutActivity::class.java)
                    intent.putExtra("ServiceName", "Income Tax Gst Appeal")
                    intent.putExtra("ServiceType", itemSelected)
                    intent.putExtra("SubServiceType", "")
                    intent.putExtra("uri", selectedImageUri.toString())
                    intent.putExtra(
                        "SubServiceKey",
                        Utils.getTDSTCSFilingKet(itemSelected.toString())
                    )
                    startActivity(intent)
                }else {
                    Toast(this).showCustomToast ("Upload Required Document", this)
                }

            }else {
                Toast(this).showCustomToast ("Select Selection type!", this)
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
                    // image_view.setImageURI(selectedImageUri)
                    if(CommonUtils.getFolderSizeLabel(file).toString().endsWith("MB")){
                        Toast(this).showCustomToast("Upload Required Document\nless then 1 MB",this)
                        selectedImageUri = null
                    }
                }
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