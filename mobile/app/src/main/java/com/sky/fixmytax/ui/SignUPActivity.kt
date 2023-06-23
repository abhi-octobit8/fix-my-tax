package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.app.ProgressDialog
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.OpenableColumns
import android.util.Log
import android.view.View
import android.widget.*
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.R
import com.sky.fixmytax.SharePrefrence.saveLoginDetails
import com.sky.fixmytax.databinding.ActivitySignUpactivityBinding
import com.sky.fixmytax.model.FileUploadResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.ui.ui.login.model.SignResponse
import com.sky.fixmytax.ui.ui.login.model.SignUPRequest
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okio.BufferedSink
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.*
import java.util.*


class SignUPActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySignUpactivityBinding
    private var selectedImageUri: Uri? = null
    var category: String = ""
    var isBoo: Boolean = false

    var upload: ImageView? = null
    var imageuri: Uri? = null
    var dialog: ProgressDialog? = null

    private var url = "https://www.google.com"
    private val BUFFER_SIZE = 1024 * 2
    private val IMAGE_DIRECTORY = "/demonuts_upload_gallery"

    companion object {
        const val REQUEST_CODE_PICK_IMAGE = 101
    }

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_upactivity)
        binding = ActivitySignUpactivityBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()
       // requestMultiplePermissions();
        binding.signUP.setOnClickListener {

            if(isValidate()) {

                binding.loading.visibility = View.VISIBLE
                val loginRequest = SignUPRequest(
                    email = binding.username.text.toString(), name = binding.name.text.toString(),
                    phoneNumber = binding.password.text.toString(),
                    userCategory = CommonUtils.getUserCateogry(category),
                    panCardNumber = binding.paNCard.text.toString(),
                    adharNumber = binding.aadharcard.text.toString(),
                    gstNumber = binding.gstn.text.toString()
                )
                val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
                // launching a new coroutine
                var loginResponse: SignResponse? = null

                Log.d("request", loginRequest.toString())

                quotesApi.getQuotes(loginRequest).enqueue(object :
                    retrofit2.Callback<SignResponse> {
                    override fun onFailure(call: Call<SignResponse>, t: Throwable) {
                        Toast.makeText(
                            this@SignUPActivity,
                            t.message,
                            Toast.LENGTH_SHORT
                        ).show()
                        Log.d("response", t.message.toString());
                        binding.loading.visibility = View.GONE
                        //  Toast.makeText(this@SignUPActivity, "Registration failed!", Toast.LENGTH_SHORT).show()
                        errorDialogBox("Some thing went wrong, Try again")
                    }

                    override fun onResponse(
                        call: Call<SignResponse>,
                        response: Response<SignResponse>
                    ) {
                        if (response.code() == 200) {
                            //     Toast.makeText(this@SignUPActivity, "Registration success!", Toast.LENGTH_SHORT).show()

                            //   SignResponse = response.body()
                            Log.d("response", response.toString());
                            Log.d("response", response.body().toString());
                            val student: SignResponse? = response.body()
                            Log.d("data", student?.result?.userName.toString())
                            Log.d("data", student?.result?.userName.toString())
                            Log.d("data", student?.result?.userName.toString())
                            Log.d("data", student?.result?.userName.toString())
                            Log.d("data", student?.result?.userName.toString())

                            if (student?.result?.errorMsg == null && student?.result?.userName != null) {
                                successFulDialogBox()
                                saveLoginDetails(
                                    binding.username.text.toString().trim(),
                                    this@SignUPActivity
                                )
                                if (selectedImageUri != null) {
                                    uploadImage(student.result.userId)
                                }

                            } else if (student?.result?.errorMsg != null && student?.result?.userName == null) {
                                errorDialogBox(student?.result?.errorMsg)
                            }

                            // Gson().fromJson<SignResponse>(response, SignResponse::class.java)
                            binding.loading.visibility = View.GONE
                            // Log.d("response",student);

                        } else {
                            Log.d("response", "" + response.message().toString());
                            Log.d("response", "" + response.body().toString());
                            Log.d("response", "" + response.code());
                            Log.d("response", "" + response.errorBody());
                            //  Toast.makeText(this@SignUPActivity, "Registration failed!", Toast.LENGTH_SHORT).show()
                            binding.loading.visibility = View.GONE
                            errorDialogBox("Some thing went wrong, Try again")
                        }
                    }

                    /* GlobalScope.launch {
                Log.d("ayush: ", loginRequest.toString())
                val result = quotesApi.getQuotes(loginRequest)
                 loginResponse = result.body() as SignResponse?
                Log.d("ayush: ", result.body().toString())
                Log.d("ayush: ", result.toString())

                Log.d("ayush:f ", result.toString())
                saveLoginDetails(binding.username.text.toString().trim(),this@SignUPActivity)

                // finish()
                isBoo= true

            }
            this.runOnUiThread(Runnable {
                binding.loading.visibility =View.GONE
            })


            if(isBoo){
                this.runOnUiThread(Runnable {
                    successFulDialogBox()
                })

            }else {
                if(loginResponse !=null)
                    this.runOnUiThread(Runnable {
                        errorDialogBox(loginResponse!!.result.errorMsg)
                    })

            }*/

                    /*if(!loginResponse?.result?.error!!){
                Toast.makeText(this@SignUPActivity,"Successfully Signup",Toast.LENGTH_LONG).show()
            }*/
                    /* if (loginResponse != null) {
                Toast.makeText(this@SignUPActivity, loginResponse!!.result.errorMsg, Toast.LENGTH_LONG).show()
            }*/

                })
            }
        }

        signUp()

        val noticeSelectionType = resources.getStringArray(R.array.signupCate)
        val spinnerSelectionType = findViewById<Spinner>(R.id.sp_section)
        val button = findViewById<AppCompatButton>(R.id.uploadDocument)
        if (spinnerSelectionType != null) {
            val adapter = ArrayAdapter.createFromResource(
                this, R.array.signupCate, R.layout.spinner_item)
            spinnerSelectionType.adapter = adapter
            spinnerSelectionType.onItemSelectedListener = object :
                AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>,
                    view: View, position: Int, id: Long) {
                    Log.d("position",""+position)
                    if(position>0) {
                        Toast.makeText(
                            this@SignUPActivity,
                            "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT
                        ).show()
                    }
                    var item = Price.getPriceITR(parent.getItemAtPosition(position).toString())
                      category = parent.getItemAtPosition(position).toString()
                    if(parent.getItemAtPosition(position).toString() == "GENERAL"){
                        button.visibility = View.GONE
                    }else {
                        button.visibility = View.VISIBLE
                    }




                }
                override fun onNothingSelected(parent: AdapterView<*>?) {}
            }
        }

        uploadPDF()
        checkBox()

    }


    fun  isValidate():Boolean{

       if(!binding.name.text.toString().isNotEmpty()) {
            binding.name.error = "Enter name"
           binding.name.requestFocus()
           return false
       } else if (!binding.username.text.toString().isNotEmpty()){

           binding.username.error = "Enter email-id "
           binding.username.requestFocus()
           return false
       } else if (!binding.password.text.toString().isNotEmpty()){

           binding.password.error = "Enter mobile number "
           binding.password.requestFocus()
           return false
       }else if (binding.password.text.toString().length!=10){

           binding.password.error = "Enter 10 digit mobile number "
           binding.password.requestFocus()
           return false
       }else if (!binding.paNCard.text.toString().isNotEmpty()){

           binding.paNCard.error = "Enter pan card number "
           binding.paNCard.requestFocus()
           return false
       }else if (!binding.aadharcard.text.toString().isNotEmpty()){

           binding.aadharcard.error = "Enter Aadhar number "
           binding.aadharcard.requestFocus()
           return false
       }else if (category == ""){

           Toast(this).showCustomToast("Select category type",this)
           return false
       }else if (category != "GENERAL" && selectedImageUri == null){

           Toast(this).showCustomToast("Upload Requirement document",this)
           return false
       }









        return true
    }


    fun checkBox(){
        binding.acceptTermsAndConditions.setOnCheckedChangeListener { buttonView, isChecked ->

            Log.d("checkBox",""+isChecked)
            if(isChecked){
                binding.signUP.isEnabled = true
            }else {
                binding.signUP.isEnabled = false
            }

        }

        binding.TermsAndConditionText.setOnClickListener {
            val intent = Intent(this, AboutActivity::class.java)
            intent.putExtra("type",1)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
            /*val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://fixmytax.zupiers.com/documents/TERMS_CONDITIONS_FMT.pdf"))
            startActivity(browserIntent)*/
        }
    }




     private fun signUp(){

       binding.signUPText.setOnClickListener {
            finish()
       }
     }


    fun errorDialogBox(meg: String){
        val builder = AlertDialog.Builder(this)


        //set title for alert dialog
        builder.setTitle("Error")
        //set message for alert dialog
        builder.setMessage(meg)
        builder.setIcon(android.R.drawable.ic_dialog_alert)

        //performing positive action
        builder.setPositiveButton("Okay")
        {dialogInterface, which ->
           // Toast.makeText(applicationContext,"clicked yes",Toast.LENGTH_LONG).show()

        }



        // Create the AlertDialog
     //   val alertDialog: AlertDialog = builder.create()
        // Set other dialog properties
        val alertDialog: AlertDialog = builder.create()
        alertDialog.setCancelable(true)
        alertDialog.show()
    }

    fun successFulDialogBox(){
        val builder = AlertDialog.Builder(this)
        //set title for alert dialog
        builder.setTitle("Success")
        //set message for alert dialog
        builder.setMessage("User Successfully Created")
        builder.setIcon(android.R.drawable.ic_dialog_alert)

        //performing positive action
        builder.setPositiveButton("Login"){dialogInterface, which ->
          //  Toast.makeText(applicationContext,"clicked yes",Toast.LENGTH_LONG).show()
            finish()
        }


        // Create the AlertDialog
        val alertDialog: AlertDialog = builder.create()
        // Set other dialog properties
        alertDialog.setCancelable(false)
        alertDialog.show()
    }

    fun uploadPDF(){
        binding.uploadDocument.setOnClickListener {
            val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
            pdfIntent.type = "application/pdf"
            pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
            startActivityForResult(pdfIntent, REQUEST_CODE_PICK_IMAGE)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                REQUEST_CODE_PICK_IMAGE -> {
                    selectedImageUri = data?.data
                    val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
                    Log.d("data",file.name)
                    binding.fileName.text = file.name

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
                        binding.fileName.text = ""
                    }
                }
            }
        }
    }


    class UploadRequestBody(
        private val file: File,
        private val contentType: String,
        private val callback: SignUPActivity
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

    private fun uploadImage(id:Int) {
        if (selectedImageUri == null) {
           // layout_root.snackbar("Select an Image First")
            return
        }

        val urlS = "https://fixmytaxapi.zupiers.com/api/services/app/FileService/UploadCategoryProofFile?userId=$id"

        val parcelFileDescriptor =
            contentResolver.openFileDescriptor(selectedImageUri!!, "r", null) ?: return

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
      //  progress_bar.progress = 0
        val body = UploadRequestBody(file, "image", this@SignUPActivity)
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
                }
            }
        })

    }


}






