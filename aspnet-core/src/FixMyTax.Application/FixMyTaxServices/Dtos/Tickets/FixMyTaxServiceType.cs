using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    public enum FixMyTaxServiceType
    {
        GST_Notice = 1,
        ITR_TDS_TCS_Notice = 2,
        ITR_TDS_TCS_Filing = 3,
        Consultation = 4
    }
}
