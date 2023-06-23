package com.sky.fixmytax

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.OpenableColumns
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.app.NavUtils
import androidx.lifecycle.lifecycleScope
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.model.GetPriceFromServerResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.ui.CheckOutActivity
import com.sky.fixmytax.ui.Price
import com.sky.fixmytax.ui.SignUPActivity
import java.io.File

class BusinessConsultActivity : AppCompatActivity() {
    lateinit var price: AppCompatEditText;
    var itemSelected : String? = null
    var itemSelectedKey : String? = null
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null

    companion object {
        const val REQUEST_CODE_PICK_IMAGE = 101
    }
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_business_consult)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)
        fileName = findViewById<TextView>(R.id.fileName)
        val noticeSelectionType = resources.getStringArray(R.array.businessConsult)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {
          //  val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, noticeSelectionType)
            val adapter = ArrayAdapter.createFromResource(this, R.array.businessConsult, R.layout.spinner_item)// resources.getStringArray(R.array.one)

            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                //    Toast.makeText(this@BusinessConsultActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                    val item = Price.getPriceITR(parent.getItemAtPosition(position).toString())
                    itemSelected =parent.getItemAtPosition(position).toString()
                    price.setText(item)
                    val KeyForP =
                        Price.getPriceBusinessConsult(parent.getItemAtPosition(position).toString())
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
                    intent.putExtra("ServiceName", "Business Consultation")
                    intent.putExtra("ServiceType", itemSelected)
                    intent.putExtra("SubServiceType", "")
                    intent.putExtra(
                        "SubServiceKey",
                        Price.getPriceBusinessConsult(itemSelected.toString())
                    )
                    startActivity(intent)
                }else {
                    Toast(this).showCustomToast ("Upload Required Document", this)

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
        val pdfIntent = Intent(Intent.ACTION_OPEN_DOCUMENT)
        pdfIntent.type = "application/pdf"
        pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
        startActivityForResult(pdfIntent, BusinessConsultActivity.REQUEST_CODE_PICK_IMAGE)
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                BusinessConsultActivity.REQUEST_CODE_PICK_IMAGE -> {

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