package com.sky.fixmytax

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ContentResolver
import android.net.Uri
import android.provider.OpenableColumns
import android.view.Gravity

import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.google.android.material.snackbar.Snackbar
import java.io.File
import java.text.SimpleDateFormat
import java.util.*

object CommonUtils {

    fun getUserCateogry(cat: String): Int{

        /*
        *
        * <item>CA / CMA / CS / TAX ADVOCATES</item>
        <item>DEFENCE PERSONNELS</item>
        <item>DIFFERENTALY ABLED</item>
        <item>GENERAL</item>
        <item>INTERNATIONAL SPORTS PERSONNELS</item>
        <item>MEDIA / NEWSPAPER JOURNALISTS</item>
        <item>START-UPS</item>
        <item>THIRD GENDER</item>
        * */
        when(cat) {
            "GENERAL"-> return 1
            "WORKING WOMEN"-> return 2
            "DIFFERENTALY ABLED"-> return 3
            "INTERNATIONAL SPORTS PERSONNELS"-> return 4
            "START-UPS"-> return 5
            "DEFENCE PERSONNELS"-> return 6
            "MEDIA / NEWSPAPER JOURNALISTS"-> return 7
            "THIRD GENDER"-> return 8
            "CA / CMA / CS / TAX ADVOCATES"-> return 9

          /*  General = 1,
            Working_Women = 2,
            Differently_Abled = 3,
            International_Sports_Personnel = 4,
            Startups = 5,
            Defence_Personnel = 6,
            Journalists = 7,
            Gender_Neutral = 8,
            Ca_cma_tax_advocated = 9*/
        }


        return 1
    }

    fun getUserCategoryName(catId: Int):String{
        when(catId) {
            1 -> return "GENERAL"
            2 -> return "WORKING WOMEN"
            3 -> return "DIFFERENTALY ABLED"
            4 -> return "INTERNATIONAL SPORTS PERSONNEL'S"
            5 -> return "START-UPS"
            6 -> return "DEFENCE PERSONNEL'S"
            7 -> return "MEDIA / NEWSPAPER JOURNALISTS"
            8 -> return "THIRD GENDER"
            9 -> return "CA / CMA / CS / TAX ADVOCATES"
        }

        return ""
    }


    /*
    *
    *  {
        None = 0,
        New = 1,
        Assigned = 2,
        Responded= 3,
        Reopen = 4,
        Resolved =5,
        Closed =6
    }
    * */

    /*]
    * public enum FixMyTaxServiceType
    {

        ITR_FILING=1,
        TDS_TCS_FILING=2,
        ITR_TDS_TCS_Notice = 3,
        GST_RETURN=4,
        GST_Notice = 5,
        TAX_APPEAL=6,
        Consultation = 7,
        Video_Consultation = 8
    }
    * */

    fun getServiceStatus(string: Int):String {
          when(string){

              1 -> return "ITR FILING"
              2 -> return "TDS TCS FILING"
              3 -> return "ITR TDS TCS Notice"
              4 -> return "GST RETURN"
              5 -> return "GST Notice"
              6 -> return "TAX APPEAL"
              7 -> return "Consultation"
              8 -> return "Video Consultation"

          }

        return ""
    }


    fun getFixMyServiceTypeForTicket(fill: String):Int{
        when(fill){

             "Filling ITR" -> return 1
            "TDS TCS FILING" -> return 2
             "ITR Notice" -> return 3
             "GST RETURN"-> return 4
             "GST Notice"-> return 5
            "Income Tax Gst Appeal"-> return 6
            "Consultation"-> return 7
            "Video Consultation"-> return 8

        }

        return 0
    }

    fun getServiceType(fill: String):Int{
        when(fill){
            "Video Consultation"-> return 1

        }
        return 2
    }


