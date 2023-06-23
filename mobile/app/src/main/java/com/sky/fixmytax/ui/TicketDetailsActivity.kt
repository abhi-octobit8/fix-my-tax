package com.sky.fixmytax.ui

import android.app.Activity
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.OpenableColumns
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.gson.Gson
import com.sky.fixmytax.CommonUtils
import com.sky.fixmytax.CommonUtils.getFileName
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.R
import com.sky.fixmytax.SharePrefrence
import com.sky.fixmytax.databinding.ActivityLoginBinding
import com.sky.fixmytax.databinding.ActivityTicketDetailsBinding
import com.sky.fixmytax.interfaces.BluePrint
import com.sky.fixmytax.model.*
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.ui.adapter.AttachmentAdapter
import com.sky.fixmytax.ui.adapter.ChatAdapter
import com.sky.fixmytax.ui.adapter.GetAllTicketAdapter
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import okio.BufferedSink
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class TicketDetailsActivity : AppCompatActivity() , BluePrint.OnAttachmentPDF{
    var ticketResponse: GetAllTicketResponse? = null
    var  ticketItem: TicketItems? = null
    var ticketAdapter : ChatAdapter? = null
    var attachementAdapter: AttachmentAdapter? = null
    private var selectedImageUri: Uri? = null
    private lateinit var binding: ActivityTicketDetailsBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ticket_details)
        binding = ActivityTicketDetailsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val gson = Gson()
        val deliveryDetailsData = intent.getStringExtra("ticketDetail")
        ticketItem = gson.fromJson(
            deliveryDetailsData,
            TicketItems::class.java
        )

        Log.d("tickeT",ticketItem?.price!!)
        setView()
        chatView()
        initRecyclerView()
        setAttachemnet()
        uploadFile()
        setVideoData()
        getTicketDetails()
    }

    fun setVideoData(){

        if(ticketItem?.slot !=null){
            binding.lytVideo.visibility =View.VISIBLE
            binding.tvVideoDate.text =CommonUtils.convertToDateFormatTicket("dd/MM/yy",ticketItem?.slot?.date!!)
            binding.tvVideoTime.text = ticketItem?.slot?.slotName!!
            binding.tvVideoTopic.text = ticketItem?.slot?.description
        }
    }

    fun uploadFile(){
        binding.btnUpload.setOnClickListener {
            val pdfIntent = Intent(Intent.ACTION_GET_CONTENT)
            pdfIntent.type = "application/pdf"
            pdfIntent.addCategory(Intent.CATEGORY_OPENABLE)
            startActivityForResult(pdfIntent, SignUPActivity.REQUEST_CODE_PICK_IMAGE)
        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            when (requestCode) {
                SignUPActivity.REQUEST_CODE_PICK_IMAGE -> {
                    selectedImageUri = data?.data
                    val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
                    Log.d("data",file.name)
                    binding.fileName?.text = file.name

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
                        binding.fileName?.text  = ""
                    }else {
                        uploadImage()
                    }
                }
            }
        }
    }


    class UploadRequestBody(
        private val file: File,
        private val contentType: String,
        private val callback: TicketDetailsActivity
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

    private fun uploadImage() {
        if (selectedImageUri == null) {
            // layout_root.snackbar("Select an Image First")
            return
        }
        val gson  =Gson()
        val userS =  SharePrefrence.getUserData(this)
        val userData= gson.fromJson(userS, UserData::class.java)

        val urlS = "https://fixmytaxapi.zupiers.com/api/services/app/FileService/UploadRequestFile?id=${ticketItem?.id}"

        val parcelFileDescriptor =
            contentResolver.openFileDescriptor(selectedImageUri!!, "r", null) ?: return

        val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
        val file = File(cacheDir, contentResolver.getFileName(selectedImageUri!!))
        val outputStream = FileOutputStream(file)
        inputStream.copyTo(outputStream)
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
        //  progress_bar.progress = 0
        val body = UploadRequestBody(file, "image", this@TicketDetailsActivity)
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
                    Toast.makeText(this@TicketDetailsActivity,"Successfully uploaded",Toast.LENGTH_LONG).show()
                    getTicketDetails()
                }
            }
        })

    }

    private fun setAttachemnet(){

        if(ticketItem?.attachments?.size!!>0) {
      binding.attachmentRecyclerView.visibility = View.VISIBLE
            attachementAdapter = AttachmentAdapter(
                this@TicketDetailsActivity,
                ticketItem?.attachments!!,
                this

            )
            binding?.attachmentRecyclerView?.adapter = attachementAdapter
        }else {
            binding.attachmentRecyclerView.visibility = View.GONE

        }
    }


    private fun setView(){
        binding.tvPsp.text = ticketItem?.assignedUserName
        binding.tvPrice.text = ticketItem?.price
        binding.tvTxnNumber.text = "#"+ticketItem?.transactionNumber
        binding.tvTitle.text = ticketItem?.section
        binding.tvTime.text = "Time: "+CommonUtils.convertToDateFormatT("dd/MM/yy",ticketItem?.creationTime!!)
        binding.tvService.text = CommonUtils.getServiceType(ticketItem?.serviceType!!)
            binding.tvStatus.text = CommonUtils.getStatus(ticketItem?.status!!)
        getChatResponse(ticketItem?.id!!)
    }

    private fun chatView(){
        binding.btnSubmit.setOnClickListener {

            if(binding.editTextTopic.text.toString().isNotEmpty()) {

                val chatRequest = ticketItem?.id?.let { it1 ->
                    ChatRequest(
                        it1,
                        binding.editTextTopic.text.toString()
                    )
                }

                val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

                if (chatRequest != null) {
                    quotesApi.postCharCrated(chatRequest).enqueue(object :
                        retrofit2.Callback<ChatGetResponse> {
                        override fun onFailure(call: Call<ChatGetResponse>, t: Throwable) {

                        }

                        override fun onResponse(
                            call: Call<ChatGetResponse>,
                            response: Response<ChatGetResponse>
                        ) {
                            if (response.code() == 200) {
                                //     Toast.makeText(this@SignUPActivity, "Registration success!", Toast.LENGTH_SHORT).show()
                                binding.editTextTopic.text?.clear()
                                //   SignResponse = response.body()
                                Log.d("response", response.toString());
                                Log.d("response", response.body().toString());
                                getChatResponse(ticketItem?.id!!)

                            } else {

                            }
                        }

                    })
                }
            }else {
                binding.editTextTopic.requestFocus()
                binding.editTextTopic.error = "Enter comment here..."

            }
        }
    }

    fun getTicketDetails(){
        val url = "https://fixmytaxapi.zupiers.com/api/services/app/TicketService/Get?id=${ticketItem?.id}"
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        Log.d("urlText", url);

        quotesApi.getTicketDetails(url).enqueue(object :
            retrofit2.Callback<TicketDewtailsResponseUpdated> {
            override fun onFailure(call: Call<TicketDewtailsResponseUpdated>, t: Throwable) {

            }
            override fun onResponse(call: Call<TicketDewtailsResponseUpdated>, response: Response<TicketDewtailsResponseUpdated>) {
                if (response.code() == 200) {

                    Log.d("res",response.body().toString())

                    val chatListResponse: TicketDewtailsResponseUpdated? = response.body()



                     if(chatListResponse?.result?.attachments?.size !! >0){
                    if(chatListResponse?.result?.attachments.size!!>0) {
                        binding.attachmentRecyclerView.visibility = View.VISIBLE
                        attachementAdapter = AttachmentAdapter(
                            this@TicketDetailsActivity,
                            chatListResponse?.result?.attachments!!,
                            this@TicketDetailsActivity

                        )
                        binding?.attachmentRecyclerView?.adapter = attachementAdapter
                    }else {
                        binding.attachmentRecyclerView.visibility = View.GONE

                    }
                     }

                    if(ticketItem?.slot !=null){
                        binding.tvVideoTopic.text = chatListResponse?.result?.description.toString()
                    }


                } else {


                }
            }

        })
    }

    fun getChatResponse(keyP: Int){

        val url = "https://fixmytaxapi.zupiers.com/api/services/app/CommentService/GetAll?requestTicketId=$keyP"

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        quotesApi.getChatList(url).enqueue(object :
                retrofit2.Callback<ChatGetResponse> {
                override fun onFailure(call: Call<ChatGetResponse>, t: Throwable) {

                }
                override fun onResponse(call: Call<ChatGetResponse>, response: Response<ChatGetResponse>) {
                    if (response.code() == 200) {

                        Log.d("res",response.body().toString())

                        val chatListResponse: ChatGetResponse? = response.body()

                        ticketAdapter = ChatAdapter(
                            this@TicketDetailsActivity,
                            chatListResponse?.result?.items!!

                        )
                        binding?.mainfilterRecyclerView?.adapter = ticketAdapter

                    } else {


                    }
                }

            })

    }

    private fun initRecyclerView() {
        val layoutManagerss: RecyclerView.LayoutManager =
            GridLayoutManager(this, 1)
        binding?.mainfilterRecyclerView?.layoutManager = (layoutManagerss)

      //  val  layoutManagerAttch : RecyclerView.LayoutManager = LinearLayoutManager(this, layoutManagerss.)
        val layoutManager = LinearLayoutManager(this@TicketDetailsActivity,LinearLayoutManager.VERTICAL,true)
      binding.attachmentRecyclerView?.layoutManager = layoutManager
    }



    fun download(id: Int, fileName: String)  {
        val urlString = "https://fixmytaxapi.zupiers.com/api/services/app/FileService/DownloadFile?id=${ticketItem?.id}"
        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        quotesApi.download(urlString).enqueue(object :
            retrofit2.Callback<ResponseBody> {
            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                Log.d("res",t.message.toString())
            }
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.code() == 200) {

                    Log.d("res",response.body().toString())

                  //  val chatListResponse: String? = response.body()



                } else {


                }
            }
            })
    }


    override fun onItemClick(id: Int, fileName: String) {
        download(id,fileName)
    }

}