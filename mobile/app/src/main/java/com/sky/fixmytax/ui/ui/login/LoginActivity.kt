package com.sky.fixmytax.ui.ui.login

import android.app.Activity
import android.content.Intent
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.os.Handler
import androidx.annotation.StringRes
import androidx.appcompat.app.AppCompatActivity
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.lifecycle.lifecycleScope
import com.sky.fixmytax.ConstVariable
import com.sky.fixmytax.MainActivity
import com.sky.fixmytax.R
import com.sky.fixmytax.SharePrefrence
import com.sky.fixmytax.databinding.ActivityLoginBinding
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.ui.SignUPActivity
import com.sky.fixmytax.ui.ui.login.loginModel.LoginRequest
import com.sky.fixmytax.ui.ui.login.loginModel.LoginResponse
import com.sky.fixmytax.ui.ui.login.model.SignResponse
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Response

@OptIn(DelicateCoroutinesApi::class)
class LoginActivity : AppCompatActivity() {


    private lateinit var binding: ActivityLoginBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        supportActionBar?.hide()

        if (SharePrefrence.getUserLogin(this) != "") {
            val userName = SharePrefrence.getUserLogin(this)
            binding.username.setText(userName)
        }

        binding.login.setOnClickListener {
            if (binding?.username?.text.toString().isNotEmpty()) {
                if (binding.password.text.toString().isNotEmpty()) {
                    binding.loading.visibility = View.VISIBLE
                    val loginRequest = LoginRequest(
                        password = binding.password.text.toString().trim(),
                        rememberClient = true,
                        userNameOrEmailAddress = binding.username.text.toString().trim()
                    )
                    val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)
                    var loginResponse: LoginResponse? = null
                    Log.d("request", loginRequest.toString())

                    quotesApi.getLogin(loginRequest).enqueue(object :
                        retrofit2.Callback<LoginResponse> {
                        override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                            Toast.makeText(
                                this@LoginActivity,
                                t.message,
                                Toast.LENGTH_SHORT
                            ).show()
                            Log.d("response", t.message.toString());
                            binding.loading.visibility = View.GONE
                            errorDialogBox("Invalid username or Password, Or User is inactive")
                        }

                        override fun onResponse(
                            call: Call<LoginResponse>,
                            response: Response<LoginResponse>
                        ) {
                            if (response.code() == 200) {
                                Log.d("response", response.toString());
                                Log.d("response", response.body().toString());
                                val student: LoginResponse? = response.body()
                                SharePrefrence.saveLoginDetails(
                                    binding.username.text.toString().trim(),
                                    this@LoginActivity
                                )
                                SharePrefrence.saveUserAccessToken(
                                    student?.result!!.accessToken, this@LoginActivity
                                )
                                ConstVariable.accessToken = student?.result?.accessToken.toString()
                                callData(student?.result!!.userId, student?.result!!.accessToken)
                                // Gson().fromJson<SignResponse>(response, SignResponse::class.java)
                                binding.loading.visibility = View.GONE

                            } else {
                                Log.d("response", "" + response.message().toString());
                                Log.d("response", "" + response.body().toString());
                                Log.d("response", "" + response.code());
                                Log.d("response", "" + response.errorBody());
                                binding.loading.visibility = View.GONE
                                errorDialogBox("Invalid username or Password, Or User is inactive")
                            }
                        }
                    })
                } else {
                    binding.password.error = "Enter password"
                    binding.password.requestFocus()
            }
        } else {
                binding.username.error = "Enter user-id here"
                binding.username.requestFocus()
            }
        }
        binding.signUPText?.setOnClickListener {
            val intent = Intent(this, SignUPActivity::class.java)
            startActivity(intent)
        }
    }

    private fun callData(userId:Int, token:String){

            //doSomethingHere()
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("userId",userId)
        intent.putExtra("token",token)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)


    }

    private fun updateUiWithUser(model: LoggedInUserView) {
        val welcome = getString(R.string.welcome)
        val displayName = model.displayName

        Toast.makeText(
            applicationContext,
            "$welcome $displayName",
            Toast.LENGTH_LONG
        ).show()
    }

    private fun showLoginFailed(@StringRes errorString: Int) {
        Toast.makeText(applicationContext, errorString, Toast.LENGTH_SHORT).show()
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
}

/**
 * Extension function to simplify setting an afterTextChanged action to EditText components.
 */
fun EditText.afterTextChanged(afterTextChanged: (String) -> Unit) {
    this.addTextChangedListener(object : TextWatcher {
        override fun afterTextChanged(editable: Editable?) {
            afterTextChanged.invoke(editable.toString())
        }

        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}

        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
    })


}