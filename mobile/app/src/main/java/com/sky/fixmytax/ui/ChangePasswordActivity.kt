package com.sky.fixmytax.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.sky.fixmytax.MainActivity
import com.sky.fixmytax.R
import com.sky.fixmytax.databinding.ActivityChangePasswordBinding
import com.sky.fixmytax.databinding.ActivityTicketDetailsBinding
import com.sky.fixmytax.model.ChangePasswordRequest
import com.sky.fixmytax.model.ChangePasswordResponse
import com.sky.fixmytax.model.TicketCreatedResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import retrofit2.Call
import retrofit2.Response

class ChangePasswordActivity : AppCompatActivity() {
    lateinit var binding: ActivityChangePasswordBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_password)
        binding = ActivityChangePasswordBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setView()
    }


    fun setView(){

        binding.signUP.setOnClickListener {
           //
            if(binding.currentPwd.text.toString().isNotEmpty()) {
                if(binding.newPwd.text.toString().isNotEmpty()) {
                    binding.loading.visibility = View.VISIBLE
                    val chatRequest = ChangePasswordRequest(
                        binding.currentPwd.text.toString(), binding.newPwd.text.toString()
                    )
                    val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

                    if (chatRequest != null) {
                        quotesApi.changePassword(chatRequest).enqueue(object :
                            retrofit2.Callback<ChangePasswordResponse> {
                            override fun onFailure(
                                call: Call<ChangePasswordResponse>,
                                t: Throwable
                            ) {

                            }

                            override fun onResponse(
                                call: Call<ChangePasswordResponse>,
                                response: Response<ChangePasswordResponse>
                            ) {
                                if (response.code() == 200) {
                                    binding.loading.visibility = View.GONE
                                    Log.d("response", response.body().toString())

                                    val changePasswordResponse: ChangePasswordResponse? =
                                        response.body()

                                    if (changePasswordResponse?.success == true) {
                                        successFulDialogBox()
                                    } else {
                                        errorDialogBox("Some thing went wrong, Try again")
                                    }

                                } else {
                                    binding.loading.visibility = View.GONE
                                    errorDialogBox("Some thing went wrong, Try again")
                                }
                            }

                        })
                    }
                }else {
                    binding.newPwd.error = "Enter new password"
                    binding.newPwd.requestFocus()
                }
            }else {
                binding.currentPwd.error = "Enter current password"
                binding.currentPwd.requestFocus()
            }


        }

    }
    fun successFulDialogBox(){
        val builder = AlertDialog.Builder(this)
        //set title for alert dialog
        builder.setTitle("Success")
        //set message for alert dialog
        builder.setMessage("Password changed successfully")
        builder.setIcon(android.R.drawable.ic_dialog_alert)

        //performing positive action
        builder.setPositiveButton("Okay"){dialogInterface, which ->
            //  Toast.makeText(applicationContext,"clicked yes",Toast.LENGTH_LONG).show()
            finish()
        }


        // Create the AlertDialog
        val alertDialog: AlertDialog = builder.create()
        // Set other dialog properties
        alertDialog.setCancelable(false)
        alertDialog.show()
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

}