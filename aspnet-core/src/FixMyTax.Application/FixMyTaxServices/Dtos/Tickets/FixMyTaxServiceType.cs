using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    public enum FixMyTaxServiceType
    {
        ITR_FILING = 1,
        TDS_TCS_FILING = 2,
        ITR_TDS_TCS_Notice = 3,
        GST_RETURN = 4,
        GST_Notice = 5,
        TAX_APPEAL = 6,
        Consultation = 7,
        Video_Consultation = 8

    }
}
