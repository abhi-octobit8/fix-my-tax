package com.sky.fixmytax

object Utils {

    fun getITRFilingKet(itr: String): String {
        when(itr){
            "ITR-1(Salaried Employee / Pensioner with Income from Other Sources)"->{
                return "itr_filling_itr_1_1"
            }
            "ITR-2(Salaried Employee / Pensioner with Income from Other Sources and House Property Income)"->{
                return "itr_filling_itr_2_2"
            }
            "ITR-3(Salaried Employee / Pensioner with Income from Other Sources, House Property Income & Capital Gain with Shares)"->{
                return "itr_filling_itr_3_3"
            }
            "ITR-4(Assessee with Professional Income and Income from Other Sources)"->{
                return "itr_filling_itr_4_4"
            }
            "ITR-4(Assessee with Professional Income as well as House Property and Income from Other Sources)"->{
                return "itr_filling_itr_4_5"
            }
            "ITR-4(Assessee with Professional Income as well as House Property, Capital Gain and Income from Other Sources)"->{
                return "itr_filling_itr_4_6"
            }
            "ITR-5(NGOs / SOCIETIES / TRUST / CHARITABLE COMPANIES WITHOUT INCOME TAX EXEMPTION APPROVAL)"->{
                return "itr_filling_itr_5_7"
            }
            "ITR-6(Company Assessee)"->{
                return "itr_filling_itr_6_8"
            }
            "ITR-7(NGOs / SOCIETIES / TRUST / CHARITABLE COMPANIES WITH INCOME TAX EXEMPTION APPROVAL)"->{
                return "itr_filling_itr_7_9"
            }
            "ITR-U(CAN BE FILED FOR LAST TWO ASSESSMENT YEARS)"->{
                return "itr_filling_itr_u_10"
            }
        }
        return ""
    }

    fun getTDSTCSFilingKet(itr: String): String {
        when(itr){
            "TDS QUARTERLY Statement - 24 - Q1, Q2 & Q3"->{
                return "tds_tcs_filing_24_Q1_Q3_1"
            }
            "TDS QUARTERLY Statement - 24 - Q4"->{
                return "tds_tcs_filing_24_Q4_2"
            }
            "TDS QUARTERLY Statement - 26 - Q1, Q2, Q3 & Q4"->{
                return "tds_tcs_filing_26_Q1_Q4_3"
            }
            "TCS QUARTERLY Statement"->{
                return "tds_tcs_filing_quarterly_4"
            }
            "CORRECTION IN TDS / TCS STATEMENTS"->{
                return "tds_tcs_filing_correction_5"
            }
            "TDS ON SALE OF PROPERTY -CHALLAN CUM Statement"->{
                return "tds_tcs_filing_property_sale_challan_6"
            }
            "REFUND MATTERS FOR EXCESS TDS / TCS DEPOSIT"->{
                return "tds_tcs_filing_refund_excess_7"
            }

        }

        return ""
    }




}