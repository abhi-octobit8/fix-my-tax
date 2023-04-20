using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    public enum FixMyTaxServiceType
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

    public enum ServiceType
    {
        VideoConsultation = 1,
        NoticeReply = 2,
    }

    public enum PaymentStatus
    {
        Paid = 0,
        Pending = 1,
        TransactionFailed = 3,
        Returned = 4
    }
}
