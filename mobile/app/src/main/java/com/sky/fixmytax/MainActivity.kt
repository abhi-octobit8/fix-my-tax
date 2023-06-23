package com.sky.fixmytax

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.navigation.NavigationView
import com.google.gson.Gson
import com.sky.fixmytax.SharePrefrence.ACCESS_TOKEN
import com.sky.fixmytax.SharePrefrence.commonInit
import com.sky.fixmytax.SharePrefrence.removeAccessToken
import com.sky.fixmytax.databinding.ActivityMainBinding
import com.sky.fixmytax.model.UserData
import com.sky.fixmytax.model.UserDetails
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.network.RetrofitHelper.interceptor
import com.sky.fixmytax.ui.AboutActivity
import com.sky.fixmytax.ui.ChangePasswordActivity
import com.sky.fixmytax.ui.ContactUsActivity
import com.sky.fixmytax.ui.home.HomeFragment
import com.sky.fixmytax.ui.ui.login.LoginActivity
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)

        setSupportActionBar(binding.appBarMain.toolbar)

        commonInit(this)


        val drawerLayout: DrawerLayout = binding.drawerLayout
        val navView: NavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_content_main)


      //  NavigationView navigationView = (NavigationView) findViewById(R.id.your_nav_view_id);
        val header: View = binding.navView.getHeaderView(0)
        val  text: TextView = header.findViewById<TextView>(R.id.userName_he)
        val  textEmail: TextView = header.findViewById<TextView>(R.id.textView_email)
        val userName = SharePrefrence.getUserLogin(this)
       // text.text = userName
        text.visibility = View.GONE


         /*   val user : UserData = SharePrefrence.getUserDetails(this)
            text.text = user.name*/


        textEmail.text = userName

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow,R.id.nav_slideLogOut,
            ), drawerLayout
        )



      setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        binding.navView.setNavigationItemSelectedListener { menuItem -> // Toggle the checked state of menuItem.
            menuItem.isChecked = !menuItem.isChecked
            when (menuItem.itemId) {
                R.id.nav_slideLogOut -> {
                    SharePrefrence.removeAccessToken(this)
                //    Toast.makeText(this, "logout", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, LoginActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                }

                R.id.nav_gallery -> {

                    val intent = Intent(this, AboutActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                }
                R.id.nav_slideshow -> {
                    val intent = Intent(this, ContactUsActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                }
                R.id.nav_slidepwd ->{
                    val intent = Intent(this, ChangePasswordActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                }

            }
          //  Toast.makeText(applicationContext, menuItem.title.toString() + "Selected", Toast.LENGTH_SHORT).show()
           // closeDrawer()
            true
        }
      //  passValueToHomeFragment()
        getUserDetails()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.

        menuInflater.inflate(R.menu.main, menu)
        return true
    }
    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        when (item.itemId) {
            R.id.nav_slideLogOut -> {
                // Code to be executed when the add button is clicked

                return true
            }
        }
        return super.onOptionsItemSelected(item)


    }


    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }




    fun getUserDetails(){

        val id = intent.getIntExtra("userId",0)
        val url = "https://fixmytaxapi.zupiers.com/api/services/app/FMTCustomerService/GetCustomerById?id=$id"

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)

        quotesApi.getUserDetails(url).enqueue(object :
            retrofit2.Callback<UserDetails> {
            override fun onFailure(call: Call<UserDetails>, t: Throwable) {

            }
            override fun onResponse(call: Call<UserDetails>, response: Response<UserDetails>) {
                if (response.code() == 200) {

                    Log.d("res",response.body().toString())

                    val chatListResponse: UserDetails? = response.body()

                    val gson = Gson()
                    val json = gson.toJson(chatListResponse?.result)

                    SharePrefrence.saveUserData(json,this@MainActivity)


                } else {

                    Log.d("response",response.body().toString())
                }
            }

        })
    }




}