    fun getStatus(string: Int):String {
        when(string){
/*
  New = 1,
        Assigned = 2,
        Responded= 3,
        Reopen = 4,
        Resolved =5,
        Closed =6
* */
            1 -> return "New"
            2 -> return "Assigned"
            3 -> return "Responded"
            4 -> return "Responded"
            5 -> return "Reopen"
            6 -> return "Resolved"
            7 -> return "Closed"


        }

        return ""
    }



    fun View.snackbar(message: String) {
        Snackbar.make(
            this,
            message,
            Snackbar.LENGTH_LONG
        ).also { snackbar ->
            snackbar.setAction("Ok") {
                snackbar.dismiss()
            }
        }.show()
    }

    fun ContentResolver.getFileName(fileUri: Uri): String {
        var name = ""
        val returnCursor = this.query(fileUri, null, null, null, null)
        if (returnCursor != null) {
            val nameIndex = returnCursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
            returnCursor.moveToFirst()
            name = returnCursor.getString(nameIndex)
            returnCursor.close()
        }
        return name
    }

    fun getDateTime(mdate: String?): String {
        if (mdate == null)
            return ""
        return try {
            val formatter = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            val formatters = SimpleDateFormat("d MMM yyyy h:mm a")

            val date = formatter.parse(mdate)
            formatter.timeZone = TimeZone.getTimeZone("Asia/Kolkata")
            formatters.format(date)
        } catch (ex: Exception) {
            ""
        }

    }
    fun toLocalTimeZone(strDate: String): String {
        if (strDate == null)
            return ""

        return try {
            val sdfIn = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'", Locale.ENGLISH)
            sdfIn.timeZone = TimeZone.getTimeZone("UTC")
            val date = sdfIn.parse(strDate) ?: ""

            val sdfOut = SimpleDateFormat("dd/MM/yyyy hh:mm aa", Locale.ENGLISH)

            sdfOut.format(date)
//            "=> "+date.toString()
        } catch (e: Exception) {
            ""
        }
    }

    fun convertToDateFormatT(requiredFormat: String, strDate: String): String {
        if (strDate == null)
            return ""
        return try {
            val sdfIn = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS", Locale.ENGLISH)
            val date = sdfIn.parse(strDate) ?: ""

            val sdfOut = SimpleDateFormat(requiredFormat, Locale.ENGLISH)

            sdfOut.format(date)
//            "=> "+date.toString()
        } catch (e: Exception) {
            ""
        }
    }

    fun convertToDateFormatTicket(requiredFormat: String, strDate: String): String {
        if (strDate == null)
            return ""
        return try {
            val sdfIn = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH)
            val date = sdfIn.parse(strDate) ?: ""

            val sdfOut = SimpleDateFormat(requiredFormat, Locale.ENGLISH)

            sdfOut.format(date)
//            "=> "+date.toString()
        } catch (e: Exception) {
            ""
        }
    }

    @SuppressLint("MissingInflatedId")
     fun  Toast.showCustomToast(message: String, activity: Activity)
    {
        val layout = activity.layoutInflater.inflate (
            R.layout.custom_toast_layout,
            activity.findViewById(R.id.toast_container)
        )

        // set the text of the TextView of the message
        val textView = layout.findViewById<TextView>(R.id.toast_text)
        textView.text = message

        // use the application extension function
        this.apply {
            setGravity(Gravity.TOP, 0, 40)
            duration = Toast.LENGTH_LONG
            view = layout
            show()
        }
    }



    fun getFolderSizeLabel(file: File?): String? {
        val size = getFolderSize(file!!).toDouble() / 1000.0 // Get size and convert bytes into KB.
        return if (size >= 1024) {
            (size / 1024).toString() + "MB"
        } else {
            "$size KB"
        }
    }
    fun getFolderSize(file: File): Long {
        var size: Long = 0
        if (file.isDirectory) {
            for (child in file.listFiles()) {
                size += getFolderSize(child)
            }
        } else {
            size = file.length()
        }
        return size
    }
}