using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    public enum FixMyTaxServiceType
    {
        GST_Notice = 1,
        ITR_TDS_TCS_Notice = 2,
        ITR_TDS_TCS_Filing = 3,
        Consultation = 4
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
