package com.sky.fixmytax.ui

object Price {


    fun  getPriceNotice(item: String, sunItem: String): String{

         when(item){
             "131-1A"->{
               when(sunItem){
                   "REPLY IN RESPONSE TO SUMMON NOTICE" -> { return "itr_tds_tcs_notice_131_1A_1_1" }
                   "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" -> {
                       return "itr_tds_tcs_notice_any_1_2"
                   }
               }
             }
             "133-6" -> {
                 when (sunItem) {
                     "REPLY IN RESPONSE TO NOTICE (DIRECT RELATED TO ASSESSEE BY A.O.)" ->
                     { return  "itr_tds_tcs_notice_133-6_2_1" }
                     "REPLY IN RESPONSE TO NOTICE (RELATED TO THIRD PARTY INFORMATION / CONFIRMATION)" ->
                     { return  "itr_tds_tcs_notice_133-6_2_2" }
                     "REPLY IN RESPONSE TO NOTICE (RAISED BY ADI OR DI OFFICE)" ->
                     { return  "itr_tds_tcs_notice_133-6_2_3" }
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "142-1" -> {
                 when(sunItem){
                     "BUSINESS CLOSED INFORMATION" ->
                     { return  "itr_tds_tcs_notice_142-1_3_1"}
                     "FOR FILING RETURN OF INCOME - RETURN FILED" ->
                     { return  "itr_tds_tcs_notice_142-1_3_2"}
                     "FOR FILING RETURN OF INCOME - RETURN NOT FILED" ->
                     { return  "itr_tds_tcs_notice_142-1_3_3"}
                     "FOR FURNISHING OF DETAILS AS PROVIDED I.E. ACCOUNTS AND DOCUMENTS FOR ASSESSMENT" ->
                     { return  "itr_tds_tcs_notice_142-1_3_4"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                     "OTHERS NOTICES" ->
                     { return  "itr_tds_tcs_notice_other_3_5"}
                 }
             }
             "143(2)" -> {
                 when(sunItem){
                     "REPLY FOR COMPLIANCE" -> { return "itr_tds_tcs_notice_143_2_4_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "143-1" -> {
                 when (sunItem){
                     "FOR RECTIFICATION OF DEMAND RAISED VIDE INTIMATION 143-1" ->
                     {return "itr_tds_tcs_notice_143-1_5_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "144" -> {
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE - NOT RESPONDED" ->
                     {return "itr_tds_tcs_notice_144_6_1"}
                     "REPLY IN RESPONSE TO NOTICE - RESPONDED" ->
                     {return "itr_tds_tcs_notice_144_6_2"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                     "OTHERS NOTICES" ->
                     {return "itr_tds_tcs_notice_144_6_3"}
                 }
             }
             "148A" -> {
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE" ->
                     { return "itr_tds_tcs_notice_148A_7_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "156" -> {
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE" ->
                     {return "itr_tds_tcs_notice_156_8_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "176-3" -> {
                 when(sunItem){
                     "INTIMATION FOR DISCONTINUATION OF BUSINESS"->
                     {return "itr_tds_tcs_notice_176-3_9_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "210-3"->{
                 when(sunItem){
                     "REPLY FOR DEPOSIT OF ADVANCE TAX"->
                     {return "itr_tds_tcs_notice_210-3_10_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "221"->{
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE" ->
                     {return "itr_tds_tcs_notice_221_11_1"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "245"->{
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE - SIMPLE REPLY" ->
                     {return "itr_tds_tcs_notice_245_12_1"}
                     "REPLY IN RESPONSE TO NOTICE - EARLIER DEMAND ADJUSTED WITH REFUND" ->
                     {return "itr_tds_tcs_notice_245_12_2"}
                     "OTHERS NOTICES" ->
                     {return "itr_tds_tcs_notice_245_12_3"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                 }
             }
             "271-1-c" ->{
                 when(sunItem){
                     "REPLY IN RESPONSE TO NOTICE - APPEAL NOT FILED" ->
                     {return  "itr_tds_tcs_notice_271-1-c_13_1"}
                     "REPLY IN RESPONSE TO NOTICE - APPEAL FILED" ->
                     {return  "itr_tds_tcs_notice_271-1-c_13_2"}
                     "OTHERS NOTICES" -> {return  "itr_tds_tcs_notice_271-1-c_13_3"}
                     "ADJOURNMENT APPLICATION FOR ANY GENUINE CASE" ->
                     { return  "itr_tds_tcs_notice_any_1_2" }
                     "REPLY IN RESPONSE TO NOTICE - EARLIER DEMAND ADJUSTED WITH REFUND" ->
                     {return "itr_tds_tcs_notice_245_12_2"}
                 }
             }
             "NOTICE UNDER OTHER SECTIONS"-> {
               return "itr_tds_tcs_notice_other_sections_14_1"
             }
         }
        return ""
    }

    fun getPriceGstIncomeTaxAppeal(item: String, sunItem: String):String {
        when(item){
            "Income Tax Appeal" ->
                when (sunItem){
                    "FORM - 35 - FILING"-> return "appeal_income_tax_35_filling_1_1"
                    "FORM - 35 - SUBSEQUENT WRITTEN SUBMISSIONS"-> return "appeal_income_tax_35_subsequent_written_1_2"
                    "FORM - 35 - FILING WITH WRITTEN SUBMISSIONS"-> return "appeal_income_tax_35_filling_written_1_3"
                    "FORM - 36 - FILING"-> return "appeal_income_tax_36_filling_1_4"
                    "FORM - 36 - SUBSEQUENT WRITTEN SUBMISSIONS"-> return "appeal_income_tax_36_subsequent_written_1_5"
                    "FORM - 36 - FILING WITH WRITTEN SUBMISSIONS"-> return "appeal_income_tax_36_filling_written_1_6"
                    "PERSONAL HEARING THROUGH AR - OTHER THAN FEE: EXPENSES TO BE REIMBURSED AT ACTUALS"-> return "appeal_income_tax_personal_actuals_1_7"
                }
            "GST Appeal" -> {
                when(sunItem){
                    "FORM - APL-01 - FILING"-> return "appeal_gst_01_filling_2_1"
                    "FORM - APL-01 - SUBSEQUENT WRITTEN SUBMISSIONS"-> return "appeal_gst_01_subsequent_written_2_2"
                    "FORM - APL-01 - FILING WITH WRITTEN SUBMISSIONS"-> return "appeal_gst_01_filling_written_2_3"
                    "FORM - APL-05 - FILING"-> return "appeal_gst_05_filling_2_4"
                    "FORM - APL-05 - SUBSEQUENT WRITTEN SUBMISSIONS"-> return "appeal_gst_05_subsequent_written_2_5"
                    "FORM - APL-05 - FILING WITH WRITTEN SUBMISSIONS"-> return "appeal_gst_05_filling_written_2_6"
                    "PERSONAL HEARING THROUGH AR-OTHER THAN FEE: EXPENSES TO BE REIMBURSED AT ACTUALS"->
                        return "appeal_gst_personal_ITAT_actuals_2_7"
                }
            }

        }
        return ""
    }


    fun getPriceGST(item: String): String{
        when(item){
            "GST REG-03" -> {return "1100"}
            "GST REG-17" -> {return "2100"}
            "GST REG-23" -> {return "2100"}
            "GST REG-27" -> {return "1100"}
            "GST GSTR-3A" -> {return "2100"}
            "GST CMP-05" -> {return "2100"}
            "GST PCT-03" -> {return "2100"}
            "GST RFD-08" -> {return "5100"}
            "GST ASMT-02" -> {return "5100"}
            "GST ASMT-06" -> {return "11000"}
            "GST ASMT-10" -> {return "21000"}
            "GST ASMT-14" -> {return "7100"}
            "GST ADT-01" -> {return "7100"}
            "GST RVN-01" -> {return "5100"}
            "GST DRC-01" -> {return "2100"}
            "GST DRC-10" -> {return "21000"}
            "GST DRC-11" -> {return "5100"}
            "GST DRC-13" -> {return "5100"}
            "GST DRC-16" -> {return "21000"}
        }

        return ""
    }

    fun getPriceITR(item: String): String {
        when(item){
            "ITR-1"->{return  "1100"}
            "ITR-2"->{return  "1500"}
            "ITR-3"->{return  "2100"}
            "ITR-4"->{return  "1500"}
            "ITR-5"->{return  "2100"}
            "ITR-6"->{return  "5100"}
            "ITR-7"->{return  "7100"}
        }

        return ""
    }

    fun getPriceConsultation(item: String): String{
        when (item){
            "CONSULTANCY RELATED TO PROPERTY OR BUSINESS SITUATED IN INDIA"->{return "11000"}
            "Others"->{return "11000"}
        }
        return ""
    }
    
    fun  getPriceBusinessConsult(item: String):String {
        when(item){
                "Enjoy knowledge about intricacies of taxation laws as per Statute" ->{ return "business_consultation_taxation_laws_1"}
                "Legal opinion on any complex taxation matters from our Team of Qualified Professionals @ Legal Consultancy" ->
                {return  "business_consultation_taxation_complex_2"}
                "Any Business Related Consultancy Being Proprietorship / Partnership / LLP Or Company" ->
                {return "business_consultation_related_llp_3"}
        "Any NGO Related Consultancy Being Society / Trust / Charitable Company" ->
        {return "business_consultation_ngo_consultancy_4"}
                "Any NGO Income Related Query" ->{return "business_consultation_ngo_income_5"}
        }
        return ""
    }

    fun getGSTNotice(item: String): String
    {
        when(item) {
            "GST REG-03 (Notice issued for further information / clarification in response to application for new registration or amendment of GST registration certificate.)" -> {
                return "gst_notice_REG_03_1"
            }

            "GST REG-17 (Show Cause Notice as to why GST registration be not be cancelled.)" -> {
                return "gst_notice_REG_17_2"
            }


            "GST REG-23 (Show Cause Notice as to why registration of GST cancellation be revoked.)" -> {

                return "gst_notice_REG_23_3"
            }

            "GST REG-27 (Notice where application for provisional registration has not been made for migration into GST from VAT regime or incomplete details have been provided.)" -> {
                return "gst_notice_REG_27_4"
            }

            "GST GSTR-3A (Notice to assessee who are default for not filing GST Returns in GSTR-1 or GSTR-3B or GSTR-4 or GSTR-8.)" -> {

                return "gst_notice_GSTR_3A_5"
            }

            "GST CMP-05 (Show Cause Notice for eligibility to be a composition dealer.)" -> {

                return "gst_notice_CMP_05_6"
            }
            "GST PCT-03 (Show Cause Notice for misconduct by GST practitioner.)" -> {

                return "gst_notice_PCT_03_7"
            }
            "GST RFD-08 (Show Cause Notice on rejection of GST refund made.)" -> {

                return "gst_notice_RFD_08_8"
            }
            "GST ASMT-02 (Clarification / Additional documents required for provisional assessment.)" -> {

                return "gst_notice_ASMT_02_9"
            }

            "GST ASMT-06 (Clarification / Additional documents required for final assessment.)" -> {

                return "gst_notice_ASMT_06_10"
            }
            "GST ASMT-10 (For intimation of discrepancies in the GST Return after scrutiny.)" -> {

                return "gst_notice_ASMT_10_11"
            }
            "GST ASMT-14 (Show Cause Notice under Section 63 for Best Judgment Assessment.)" -> {

                return "gst_notice_ASMT_14_12"
            }
            "GST ADT-01 (Notice from the Authorities for conducting Audit under Section 65.)" -> {

                return "gst_notice_ADT_01_13"
            }
            "GST RVN-01 (Notice under Section 108 issued by the Revisional Authority in case of Revision.)" -> {

                return "gst_notice_RVN_01_14"
            }

            "GST DRC-01 (Show Cause Notice for tax demanded in GST DRC-02.)" -> {

                return "gst_notice_DRC_01_15"
            }
            "GST DRC-10 (Notice for auction of Goods under Section 79(1)(b).)" -> {

                return "gst_notice_DRC_10_16"
            }
            "GST DRC-11 (Notice to the successful bidder.)" -> {

                return "gst_notice_DRC_11_17"
            }
            "GST DRC-13 (Notice under Section 79(1)(c) to the third person directing to deposit the amount specified.)" -> {

                return "gst_notice_DRC_13_18"
            }
            "GST DRC-16 (Notice under Section 79 for attachment and sale of movable / immovable goods & shares.)" -> {

                return "gst_notice_DRC_16_19"
            }
            "ANY OTHER NOTICE" -> {

                return "gst_notice_any_20"
            }


        }

        return ""
    }

}