package com.sky.fixmytax.ui

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.AppCompatButton
import com.sky.fixmytax.CommonUtils.showCustomToast
import com.sky.fixmytax.R
import com.sky.fixmytax.Utils
import com.sky.fixmytax.databinding.ActivityVideoConsulatationBinding
import com.sky.fixmytax.model.VideoCSlotListResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import retrofit2.Call
import retrofit2.Response
import java.util.*
import kotlin.collections.ArrayList


class VideoConsulatationActivity : AppCompatActivity() {
    private var selectedImageUri: Uri? = null
    var fileName: TextView? = null
    var datePicker: DatePickerDialog? = null
    var slotList: kotlin.collections.List<String>? = null
    var categories: ArrayList<String> = ArrayList()
    var slot: Int? = null
    var videroCslotList:  VideoCSlotListResponse? = null
    lateinit var binding: ActivityVideoConsulatationBinding
    @RequiresApi(Build.VERSION_CODES.N)
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_video_consulatation)
        binding = ActivityVideoConsulatationBinding.inflate(layoutInflater)
        setContentView(binding.root)
        fileName = findViewById<TextView>(R.id.fileName)

        val btn_click_me = findViewById<AppCompatButton>(R.id.submit_create)
        val btnUpload = findViewById<AppCompatButton>(R.id.btnUpload)
        btn_click_me.setOnClickListener {
            if(binding.editTextTopic.text.toString().isNotEmpty()) {
                if(slot !=null) {
                    val intent = Intent(this, CheckOutActivity::class.java)
                    intent.putExtra("ServiceName", "Video Consultation")
                    intent.putExtra("ServiceType", "Video Consultation")
                    intent.putExtra("SubServiceType", "")
                    intent.putExtra("SubServiceKey", "5100")
                    intent.putExtra("slotId", slot)
                    intent.putExtra("disc", binding.editTextTopic.text?.trim().toString())
                    startActivity(intent)
                }else {
                    Toast(this).showCustomToast ("Select Date for slot booking", this)
                }
            }else {
                binding.editTextTopic.error = "Enter topic here..."
                binding.editTextTopic.requestFocus()
            }
        }

        btnUpload.setOnClickListener {
            // uploadPDF()
        }
        setCalender()
    }

    @RequiresApi(Build.VERSION_CODES.N)
    fun setCalender(){
        // initialising the datepickerdialog
        datePicker =  DatePickerDialog(this);

        val calendar:Calendar = Calendar.getInstance();

        // initialising the layout

         val  day: Int = calendar.get(Calendar.DAY_OF_WEEK);
         val year: Int = calendar.get(Calendar.YEAR);
        val  month:Int = calendar.get(Calendar.MONTH);

        binding.editTextDate.setOnClickListener {
            datePicker = DatePickerDialog(
                this@VideoConsulatationActivity,
                { view, year, month, dayOfMonth -> // adding the selected date in the edittext
                 //   binding.editTextDate.setText(dayOfMonth.toString()+"/"+ (month + 1) + "/" + year)
                    binding.editTextDate.setText((month + 1).toString()+"/"+ dayOfMonth.toString() + "/" + year)
                    getSlotList(binding.editTextDate.text.toString())
                }, year, month, day
            )

            // set maximum date to be selected as today
            datePicker!!.datePicker.maxDate = calendar.timeInMillis+(1000*60*60*24*7) // next seven days
            datePicker!!.datePicker.minDate = calendar.timeInMillis


            // show the dialog
            datePicker!!.show()
        }


    }


    fun getSlotList(input: String){
        val url = "https://fixmytaxapi.zupiers.com/api/services/app/SlotService/GetAvailableSlots?input=$input"

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        Log.d("urlllllll",url)

        quotesApi.getVideoSlotList(url).enqueue(object :
            retrofit2.Callback<VideoCSlotListResponse> {
            override fun onFailure(call: Call<VideoCSlotListResponse>, t: Throwable) {

            }
            @SuppressLint("SuspiciousIndentation")
            override fun onResponse(call: Call<VideoCSlotListResponse>, response: Response<VideoCSlotListResponse>) {
                if (response.code() == 200) {

                 Log.d("response", response.body().toString())

                   videroCslotList = response.body()

                    Log.d("response", videroCslotList?.result?.items?.size.toString())
                    for(item in videroCslotList?.result?.items!!){

                        categories.add(item.slotName)
                    }
                    setDropDown()

                } else {


                }
            }

        })

    }


    fun setDropDown(){

        // Spinner Drop down elements

        val adapter = ArrayAdapter(
            this, android.R.layout.simple_spinner_item, categories)
       adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)

        binding.spSection.adapter = adapter
        // Creating adapter for spinner

        binding.spSection.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long) {
                Log.d("position",""+position)
                //   Toast.makeText(this@FilingITRActivity, "item " + "" + noticeSelectionType[position], Toast.LENGTH_SHORT).show()
                var item = parent.getItemAtPosition(position).toString()
                Log.d("data",item)
                slot = videroCslotList?.result?.items?.get(position)?.id


            }
            override fun onNothingSelected(parent: AdapterView<*>?) {}
        }
    }

}