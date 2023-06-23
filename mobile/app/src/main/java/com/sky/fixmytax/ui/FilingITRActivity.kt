package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatEditText
import androidx.core.app.NavUtils
import androidx.lifecycle.lifecycleScope
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.getFolderSizeLabel
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.R
import com.sky.fixmytax.Utils.getITRFilingKet
import com.sky.fixmytax.model.GetPriceFromServerResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import java.io.File

class FilingITRActivity : AppCompatActivity() {
    lateinit var price: AppCompatEditText;

    var itemSelected : String? = null
    var itemSelectedKey : String? = null
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null
    lateinit var textPdf : TextView

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_filing_itractivity)
        supportActionBar?.setDisplayHomeAsUpEnabled(true);
        price = findViewById(R.id.edit_text_price)

        fileName = findViewById<TextView>(R.id.fileName)
        textPdf = findViewById<TextView>(R.id.textPDF)
        val noticeSelectionType = resources.getStringArray(R.array.itrlist)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        if (spinnerSelectionType != null) {
            /*val adapter = ArrayAdapter(
                this, android.R.layout.simple_spinner_item, noticeSelectionType)*/
            val adapter = ArrayAdapter.createFromResource(
                this, R.array.itrlist, R.layout.spinner_item)
            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                 //   Toast.makeText(this@FilingITRActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                    var item = Price.getPriceITR(parent.getItemAtPosition(position).toString())
                    price.setText(item)
                    itemSelected = parent.getItemAtPosition(position).toString()
                      var KeyForP =  getITRFilingKet(parent.getItemAtPosition(position).toString())
                    if(position>0) {
                        getPrice(KeyForP)
                    }

                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }

        // get reference to button
        val btn_click_me = findViewById<AppCompatButton>(R.id.submit_create)
        val btnUpload = findViewById<AppCompatButton>(R.id.btnUpload)
        btn_click_me.setOnClickListener {
            if(price.text.toString().isNotEmpty()) {
                if(selectedImageUri !=null) {
                    val intent = Intent(this, CheckOutActivity::class.java)
                    intent.putExtra("ServiceName", "Filling ITR")
                    intent.putExtra("ServiceType", itemSelected)
                    intent.putExtra("SubServiceType", "")
                    intent.putExtra("uri", selectedImageUri.toString())
                    intent.putExtra(
                        "SubServiceKey",
                        itemSelected?.let { it1 -> getITRFilingKet(it1) })
                    startActivity(intent)
                }else {
                    Toast(this).showCustomToast ("Upload Required Document", this)
                }
            }else {
              //  Toast.makeText(this,"Select Selection type",Toast.LENGTH_LONG).show()
                Toast(this).showCustomToast ("Select Selection type!", this)
            }
        }
        btnUpload.setOnClickListener {
            uploadPDF()
        }

        textPdf.setOnClickListener {

            val intent = Intent(this, AboutActivity::class.java)
            intent.putExtra("type",2)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }
    }

    private fun uploadPDF(){
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
                    Log.d("fileSize",": "+getFolderSizeLabel(file))
                    if(getFolderSizeLabel(file).toString().endsWith("MB")){
                        Toast(this).showCustomToast("Upload Required Document\nless then 1 MB",this)
                        selectedImageUri = null
                    }else {
                        fileName?.text = file.name
                    }
                    // image_view.setImageURI(selectedImageUri)
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