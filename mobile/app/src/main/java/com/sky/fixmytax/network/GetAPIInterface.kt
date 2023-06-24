package com.sky.fixmytax.network

import com.sky.fixmytax.model.*
import com.sky.fixmytax.ui.ui.login.loginModel.LoginRequest
import com.sky.fixmytax.ui.ui.login.loginModel.LoginResponse
import com.sky.fixmytax.ui.ui.login.model.SignResponse
import com.sky.fixmytax.ui.ui.login.model.SignUPRequest
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.*


interface GetAPIInterface {

    @Headers("abp.tenantid:1")
    @POST("services/app/RegisterService/Create")
    fun getQuotes(@Body login: SignUPRequest) :retrofit2.Call<SignResponse>


    @Headers("isMobile:true")
    @POST("TokenAuth/Authenticate")
     fun getLogin(@Body login: LoginRequest) : retrofit2.Call<LoginResponse>

    @POST("services/app/RegisterService/ContactUs")
    suspend fun postContactUs(@Body login: ContactUsRequest) : Response<ContactUsResponse>

    @POST("services/app/CommentService/Create")
    fun postCharCrated(@Body login: ChatRequest) : retrofit2.Call<ChatGetResponse>


    @POST("services/app/TicketService/Create")
    fun ticketCreate(@Body login: TicketCreateRequest) : retrofit2.Call<TicketCreatedResponse>

    @POST("services/app/FMTCustomerService/ChangePassword")
    fun changePassword(@Body login: ChangePasswordRequest) : retrofit2.Call<ChangePasswordResponse>

    @GET
    fun getChatList(@Url url: String) : retrofit2.Call<ChatGetResponse>

    @GET
    fun getTicketDetails(@Url url: String) : retrofit2.Call<TicketDewtailsResponseUpdated>

    @GET
    fun getVideoSlotList(@Url url: String) : retrofit2.Call<VideoCSlotListResponse>

    @GET
    fun getCheckOutPrice(@Url url: String) : retrofit2.Call<CheckoutPriceResponse>

    @GET
    fun getUserDetails(@Url url: String) : retrofit2.Call<UserDetails>


    @GET
    suspend fun getPrice(@Url login: String) : Response<GetPriceFromServerResponse>

    @GET("services/app/TicketService/GetAll")
    fun getAllTicket() : retrofit2.Call<GetAllTicketResponse>

    @POST
    fun download(@Url url: String): Call<ResponseBody>






    @Multipart
    @POST
    fun uploadImage(
        @Url url: String,
        @Part image: MultipartBody.Part,
        @Part("desc") desc: RequestBody
    ): Call<FileUploadResponse>
}