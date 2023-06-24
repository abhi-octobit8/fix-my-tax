package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.Window
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatEditText
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.textfield.TextInputLayout
import com.google.gson.Gson
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.getUserCategoryName
import com.sky.fixmytax.MainActivity
import com.sky.fixmytax.R
import com.sky.fixmytax.SharePrefrence
import com.sky.fixmytax.databinding.ActivityCheckOutBinding
import com.sky.fixmytax.model.*
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okio.BufferedSink
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream


class CheckOutActivity : AppCompatActivity() {

    private lateinit var floatingActionButton : FloatingActionButton
    private lateinit var customAlertDialogView : View
    private lateinit var nameTextField : TextInputLayout
    private lateinit var phoneNumberTextField : TextInputLayout

    var checkoutPriceResponse: CheckoutPriceResponse? = null
    private var selectedImageUri: Uri? = null
    private lateinit var binding: ActivityCheckOutBinding

    private lateinit var materialAlertDialogBuilder: MaterialAlertDialogBuilder


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_check_out)
        binding = ActivityCheckOutBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val patymentBtn = findViewById<AppCompatButton>(R.id.btnPayment)

        patymentBtn.setOnClickListener {
           // launchCustomAlertDialog()
            showCustomDialog()
        }
        val uDta = intent.getStringExtra("uri").toString()
        if(uDta != null) {
            selectedImageUri = Uri.parse(uDta)
        }
        setIntentValue()
        getCheckout()
        serName()
    }

    fun serName(){

        val gson  =Gson()
        val userS =  SharePrefrence.getUserData(this)
        val userData= gson.fromJson(userS, UserData::class.java)

        binding.nameTv.text = userData.name
        binding.categoryTv.text ="Category: "+ getUserCategoryName(userData.fmtCategory)
        binding.panTv.text = "Pan Number: "+userData.panCardNumber.toString()
        binding.aadharTV.text = "Aadhar Number: "+userData.adharNumber.toString()

    }

    private fun setIntentValue(){
        val setVic = findViewById<TextView>(R.id.serviceTv)
        val settype = findViewById<TextView>(R.id.serviceTpe)
        setVic.text = intent.getStringExtra("ServiceName")
        settype.text = intent.getStringExtra("ServiceType") +"\n\n"+intent.getStringExtra("SubServiceType")
    }
     private fun showCustomDialog() {
        val dialog = Dialog(this)
       dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dialog.setCancelable(true)
        dialog.setContentView(R.layout.payment_dialog_box)
       val body = dialog.findViewById(R.id.address_text_field) as AppCompatEditText

        val yesBtn = dialog.findViewById(R.id.submitPay) as AppCompatButton
        val paymentLink = dialog.findViewById(R.id.tv_click_payment_link) as TextView

        yesBtn.setOnClickListener {
            if(body.text.toString().isNotEmpty()) {
                dialog.dismiss()
                createTicket(body.text.toString())
            }else {
                body.error = "Enter transaction number"
                body.requestFocus()
            }
        }
         paymentLink.setOnClickListener {
             val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=5497814"))
             startActivity(browserIntent)
         }

        dialog.show()
    }


    fun getCheckout(){
        val keyP = intent.getStringExtra("SubServiceKey")

        val url = "https://fixmytaxapi.zupiers.com/api/services/app/RatecardService/GetTotalPrice?pricingKey=$keyP"

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        quotesApi.getCheckOutPrice(url).enqueue(object :
            retrofit2.Callback<CheckoutPriceResponse> {
            override fun onFailure(call: Call<CheckoutPriceResponse>, t: Throwable) {

            }
            override fun onResponse(call: Call<CheckoutPriceResponse>, response: Response<CheckoutPriceResponse>) {
                if (response.code() == 200) {

                    Log.d("res",response.body().toString())

                    val chatListResponse: CheckoutPriceResponse? = response.body()
                    binding.feetv.text = chatListResponse?.result?.price.toString()
                    binding.tvGST.text = chatListResponse?.result?.taxAmount.toString()
                    binding.tvGSTp.text ="GST "+chatListResponse?.result?.taxRate.toString()+"%"
                    binding.tvTotal.text =chatListResponse?.result?.totalAmount.toString()



                } else {

                    Log.d("response",response.body().toString())
                }
            }

        })

    }


    fun createTicket(txnNumber: String){
        var txn : String = ""
        if(txnNumber.toString().isNotEmpty()){
            txn = txnNumber
        }
        var slotInt:Int = 0
        var disc : String = ""
        if(intent.getStringExtra("ServiceName") == "Video Consultation") {
            slotInt = intent.getIntExtra("slotId",0)
            disc = intent.getStringExtra("disc")!!
        }
        val chatRequest = TicketCreateRequest(
         description = disc,
         extensionData ="",
         fixMyTaxServiceType =CommonUtils.getFixMyServiceTypeForTicket(intent.getStringExtra("ServiceName").toString()),
         paymentInfo ="",
         paymentStaus =0,
         price = binding.tvTotal.text.toString(),
         question ="",
         section = intent.getStringExtra("ServiceType").toString(),
         serviceType = CommonUtils.getServiceType(intent.getStringExtra("ServiceName").toString()),
         slotId =slotInt,
         status =0,
         subSection =intent.getStringExtra("SubServiceType").toString(),
         subject ="",
         transactionNumber = txn

        )

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        if (chatRequest != null) {
            quotesApi.ticketCreate(chatRequest).enqueue(object :
                retrofit2.Callback<TicketCreatedResponse> {
                override fun onFailure(call: Call<TicketCreatedResponse>, t: Throwable) {
                    Log.d("resppnse",t.message.toString())
                }
                override fun onResponse(call: Call<TicketCreatedResponse>, response: Response<TicketCreatedResponse>) {
                    if (response.code() == 200) {

                        Log.d("resppnse",response.body().toString())

                        Toast.makeText(this@CheckOutActivity,"Successfully Created",Toast.LENGTH_LONG).show()
                        if(intent.getStringExtra("ServiceName") != "Video Consultation") {
                            response.body()?.result?.let { uploadImage(it.id) }
                        }else {
                            val intent = Intent (this@CheckOutActivity, MainActivity::class.java)
                            startActivity(intent)
                            finish()
                        }



                    } else {

                    }
                }

            })
        }

    }



    private fun uploadImage(id: Int) {
        if (selectedImageUri == null) {
            // layout_root.snackbar("Select an Image First")
            return
        }

        val gson  =Gson()
        val userS =  SharePrefrence.getUserData(this)
        val userData = gson.fromJson(userS, UserData::class.java)
        val urlS = "https://fixmytaxapi.zupiers.com/api/services/app/FileService/UploadRequestFile?id=${id}"

        val parcelFileDescriptor = contentResolver.openFileDescriptor(selectedImageUri!!, "r", null) ?: return

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
        //  progress_bar.progress = 0
        val body = CheckOutActivity.UploadRequestBody(file, "image", this@CheckOutActivity)
        val  url =urlS
        quotesApi.uploadImage(urlS,
            MultipartBody.Part.createFormData(
                "file",
                file.name,
                body
            ),
            RequestBody.create(MediaType.parse("multipart/form-data"), "json")
        ).enqueue(object : Callback<FileUploadResponse> {
            override fun onFailure(call: Call<FileUploadResponse>, t: Throwable) {
                //  layout_root.snackbar(t.message!!)
                //  progress_bar.progress = 0
                Log.d("error","error"+t.message)
            }

            override fun onResponse(
                call: Call<FileUploadResponse>,
                response: Response<FileUploadResponse>
            ) {
                response.body()?.let {
                    //   layout_root.snackbar(it.message)
                    // progress_bar.progress = 100
                    Log.d("error","error"+response.body().toString())
                    val intent = Intent (this@CheckOutActivity, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                }
            }
        })

    }
    class UploadRequestBody(
        private val file: File,
        private val contentType: String,
        private val callback: CheckOutActivity
    ) : RequestBody()
    {

        override fun contentType() = MediaType.parse("$contentType/*")

        override fun contentLength() = file.length()

        override fun writeTo(sink: BufferedSink) {
            val length = file.length()
            val buffer = ByteArray(DEFAULT_BUFFER_SIZE)
            val fileInputStream = FileInputStream(file)
            var uploaded = 0L
            fileInputStream.use { inputStream ->
                var read: Int
                val handler = Handler(Looper.getMainLooper())
                while (inputStream.read(buffer).also { read = it } != -1) {
                    handler.post(ProgressUpdater(uploaded, length))
                    uploaded += read
                    sink.write(buffer, 0, read)
                }
            }
        }



        inner class ProgressUpdater(
            private val uploaded: Long,
            private val total: Long
        ) : Runnable {
            override fun run() {
                // callback.onProgressUpdate((100 * uploaded / total).toInt())
            }
        }

        companion object {
            private const val DEFAULT_BUFFER_SIZE = 2048
        }
    }

}