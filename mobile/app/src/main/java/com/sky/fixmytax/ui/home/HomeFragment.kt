package com.sky.fixmytax.ui.home

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.gson.Gson
import com.sky.fixmytax.BusinessConsultActivity
import com.sky.fixmytax.ConstVariable
import com.sky.fixmytax.R
import com.sky.fixmytax.databinding.FragmentHomeBinding
import com.sky.fixmytax.interfaces.BluePrint
import com.sky.fixmytax.model.GetAllTicketResponse
import com.sky.fixmytax.network.GetAPIInterface
import com.sky.fixmytax.network.RetrofitHelper
import com.sky.fixmytax.ui.*
import com.sky.fixmytax.ui.adapter.GetAllTicketAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class HomeFragment : Fragment(), BluePrint.OnAdapterItemTypeClick {

    private var _binding: FragmentHomeBinding? = null
    var filterMainAdapter: GetAllTicketAdapter? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    var ticketResponse: GetAllTicketResponse? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textHome
        homeViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        _binding?.pBar?.visibility =View.VISIBLE
        getNextClick()
        initRecyclerView()

        getAllTicket()

        _binding?.submitCreate?.setOnClickListener {
            _binding?.mainService?.visibility =View.VISIBLE
            _binding?.submitBack?.visibility =View.VISIBLE
            _binding?.subService?.visibility =View.GONE
            _binding?.textLyt?.visibility =View.VISIBLE

        }
        _binding?.floatingBTN?.setOnClickListener {
            _binding?.mainService?.visibility =View.GONE
            _binding?.subService?.visibility =View.VISIBLE
            _binding?.textLyt?.visibility =View.GONE
            _binding?.submitBack?.visibility =View.GONE
        }

      //  val bundle = arguments
        val message =  ConstVariable.accessToken  // bundle!!.getString("mText")

        Log.d("token:Ho ",message.toString())


        return root

    }

    private fun getNextClick(){

        _binding?.lytIncomeTaxGstAppeal?.setOnClickListener {

            val intent = Intent(context, IncomeTaxGstAppealActivit::class.java)
            context?.startActivity(intent)
        }
        /*_binding?.lytIncomeTaxGstAppeal?.setOnClickListener {
            Toast.makeText(context,"under Development",Toast.LENGTH_LONG).show()
        }*/
        _binding?.lytBusinessConsult?.setOnClickListener {
          // Toast.makeText(context,"under Development",Toast.LENGTH_LONG).show()
            val intent = Intent(context, BusinessConsultActivity::class.java)
            context?.startActivity(intent)
        }
        _binding?.lytVideoConsultationFiling?.setOnClickListener {
           // Toast.makeText(context,"under Development",Toast.LENGTH_LONG).show()
            val intent = Intent(context, VideoConsulatationActivity::class.java)
            context?.startActivity(intent)
        }

        _binding?.lytGstReturn?.setOnClickListener {
            val intent = Intent(context, GSTrETURNActivity::class.java)
            context?.startActivity(intent)
        }
        _binding?.gstNotice?.setOnClickListener {
            val intent = Intent(context, GSTNoticeActivity::class.java)
            context?.startActivity(intent)
        }
        _binding?.lytItrTdsTcsNotices?.setOnClickListener {
            val intent = Intent(context, ITRNoticeActivity::class.java)
            context?.startActivity(intent)
        }

        _binding?.lytTdsTcsFiling?.setOnClickListener {
            val intent = Intent(context, TDSTCSFilingActivity::class.java)
            context?.startActivity(intent)
        }
        _binding?.lytItrFiling?.setOnClickListener {
            val intent = Intent (context, FilingITRActivity::class.java)
            context?.startActivity(intent)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }




    private fun initRecyclerView() {


        val layoutManagerss: RecyclerView.LayoutManager =
            GridLayoutManager(requireContext(), 1)
        _binding?.mainfilterRecyclerView?.layoutManager = (layoutManagerss)
    }

    private fun getAllTicket(){

        val quotesApi = RetrofitHelper.getInstance().create(GetAPIInterface::class.java)



        quotesApi.getAllTicket().enqueue(object :
            retrofit2.Callback<GetAllTicketResponse> {
            override fun onFailure(call: Call<GetAllTicketResponse>, t: Throwable) {


            }

            override fun onResponse(call: Call<GetAllTicketResponse>, response: Response<GetAllTicketResponse>) {
                if (response.code() == 200) {
                    //     Toast.makeText(this@SignUPActivity, "Registration success!", Toast.LENGTH_SHORT).show()

                    //   SignResponse = response.body()
                    Log.d("response", response.toString());
                    Log.d("response", response.body().toString());
                    Log.d("response", ""+ response.body()?.result?.items?.size);

                    if(response.body()?.result?.items?.size!!>0){
                        _binding?.mainService?.visibility =View.GONE
                        _binding?.subService?.visibility =View.VISIBLE
                        _binding?.textLyt?.visibility =View.GONE

                         ticketResponse = response.body()
                        Log.d("itemSize", ""+ticketResponse?.result?.items?.size)
                        filterMainAdapter = GetAllTicketAdapter(
                            requireContext(),
                            this@HomeFragment,
                            ticketResponse?.result?.items!!
                        )

                        _binding?.mainfilterRecyclerView?.adapter = filterMainAdapter

                    } else {
                        _binding?.mainService?.visibility =View.VISIBLE
                        _binding?.subService?.visibility =View.GONE
                        _binding?.textLyt?.visibility =View.VISIBLE
                    }

                } else {
                    _binding?.mainService?.visibility =View.VISIBLE
                    _binding?.subService?.visibility =View.GONE
                    _binding?.textLyt?.visibility =View.VISIBLE
                }
                _binding?.pBar?.visibility =View.GONE
            }

        })


    }

    override fun onResume() {
        getAllTicket()
        super.onResume()

    }

    override fun onItemClick(position: Int, type: String) {
          Log.d("values",""+ ticketResponse?.result?.items?.get(position)!!)
        val gson = Gson()
        val studentDataObjectAsAString = gson.toJson(ticketResponse?.result?.items?.get(position)!!)
        val intent = Intent(requireContext(), TicketDetailsActivity::class.java)
        intent.putExtra("ticketDetail", studentDataObjectAsAString)
        intent.putExtra("ticketP", position)
       requireContext().startActivity(intent)

    }



}